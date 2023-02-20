/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const userController = require('../../Controller/User/userController');
const { uploadMultipleFieldPhotos } = require('../../utils/multer');


Router.route('/:id')
  .get(userController.apiGetUser)
  .patch(
    uploadMultipleFieldPhotos([
      { name: 'pic', maxCount: 1 },
      { name: 'cover_pic', maxCount: 1 },
    ]),
    userController.apiUpdateUser
  )
  .delete(userController.apiDeleteUser);

Router.route('/')
  .get(userController.apiGetUsers)
  .post(userController.apiCreateUser);

module.exports = Router;
