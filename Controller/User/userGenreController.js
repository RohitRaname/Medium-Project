// Utils
const catchAsync = require('../../utils/catchAsync');
const tryCatch = require('../../utils/tryCatch');
const send = require('../../utils/sendJSON');

// Controller
const topLevelBucketController = require('../userBucketController/topLevelList');

// Model
const Genre = require('../../Model/genreModel');
const UserActivity = require('../../Model/user/userActivityModel');

exports.hasUserWrittenBlogInThisGenreBefore = tryCatch(
  async (userId, genre) =>
    await topLevelBucketController.itemExistInList(
      UserActivity,
      userId,
      'genreBlogsWrite',
      genre
    )
);

// user has written a blog on this genre so we are adding it
exports.addGenreToUserBlogsWriteGenre = tryCatch(
  async (userId, genre) =>
    await topLevelBucketController.addItemToList(
      UserActivity,
      userId,
      'genreBlogsWrite',
      genre,
      {
        checkItemExist: false,
        deleteItemExist: false,
      },
      {
        update: true,
        query: {
          filter: { recentGenreBlogsWrite: { $ne: genre } },
          update: {
            $push: {
              recentGenreBlogsWrite: {
                $each: [genre],
                $position: 0,
                $slice: 25,
              },
            },
          },
        },
      }
    )
);

exports.followGenre = tryCatch(
  async (userId, genre) =>
    await topLevelBucketController.addItemToList(
      UserActivity,
      userId,
      'genreFollow',
      { _id: genre },
      {
        checkItemExist: false,
        deleteItemExist: false,
      },
      {
        update: true,
        query: {
          filter: { recentGenreFollow: { $ne: genre } },
          update: {
            $push: {
              recentGenreFollow: {
                $each: [genre],
                $position: 0,
                $slice: 25,
              },
            },
          },
        },
      }
    )
);
exports.unfollowGenre = tryCatch(
  async (userId, genre) =>
    await topLevelBucketController.removeItemFromList(
      UserActivity,
      userId,
      'genreFollow',
      genre,

      {
        update: true,
        query: {
          filter: { recentGenreFollow: genre },
          update: {
            $pull: {
              recentGenreFollow: genre,
            },
          },
        },
      }
    )
);

exports.ignoreGenre = tryCatch(
  async (userId, genre) =>
    await topLevelBucketController.addItemToList(
      UserActivity,
      userId,
      'genreIgnore',
      { _id: genre },
      {
        checkItemExist: false,
        deleteItemExist: false,
      },
      {
        update: true,
        query: {
          filter: { recentGenreIgnore: { $ne: genre } },
          update: {
            $push: {
              recentGenreIgnore: {
                $each: [genre],
                $position: 0,
                $slice: 25,
              },
            },
          },
        },
      }
    )
);
exports.unignoreGenre = tryCatch(
  async (userId, genre) =>
    await topLevelBucketController.removeItemFromList(
      UserActivity,
      userId,
      'genreIgnore',
      { _id: genre },
      {
        checkItemExist: false,
        deleteItemExist: false,
      },
      {
        update: true,
        query: {
          filter: { recentGenreIgnore: genre },

          update: {
            $pull: {
              recentGenreIgnore: genre,
            },
          },
        },
      }
    )
);

exports.apiFollowGenre = catchAsync(async (req, res) => {
  await this.followGenre(req.user._id, req.params.genre);
  return send(res, 200, 'genre follow');
});

exports.apiUnFollowGenre = catchAsync(async (req, res) => {
  await this.unfollowGenre(req.user._id, req.params.genre);
  return send(res, 200, 'genre unfollow');
});

exports.apiIgnoreGenre = catchAsync(async (req, res) => {
  await this.ignoreGenre(req.user._id, req.params.genre);
  return send(res, 200, 'genre ignore');
});

exports.apiUnIgnoreGenre = catchAsync(async (req, res) => {
  await this.unignoreGenre(req.user._id, req.params.genre);
  return send(res, 200, 'genre unignore');
});
