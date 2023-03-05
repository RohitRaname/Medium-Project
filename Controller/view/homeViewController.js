const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');

// controller
const globalBlogController = require('../Blog/blogController');
const genreController = require('../genreController');
const followController = require('../User/followController');

exports.renderHomePage = catchAsync(async (req, res, next) => {
  const user = req.user;
  const userId = user._id;

  let blogs, recommendGenre, recommendUsers;

  [blogs, recommendGenre, recommendUsers] = await Promise.all([
    globalBlogController.getFilterBlogs(userId, new Date()),
    genreController.recommendGenre(user.recentGenreFollow, 4),
    followController.suggestUsersToFollow(userId, user.recentGenreFollow, {
      page: 0,
      limit: 2,
    }),
  ]);

  console.log(recommendGenre,recommendUsers)

  return res.render('pages/home/page', {
    page: 'home',
    me: user,
    userData: req.restrictUser,
    blogs,
    recommendGenre,
    recommendUsers,
  });

});
