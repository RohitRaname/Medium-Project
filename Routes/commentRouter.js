const Router = require('express').Router();

// controller
const commentController = require('../Controller/Blog/commentController');
const { protect, sendJwtIfNeeded } = require('../Controller/jwtController');
const {
  apiAddUserActivityItemAndUpdateCountInBlog,
} = require('../Controller/User/meController');

Router.use(protect, sendJwtIfNeeded(true));

Router.route('/')
  .get(commentController.apiGetComments)
  .post(commentController.apiCreateComment);

Router.route('/:id/like').post(
  apiAddUserActivityItemAndUpdateCountInBlog('likeComments')
);
Router.route('/:id/dislike').post(
  apiAddUserActivityItemAndUpdateCountInBlog('likeComments')
);

module.exports = Router;
