/* eslint-disable camelcase */
const express = require('express');
const Router = express.Router();

const commonAuthController = require('../../Controller/Auth/commonAuthController');
const jwtController = require('../../Controller/jwtController');


// password check for sign in new jwt should be sent
Router.post(
  '/check-password',
  commonAuthController.accountPasswordValid(true),
  jwtController.sendJwtIfNeeded(false)
);

module.exports = Router;
