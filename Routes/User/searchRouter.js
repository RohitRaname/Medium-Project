/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router({mergeParams:true});

// controller -----------------------
const userController= require('../../Controller/User/userController')

// other user following user
Router.get('/search',userController.apiSearchUsers)



module.exports = Router;
