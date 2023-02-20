/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const historyController = require('../../../Controller/User/historyController');

Router.route('/')
  .post(historyController.apiSaveBlogInHistory)
  .get(historyController.apiGetHistory);
  
Router.delete('/:id', historyController.apiRemoveBlogFromHistory);
Router.delete('/remove/all', historyController.apiRemoveAllBlogsFromHistory);

module.exports = Router;
