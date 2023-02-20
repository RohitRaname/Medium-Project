/* eslint-disable camelcase */
const express = require('express');

const commonAuthController = require('../../Controller/Auth/commonAuthController');
const forgotPasswordController = require('../../Controller/Auth/forgotPasswordController');
const jwtController = require('../../Controller/jwtController');

const Router = express.Router();

Router.post(
  '/check-email',
  commonAuthController.accountWithEmailExist(true),
  commonAuthController.sendOTPToken(
    'reset-password',
    'forgot-password/verify-account'
  )
);

Router.get(
  '/resend-token/:email',
  commonAuthController.setUser,
  commonAuthController.sendOTPToken(
    'reset-password',
    'forgot-password/verify-account'
  )
);

Router.patch(
  '/setNewPassword',
  commonAuthController.setUser,
  forgotPasswordController.setNewPassword,
  jwtController.sendJwtIfNeeded(false)
);

module.exports = Router;
