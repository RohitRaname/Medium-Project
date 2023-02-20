/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router({mergeParams:true});

// controller -----------------------
const followController = require('../../Controller/User/followController');


// other user following user
Router.get('/following',followController.apiGetFollowingUsers)

// other user followers
Router.get('/followers',followController.apiGetFollowers)


module.exports = Router;
