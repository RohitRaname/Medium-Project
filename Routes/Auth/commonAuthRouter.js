/* eslint-disable camelcase */
const express = require('express');

const commonAuthController = require('../../Controller/Auth/commonAuthController');
const {sendJwtIfNeeded}= require('../../Controller/jwtController')

const Router = express.Router();

Router.post('/check-email', commonAuthController.accountWithEmailExist(false));

// verify send code for some auth task
Router.post('/verify-token', commonAuthController.verifyOTPToken(false));



// ADMIN 
Router.post('/admin/login',commonAuthController.login,sendJwtIfNeeded(false))
Router.post('/admin/signup',commonAuthController.signup,sendJwtIfNeeded(false))
module.exports = Router;
