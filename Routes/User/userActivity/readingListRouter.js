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

Router.get(
  '/item-exist-in-lists/:itemId',
  readingListController.apiGetListsInWhichItemExist
);

Router.route('/:id')

  .get(readingListController.apiGetReadingListsItems)
  .delete(readingListController.apiDeleteReadingList);

Router.route('/:id/item/:itemId')
  .delete(readingListController.apiRemoveItemFromReadingList)
  .post(readingListController.apiAddItemToReadingList);

module.exports = Router;
