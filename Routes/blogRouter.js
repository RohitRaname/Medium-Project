const Router = require('express').Router();

// controller
const blogController = require('../Controller/Blog/blogController');
const { isLoggedIn, sendJwtIfNeeded } = require('../Controller/jwtController');
const blogDailyViewsController = require('../Controller/Blog/blogDailyBlogsViewsController');
Router.route('/').get(
  isLoggedIn,
  sendJwtIfNeeded(true),
  blogController.apiGetFilterBlogs
);
Router.patch(
  '/recordView',
  isLoggedIn,
  sendJwtIfNeeded(true),
  blogDailyViewsController.apiRecordProfileBlogsView
);
Router.get(
  '/monthlyView',
  isLoggedIn,
  sendJwtIfNeeded(true),
  blogDailyViewsController.apiMonthlyViews
);
Router.get('/search', blogController.apiSearchBlogs);

module.exports = Router;
