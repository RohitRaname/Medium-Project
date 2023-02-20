/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const followController = require('../../../Controller/User/followController');


Router.post('/true/:id', followController.apiFollowUser);
Router.post('/false/:id', followController.apiunFollowUser);

Router.get('/suggest-users',followController.apiSuggestUsersToFollow)

module.exports = Router;
