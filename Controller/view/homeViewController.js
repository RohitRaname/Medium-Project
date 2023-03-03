const Product = require('../../Model/Product/product_model');
const Review = require('../../Model/review/review_model');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');
const handleFactory = require('../handleFactoryController');
const send = require('../../utils/sendJSON');

// controller
const globalBlogController = require('../Blog/blogController');

exports.renderHomePage = catchAsync(async (req, res, next) => {
    const userId= req.user._id;
  
    const blogs= await globalBlogController.getFilterBlogs(userId, new Date())



  return res.render('pages/home/page', {
    page: 'home',

    me: req.user,
    userData: req.restrictUserData,
    blogs
   
  });
});

