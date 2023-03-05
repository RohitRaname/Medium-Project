// Utils
const catchAsync = require('../utils/catchAsync');
const tryCatch = require('../utils/tryCatch');
const send = require('../utils/sendJSON');

// Model
const Genre = require('../Model/genreModel');
const UserActivity = require('../Model/user/userActivityModel');
const User = require('../Model/user/userModel');

// Controller
const topLevelBucketController = require('./userBucketController/topLevelList');
const userController = require('./User/userController');

exports.createGenre = tryCatch(async (genre) => {
  await Genre.create({ genre: genre });
});

// writer or blog count
exports.updateGenreCountField = tryCatch(async (genre, updateBody) => {
  await Genre.findOneAndUpdate(
    { genre: genre },
    {
      $inc: updateBody,
    },
    { upsert: true }
  );
});

exports.recommendGenre = tryCatch(
  async (userGenres, limit) => {
    const users = await userController.findUsers({
      recentGenreFollow: { $in: userGenres },
      limit,
      fields: 'recentGenreFollow',
      sort: 'count.followers',
    });

    const allGenre = [
      ...new Set(
        users.map((user) => user.recentGenreFollow).flatMap((num) => num)
      ),
    ];

    console.log('allgenre', allGenre);

    return allGenre
      .filter((genre) => !userGenres.find((el) => el !== genre))
      .slice(0, 12);
  }
  // await User.find({recentGenreFollow:{$in:userGenres}}).field().limit(limit).exec()
);

exports.getAllGenre = tryCatch(async () => {
  const genres = await Genre.find().distinct('genre');
  return genres;
});

exports.apiRecommendGenre = catchAsync(async (req, res) => {
  const userGenres = req.user.recentGenreFollow;
  const { limit } = req.query;
  const result = await this.recommendGenre(userGenres, limit);
  return send(res, 200, 'recommed genre', result);
});

exports.apiGetAllGenre = catchAsync(async (req, res) => {
  const genres = await this.getAllGenre();
  return send(res, 200, 'all genres', genres);
});
