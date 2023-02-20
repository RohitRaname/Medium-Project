const catchAsync = require('../../utils/catchAsync');
const tryCatch = require('../../utils/tryCatch');
const send = require('../../utils/sendJSON');

// Model
const UserActivity = require('../../Model/user/userActivityModel');

// CONTROLLER
const topLevelBucketController = require('../userBucketController/topLevelList');

// add item means => likeBlogs(only id),bookmarkBlogs(only id),comments(comment body)
exports.addUserActivityItemAndUpdateCountInBlog = tryCatch(
  async (userId, blogId, activityItem,userActivityField, countField, action) => {
    let updateUserActivity;
    if (countField !== 'views') {
      updateUserActivity =
        action === 'increase'
          ? topLevelBucketController.addItemToList(
              UserActivity,
              userId,
              userActivityField,
              activityItem,
              {
                checkItemExist: false,
                deleteItemExist: false,
              },
              {
                update: false,
              }
            )
          : topLevelBucketController.removeItemFromList(
              UserActivity,
              userId,
              userActivityField,
              activityItem,
              {
                update: false,
              }
            );
    }

    const updateUserBlogsCount = topLevelBucketController.updateItemInList(
      UserActivity,
      userId,
      'blogs',
      blogId,
      {
        $inc: {
          [`blogs.$.count.${countField}`]: action === 'increase' ? 1 : -1,
        },
      }
    );

    const updateGlobalBlogCount = globalBlogController.updateBlogCountField(
      blogId,
      countField,
      action === 'increase' ? 1 : -1
    );

    await Promise.all([
      updateUserActivity,
      updateUserBlogsCount,
      updateGlobalBlogCount,
    ]);
  }
);

exports.apiAddUserActivityItemAndUpdateCountInBlog = (
  userActivityField,
  countField,
  countIncreaseOrDecrease
) =>
  catchAsync(async (req, res) => {
    await this.addUserActivityItemAndUpdateCountInBlog(
      req.user._id,
      req.params.id,
      Object.keys(req.body).length === 0 ? { _id: req.params.id } : req.body,
      userActivityField,
      countField,
      countIncreaseOrDecrease
    );
    return send(
      res,
      200,
      `${countIncreaseOrDecrease === 'decrease' ? 'un' : ''}${countField} blog`
    );
  });
