const { default: mongoose } = require('mongoose');

// Utils
const catchAsync = require('../../utils/catchAsync');
const tryCatch = require('../../utils/tryCatch');
const send = require('../../utils/sendJSON');
const {
  formatQueryIntoPipeline,
} = require('../../utils/mongodbQueryConverter');

// Model
const Comment = require('../../Model/blog/commentModel');
const UserActivity = require('../../Model/user/userActivityModel');

// Controller
const topLevelBucketController = require('../userBucketController/topLevelList');
const {
  addUserActivityItemAndUpdateCountInBlog,
} = require('../User/meController');

exports.saveBlogComment = tryCatch(async (userId, blogId, comment) => {
  // 1.check parent exist of comment and if exist then increase its child comment count
  // 1.5.increase tweet comment count (if comment top parent el)
  // 2.save comment
  // 3.save comment in user_comment_bucket

  const { parentId } = comment;
  let parentComment, updateParentCommentReplyCount;

  if (parentId) {
    [parentComment, updateParentCommentReplyCount] = await Promise.all([
      topLevelBucketController.getEmbeddedItem(
        Comment,
        userId,
        'comments',
        parentId,
        { blogId: new mongoose.Types.ObjectId(blogId) }
      ),
      topLevelBucketController.updateItemInList(
        Comment,
        blogId,
        'comments',
        parentId,
        { $inc: { 'comment.$.count.reply': 1 } }
      ),
    ]);

    comment.ancestorIds = [...parentComment.ancestorIds, parentComment._id];
  }

  // 2.save comment
  const commentDoc = await topLevelBucketController.addItemToList(
    Comment,
    blogId,
    'comments',
    comment,
    {
      checkItemExist: false,
      deleteItemExist: false,
    },
    {
      update: false,
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

  return commentDoc;
});

// firstUser follow secondUser
exports.postComment = tryCatch(async (userId, blogId, comment) => {
  comment._id = new mongoose.Types.ObjectId();

  const saveBlogComment = this.saveBlogComment(userId, blogId, comment);

  const saveCommentInUser = topLevelBucketController.addItemToList(
    UserActivity,
    userId,
    'comments',
    { _id: comment._id, text: comment.text },
    {
      checkItemExist: false,
      deleteItemExist: false,
    },
    {
      update: false,
      query: {
        filter: {},

        update: {
          $inc: { 'count.following': 1 },
        },
      },
    }
  );

  // update comment count in user blog and global blog
  const updateCommentCountInBlog = addUserActivityItemAndUpdateCountInBlog(
    userId,
    blogId,
    { _id: comment._id, text: comment.text },
    'comment',
    'increase'
  );

  await Promise.all([
    saveBlogComment,
    saveCommentInUser,
    updateCommentCountInBlog,
  ]);
});

exports.likeComment = tryCatch(
  async (userId, blogId, commentId) =>
    await topLevelBucketController.addItemToList(
      UserActivity,
      userId,
      'likeComments',
      { _id: commentId },
      {
        checkItemExist: false,
        deleteItemExist: false,
      },
      {
        update: false,
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
    )
);

exports.getComments = tryCatch(async (userId, blogId, query) => {
  const comments = topLevelBucketController.getEmbeddedItems(
    Comment,
    userId,
    'comments',
    query,
    new mongoose.Types.ObjectId(blogId)
  );
  return comments;
});
