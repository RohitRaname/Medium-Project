const mongoose = require('mongoose');

/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');
const tryCatch = require('../../utils/tryCatch');
const send = require('../../utils/sendJSON');

// Model
const UserActivity = require('../../Model/user/userActivityModel');

// Controller
const topLevelBucketController = require('../userBucketController/topLevelList');

const globalBlogController = require('../Blog/blogController');
const genreController = require('../genreController');
const userGenreController = require('./userGenreController');
const { sendNotificationToFollowers } = require('./notificationController');




//  add blog
exports.createBlog = tryCatch(async (userId, userProfile, blog) => {
  const blogId = new mongoose.Types.ObjectId();

  blog._id = blogId;

  // add to GLobal blogs
  const addBlogToGlobalBlog = globalBlogController.createBlog({
    author: userProfile,
    ...blog,
  });

  // add to user activity blogs
  const addBlogToUserActivity = topLevelBucketController.addItemToList(
    UserActivity,
    userId,
    'blogs',
    blog,
    {
      checkItemExist: false,
      deleteItemExist: false,
    },
    {
      update: true,
      query: {
        filter: {},

        update: {
          $push: {
            recentBlogs: {
              $each: [blog],
              $slice: 10,
              $position: 0,
            },
          },
          $inc: { 'count.blogs': 1 },
        },
      },
    }
  );

  // has user already write a blog on this genre,if not add user as writer in this genre
  const hasUserWrittenBlogInThisGenreBefore =
    await userGenreController.hasUserWrittenBlogInThisGenreBefore(
      userId,
      blog.genre
    );

  // if user hasnot written a blog on this genre before,then add genre to user activity
  let addGenreToUser;

  if (!hasUserWrittenBlogInThisGenreBefore)
    addGenreToUser = userGenreController.addGenreToUserBlogsWriteGenre(userId, {
      _id: blog.genre,
    });

  // update blog count in genre
  const updateGenreBlogCount = genreController.updateGenreCountField(
    blog.genre,
    {
      'count.blogs': 1,
      'count.writers': !hasUserWrittenBlogInThisGenreBefore ? 1 : 0,
    }
  );

  // send blog notification to all my followers
  const sendBlogNotificationToMyFollowers = sendNotificationToFollowers(
    userId,
    {
      author: userProfile,
      blog: {
        _id: blogId,
        title: blog.content.title,
        thumbnail: blog.content.thumbnail,
      },
    }
  );

  await Promise.all([
    addBlogToGlobalBlog,
    addBlogToUserActivity,
    addGenreToUser,
    updateGenreBlogCount,
    sendBlogNotificationToMyFollowers,
  ]);
});

// remove blog
exports.removeBlog = tryCatch(async (userId, blogId) => {
  const unactiveFromUserBlogs = topLevelBucketController.updateItemInList(
    UserActivity,
    userId,
    'blogs',
    blogId,

    {
      $set: {
        'blogs.$.active': false,
      },
    }
  );

  const unactiveFromGlobalBlogs = globalBlogController.removeBlog(blogId);
  await [unactiveFromGlobalBlogs, unactiveFromUserBlogs];
});



exports.apiCreateBlog = catchAsync(async (req, res, next) => {
  const createBlog = await this.createBlog(
    req.user._id,
    req.restrictUser.profile,
    req.body
  );
  return send(res, 200, 'blog created');
});

exports.apiRemoveBlog = catchAsync(async (req, res, next) => {
  const deleteBlog = await this.removeBlog(req.user._id, req.params.id);
  return send(res, 200, 'blog deleted');
});

// add blogId to user activity doc in bookmarkblogs,commentBlogs,likeBlogs and update complementary blog count add item means => likeBlogs,bo(only id)okmarkBlogs,commentsand