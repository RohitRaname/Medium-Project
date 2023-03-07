const Router = require('express').Router();

// controller
const commentController = require('../Controller/Blog/commentController');
const { protect, sendJwtIfNeeded } = require('../Controller/jwtController');
const {
  apiAddUserActivityItemAndUpdateCountInBlog,
} = require('../Controller/User/meController');

// Router.use(protect, sendJwtIfNeeded(true));

Router.use((req, res,next) => {
  req.user = {
    _id: '63e89226613c2d7c85789e00',
    name: 'Rohit',
    profile: {
      bio: '',
      avatar: 'default.png',
      coverPic: 'defaultCover.png',
    },
  };

  next()

});

Router.route('/')
  .get(commentController.apiGetComments)
  .post(commentController.apiCreateComment);

Router.route('/:id/like')
  .post(apiAddUserActivityItemAndUpdateCountInBlog('likeComments'))
  .delete(apiAddUserActivityItemAndUpdateCountInBlog('likeComments'));

module.exports = Router;
