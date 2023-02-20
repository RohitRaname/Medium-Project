/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const {
  userActivityController,
} = require('../../../../Controller/userBucketController/topLevelList');
const userGenreController = require('../../../../Controller/User/userGenreController');

// ignore Genre
Router.post('/:genre', userGenreController.apiIgnoreGenre);
Router.delete('/:genre', userGenreController.apiUnIgnoreGenre);
Router.get('/exist/:id', userActivityController('genreIgnore', 'item-exist'));
Router.get('/all-genre', userActivityController('genreIgnore', 'get-items'));
module.exports = Router;
