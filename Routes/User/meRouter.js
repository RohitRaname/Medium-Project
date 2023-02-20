/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const userController = require('../../Controller/User/userController');
const { uploadMultipleFieldPhotos } = require('../../utils/multer');

const blockUserRouter = require('./userActivity/blockUserRouter');
const muteUserRouter = require('./userActivity/muteUserRouter');
const followUserRouter = require('./userActivity/followUserRouter');
const userGenreRouter = require('./userActivity/genre/baseGenreRouter');
const notificationRouter = require('./userActivity/notificationRouter');
const historyRouter= require('./userActivity/historyRouter')

Router.use('/block', blockUserRouter);
Router.use('/mute', muteUserRouter);
Router.use('/follow', followUserRouter);
Router.use('/genre', userGenreRouter);
Router.use('/notifications', notificationRouter);
Router.use('/history',historyRouter)

Router.route('/')
  .patch(
    uploadMultipleFieldPhotos([
      { name: 'pic', maxCount: 1 },
      { name: 'cover_pic', maxCount: 1 },
    ]),
    userController.resizeImages,
    userController.updateMe
  )
  .get(userController.setUserIdAsParams, userController.apiGetUser);

// address

module.exports = Router;
 