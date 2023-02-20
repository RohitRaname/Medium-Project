/* eslint-disable camelcase */
const express = require('express');

const signupController = require('../../Controller/Auth/signupController');
const commonAuthController = require('../../Controller/Auth/commonAuthController');
const jwtController = require('../../Controller/jwtController');

const Router = express.Router();

Router.post(
  '/create-account',
  signupController.createAccount,
  commonAuthController.sendOTPToken(
    'signup-verification',
    'signup/verify-account'
  )
);
Router.post(
  '/verify-account',
  commonAuthController.verifyOTPToken(true),
  signupController.verifyAccount,
  jwtController.sendJwtIfNeeded(false)
);
Router.get(
  '/resend-token/:email',
  commonAuthController.setUser,
  commonAuthController.sendOTPToken(
    'signup-verification',
    'signup/verify-account'
  )
);

module.exports = Router;
