/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const notificationController= require('../../../Controller/User/notificationController')


Router.get('/', notificationController.apiGetNotifications);

module.exports = Router;
