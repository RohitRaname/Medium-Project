/* eslint-disable camelcase */

// Utils
const catchAsync = require('../../utils/catchAsync');
const send = require('../../utils/sendJSON');
const tryCatch = require('../../utils/tryCatch');
const AppError = require('../../utils/AppError');

// Controller
const topLevelBucketController = require('../userBucketController/topLevelList');
const userController = require('./userController');

// Model
const Follower = require('../../Model/user/followersModel');
const Following = require('../../Model/user/followingModel');
const User = require('../../Model/user/userModel');

// firstUser follow secondUser
exports.followUser = tryCatch(async (firstUser, secondUser) => {
  console.log('followUser', firstUser, secondUser);

  if (Object.keys(secondUser).length === 0)
    return new Error('follow user is empty please send follow user info');

  const firstUserfollowSecondUser = topLevelBucketController.addItemToList(
    Following,
    firstUser._id,
    'following',
    secondUser,
    {
      checkItemExist: false,
      deleteItemExist: false,
    },
    {
      update: true,
      query: {
        filter: {},

        update: {
          $inc: { 'count.following': 1 },
        },
      },
    }
  );
  const secondUserFollowedByFirstUser = topLevelBucketController.addItemToList(
    Follower,
    secondUser._id,
    'followers',
    firstUser,
    {
      checkItemExist: false,
      deleteItemExist: false,
    },
    {
      update: true,
      query: {
        filter: { _id: secondUser._id },

        update: {
          $inc: { 'count.followers': 1 },
        },
      },
    }
  );

  await Promise.all([firstUserfollowSecondUser, secondUserFollowedByFirstUser]);
});

// firstuser unfollow secondUser
exports.unfollowUser = tryCatch(async (firstUserId, secondUserId) => {
  const firstUserUnfollowSecondUser =
    topLevelBucketController.removeItemFromList(
      Following,
      firstUserId,
      'following',
      secondUserId,
      {
        update: true,
        query: {
          filter: {},

          update: {
            $inc: { 'count.following': -1 },
          },
        },
      }
    );
  const secondUserUnFollowedByFirstUser =
    topLevelBucketController.removeItemFromList(
      Follower,
      secondUserId,
      'followers',
      firstUserId,
      {
        update: true,
        query: {
          filter: { _id: secondUserId },

          update: {
            $inc: { 'count.followers': -1 },
          },
        },
      }
    );

  await Promise.all([
    firstUserUnfollowSecondUser,
    secondUserUnFollowedByFirstUser,
  ]);
});

exports.getFollowingUsers = tryCatch(async (userId, query) => {
  console.log(userId);
  const users = topLevelBucketController.getEmbeddedItems(
    Following,
    userId,
    'following',
    query
  );
  return users;
});
exports.getFollowers = tryCatch(async (userId, query) => {
  console.log(userId);
  const users = topLevelBucketController.getEmbeddedItems(
    Follower,
    userId,
    'followers',
    query
  );
  return users;
});

// genreFollow is of current user
exports.suggestUsersToFollow = tryCatch(async (genreFollow, query) => {
  console.log(genreFollow, query);
  let { page, limit } = query;
  page = Number(page);
  limit = Number(limit);

  // i follow genre and history watched
  const users = await User.find({ recentGenreBlogsWrite: { $in: genreFollow } })
    .sort({ 'count.followers': -1 })
    .skip(page * limit)
    .limit(limit)
    .select(['_id', 'name', 'profile.avatar', 'profile.bio']);

  return userController.formatUsers(users);
});

exports.apiGetFollowingUsers = catchAsync(async (req, res) => {
  const users = await this.getFollowingUsers(
    req.params.id || req.user._id,
    req.query
  );
  return send(res, 200, 'following users', users);
});
exports.apiGetFollowers = catchAsync(async (req, res) => {
  const users = await this.getFollowers(
    req.params.id || req.user._id,
    req.query
  );
  return send(res, 200, 'followers users', users);
});
exports.apiSuggestUsersToFollow = catchAsync(async (req, res) => {
  const users = await this.suggestUsersToFollow(
    req.user.recentGenreFollow,
    req.query
  );
  return send(res, 200, 'suggested users to follow', users);
});

exports.apiFollowUser = catchAsync(async (req, res, next) => {
  const result = await this.followUser(req.restrictUser.profile, req.body);
  if (result instanceof Error) return next(new AppError(result.message), 400);
  return send(res, 200, 'followed', result);
});

exports.apiunFollowUser = catchAsync(async (req, res) => {
  const users = await this.unfollowUser(req.user._id, req.params.id);
  return send(res, 200, 'unfollowed', users);
});
