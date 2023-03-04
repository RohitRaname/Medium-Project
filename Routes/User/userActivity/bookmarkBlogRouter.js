/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const {userActivityController} = require('../../../Controller/userBucketController/topLevelList');

Router.post('/true/:id', userActivityController("bookmarkBlogs","add-item"));
Router.delete('/false/:id', userActivityController("bookmarkBlogs","remove-item"));
Router.get('/exist/:id', userActivityController("bookmarkBlogs","item-exist"));
Router.get('/all-users', userActivityController("bookmarkBlogs","get-items"));

module.exports = Router;
