const mongoose = require('mongoose');

const catchAsync = require('../../utils/catchAsync');
const tryCatch = require('../../utils/tryCatch');
const send = require('../../utils/sendJSON');

// Model
const UserActivity = require('../../Model/user/userActivityModel');

// CONTROLLER
const topLevelBucketController = require('../userBucketController/topLevelList');
const globalBlogController = require('../Blog/blogController');

// add item means => likeBlogs(only id),bookmarkBlogs(only id),comments(comment body)
exports.addUserActivityItemAndUpdateCountInBlog = tryCatch(
  async (
    userId,
    blogId,
    activityItem,
    userActivityField,
    countField,
    action
  ) => {
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

    let updateUserBlogsCount, updateGlobalBlogCount;

    if (countField) {
      updateUserBlogsCount = topLevelBucketController.updateItemInList(
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

      updateGlobalBlogCount = globalBlogController.updateBlogCountField(
        blogId,
        countField,
        action === 'increase' ? 1 : -1
      );
    }

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

// mutedUsers,blockedUsers
exports.getMyActivityFieldAllItems = tryCatch(
  async (userId, activityField, query) =>
    await topLevelBucketController.getEmbeddedItems(
      UserActivity,
      userId,
      activityField,
      query || {}
    )
);

exports.checkDocsExistInMyActivity = tryCatch(
  async (userId, activityField, itemId) =>
    await topLevelBucketController.itemExistInList(
      UserActivity,
      userId,
      activityField,
      itemId
    )
);

// filter by condition (mutedUsers,blockUSers)
exports.filterDocsForMe = tryCatch(
  async (model, userId, fields,  givenDocs, compareField) => {
    const setPipelineForField = (field) => [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          [field]: { $gt: [] },
        },
      },

      { $unwind: `$${field}` },

      { $replaceWith: `$${field}` },

      { $match: { active: { $ne: false } } },
    ];

    const filterDocs = (docs, activityDocs) =>
      docs.filter(
        (givenDoc) =>
          !activityDocs.find((activityDoc) =>
            activityDoc._id.toString() === compareField
              ? givenDoc[compareField]['_id'].toString()
              : givenDoc._id.toString()
          )
      );

    let facetPipeline = [
      {
        $facet: {
          mutedUsers: fields.find((field) => field === 'mutedUsers')
            ? setPipelineForField('mutedUsers')
            : {},

          blockedUsers: fields.find((field) => field === 'blockedUsers')
            ? setPipelineForField('blockedUsers')
            : {},
        },
      },
    ];

    let agg = await model.aggregate(facetPipeline).exec();
    agg = agg[0];

    console.log('agg',agg)

    // filter comments from user that i muted in past
    fields.forEach((field) => {
      if (field === 'mutedUsers')
        givenDocs = filterDocs(givenDocs, agg['mutedUsers']);
      if (field === 'blockedUsers')
        givenDocs = filterDocs(givenDocs, agg['blockedUsers']);
    });

    return givenDocs;
  }
);
