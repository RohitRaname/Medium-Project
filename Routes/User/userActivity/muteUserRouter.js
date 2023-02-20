/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const {userActivityController} = require('../../../Controller/userBucketController/topLevelList');

Router.post('/true/:id', userActivityController("mutedUsers","add-item"));
Router.delete('/false/:id', userActivityController("mutedUsers","remove-item"));
Router.get('/exist/:id', userActivityController("mutedUsers","item-exist"));
Router.get('/all-users', userActivityController("mutedUsers","get-items"));

module.exports = Router;
