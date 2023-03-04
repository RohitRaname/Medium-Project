const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');

// controller
const globalBlogController = require('../Blog/blogController');

exports.renderHomePage = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const blogs = await globalBlogController.getFilterBlogs(userId, new Date());

  return res.render('pages/home/page', {
    page: 'home',
    me: req.user,
    userData: req.restrictUser,
    blogs,
  });
});
