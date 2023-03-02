/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const readingListController = require('../../../Controller/User/readingListController');

Router.route('/').post(readingListController.apiCreateReadingList);

// get reading lists
Router.get('/name', readingListController.apiGetReadingLists);

// reading list summary(total blogs)
Router.get('/summary', readingListController.apiGetReadingListsSummary);

Router.route('/:id')
  .post(readingListController.apiAddItemToReadingList)
  .get(readingListController.apiGetReadingListsItems)
  .delete(readingListController.apiDeleteReadingList);

Router.delete(
  '/:id/item/:itemId',
  readingListController.apiRemoveItemFromReadingList
);

module.exports = Router;
