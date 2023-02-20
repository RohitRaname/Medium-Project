// Utils
const catchAsync = require('../utils/catchAsync');
const tryCatch = require('../utils/tryCatch');
const send = require('../utils/sendJSON');

// Controller
const topLevelBucketController = require('./userBucketController/topLevelList');

// Model
const Genre = require('../Model/genreModel');
const UserActivity = require('../Model/user/userActivityModel');

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




exports.getAllGenre = tryCatch(async () => {
  const genres = await Genre.find().distinct('genre');
  return genres;
});

exports.apiGetAllGenre = catchAsync(async (req, res) => {
  const genres = await this.getAllGenre();
  return send(res, 200, 'all genres', genres);
});
