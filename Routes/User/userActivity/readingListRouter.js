/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const readingListController= require('../../../Controller/User/readingListController')


Router.post('/', readingListController.createReadingList);

module.exports = Router;
