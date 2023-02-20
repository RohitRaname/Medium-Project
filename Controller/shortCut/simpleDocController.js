const mongoose = require('mongoose');

const Factory = require('../handleFactoryController');
const catchAsync = require('../../utils/catchAsync');
const Product = require('../../Model/Product/product_model');
const CustomerQuesAns = require('../../Model/Product/customerQuesAns/customerQuesAnsModel');
const UserActivity = require('../../Model/user/userActivityModel');
const AppError = require('../../utils/AppError');
const topLevelBucketController = require('../../Controller/userBucketController/topLevelList');
const send = require('../../utils/sendJSON');

// ques has answer property in it

exports.createOne = catchAsync(async (req, res, next) => {
  const { modelId } = req.params;

  const result = await Promise.all([
    CustomerQuesAns.create(req.body),
    Product.updateMany(
      { 'model._id': modelId },
      {
        $inc: { 'count.ques': 1 },
        $push: {
          customerQuesAns: {
            $each: [req.body],
            $slice: 15,
            $position: 0,
          },
        },
      },
      {
        new: true,
      }
    ).exec(),
  ]);
  return send(res, 200, 'ques created', result);
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const { id, modelId } = req.params;
  const result = await Promise.all([
    CustomerQuesAns.updateOne(
      { _id: id },
      {
        $set: req.body,
      }
    ).exec(),
    Product.updateMany(
      { 'model._id': modelId, 'customerQuesAns._id': id },
      {
        $set: {
          'customerQuesAns.$[el]': req.body,
        },
      },
      {
        arrayFilters: [{ 'el._id': id }],
        new: true,
      }
    ).exec(),
  ]);
  return send(res, 200, 'ques created', result);
});

// delelte product all question from product variants and question db
exports.deleteAll = catchAsync(async (req, res, next) => {
  const { modelId } = req.params;
  const result = await Promise.all([
    CustomerQuesAns.deleteMany({ modelId: modelId }),
    Product.updateMany(
      { 'model._id': modelId },
      {
        $set: {
          customerQuesAns: [],
          'count.ques': 0,
        },
      },
      {
        new: true,
      }
    ),
  ]);
  return send(res, 200, 'ques created', result);
});

exports.getAll = Factory.getAll(CustomerQuesAns);

exports.searchOne = catchAsync(async (req, res, next) => {
  const { modelId } = req.params;
  const { limit, q } = req.query;

  const quesDocs = await CustomerQuesAns.aggregate([
    {
      $search: {
        compound: {
          must: [
            {
              equals: {
                path: 'modelId',
                value: new mongoose.Types.ObjectId(modelId),
              },
            },
            {
              autocomplete: {
                path: 'ques',
                query: q,
                fuzzy: {
                  maxEdits: 1,
                  prefixLength: 1,
                  maxExpansions: 256,
                },
              },
            },
          ],
        },
        highlight: { path: 'ques' },
      },
    },

    { $limit: Number(limit) },

    { $set: { highlights: { $meta: 'searchHighlights' } } },
  ]);
  return send(res, 200, 'search-ques', { docs: quesDocs });
});

// increase/decrease
exports.updateCountField = catchAsync(async (req, res, next) => {
  const { id, modelId, action } = req.params;
  const { field } = req.query;
  const userId = req.user._id;

  // check user already voted the ques
  if (field === 'vote') {
    const quesAlreadyVoteByUser =
      await topLevelBucketController.itemExistInList(
        UserActivity,
        userId,
        'quesVoted',
        id
      );

    if (quesAlreadyVoteByUser) return next(new AppError('item exist', 400));
  }

  const result = await Promise.all([
    CustomerQuesAns.updateOne(
      { _id: id },
      {
        $inc: { [`count.${field}`]: action === 'increase' ? 1 : -1 },
      }
    ).exec(),
    topLevelBucketController.addItemToList(
      UserActivity,
      userId,
      'quesVoted',
      { _id: id },
      {
        checkItemExist: false,
        deleteItemExist: false,
      },
      {
        update: false,
      }
    ),
    Product.updateMany(
      { 'model._id': modelId, 'customerQuesAns._id': id },
      {
        $inc: {
          [`customerQuesAns.$[el].count.${field}`]:
            action === 'increase' ? 1 : -1,
        },
      },
      {
        arrayFilters: [{ 'el._id': id }],
        new: true,
      }
    ).exec(),
  ]);
  return send(res, 200, 'ques voted', result);
});

// ADMIN
exports.apiAdminGetCustomerQuesAns = Factory.getOne(CustomerQuesAns);
exports.apiAdminGetCustomerQuesAnss = Factory.getAll(CustomerQuesAns);
exports.apiAdminUpdateCustomerQuesAns = Factory.updateOne(CustomerQuesAns);
exports.apiAdminDeleteCustomerQuesAns = Factory.deleteOne(CustomerQuesAns);
exports.apiAdminCreateCustomerQuesAns = Factory.createOne(CustomerQuesAns);
