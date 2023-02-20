/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const {
  userActivityController,
} = require('../../../../Controller/userBucketController/topLevelList');
const userGenreController = require('../../../../Controller/User/userGenreController');

// Genre Follow
Router.post('/:genre', userGenreController.apiFollowGenre);
Router.delete('/:genre', userGenreController.apiUnFollowGenre);
Router.get('/exist/:id', userActivityController('genreFollow', 'item-exist'));
Router.get('/all-genre', userActivityController('genreFollow', 'get-items'));

module.exports = Router;
