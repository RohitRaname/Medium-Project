const Router = require('express').Router({ mergeParams: true });

// controller
const {
  isLoggedIn,
  sendJwtIfNeeded,
} = require('../../Controller/jwtController');
const userController = require('../../Controller/User/userController');
const homeViewController = require('../../Controller/view/homeViewController');
const commonAuthController = require('../../Controller/Auth/commonAuthController');
const signupController = require('../../Controller/Auth/signupController');

Router.use('/img*', (req, res) => res.status(400).send('img not found'));
Router.use('/api*', (req, res) => res.send('api not found'));

Router.get(
  '/auth/signup/verify-account',
  commonAuthController.verifyOTPToken(true),
  signupController.verifyAccount,
  userController.setMustDataForNewUser,
  sendJwtIfNeeded(false)
);

Router.get(
  '/',
  isLoggedIn,
  sendJwtIfNeeded(true),
  userController.setRestrictUserDataInReq,
  homeViewController.renderHomePage
);

module.exports = Router;
