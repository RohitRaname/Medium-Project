/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const {userActivityController} = require('../../../Controller/userBucketController/topLevelList');


// blocked
Router.post('/true/:id', userActivityController("blockedUsers","add-item"));
Router.delete('/false/:id', userActivityController("blockedUsers","remove-item"));
Router.get('/exist/:id', userActivityController("blockedUsers","item-exist"));
Router.get('/all-users', userActivityController("blockedUsers","get-items"));


module.exports= Router;