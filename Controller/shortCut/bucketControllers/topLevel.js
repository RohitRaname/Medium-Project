const catchAsync = require('../../utils/catchAsync');
const send = require('../../utils/sendJSON');
const UserActivity = require('../../Model/user/userActivityModel');
const User = require('../../Model/user/userModel');
const {
  formatProduct,
  convertPrice,
} = require('../Product/product_controller');
const tryCatch = require('../../utils/tryCatch');
const topLevelBucketController = require('../userBucketController/topLevelList');

// delete item from history
exports.deleteOne = tryCatch(async (userId, itemId) => {
  await topLevelBucketController.removeItemFromList(
    History,
    userId,
    'items',
    itemId,
    {
      update: true,
      query: {
        filter: { 'history._id': itemId },

        update: {
          $pull: {
            history: { _id: itemId },
          },
        },
      },
    }
  );
});

exports.getTotalPage = tryCatch(
  async (userId) => await topLevelBucketController.getTotalPage(History, userId)
);

//////////////////////////////////////////////////////////////////
// -- API

exports.getItemsCount = tryCatch(async (userId) => {
  const items = await topLevelBucketController.getAllEmbeddedItems(
    UserActivity,
    userId,
    {
      listName: 'cart',
      sort: null,
      project: null,
      directContainItems: true,
    }
  );
  console.log('items-count', items);
  const totalQty = items.reduce((acc, item) => acc + Number(item.qty), 0);
  return totalQty;
});

// update cartItems qty in user obj
exports.updateUserWithTotalItemsCount = tryCatch(async (userId) => {
  const totalQty = await this.getCartItemsTotalCount(userId);

  await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: { 'count.cartItems': totalQty },
    }
  );
});

exports.addItem = catchAsync(async (req, res, next) => {
  const item = req.body;
  console.log('add-cart', item);

  await topLevelBucketController.addItemToList(
    UserActivity,
    req.user._id,
    'cart',
    item,
    {
      checkItemExist: true,
      updateIfItemExist: {
        $inc: { 'cart.$.qty': item.qty || 1 },
      },
      deleteItemExist: false,
    },
    {
      update: true,
      query: {
        filter: {},

        update: {
          $inc: { 'count.cartItems': Number(item.qty) || 1 },
        },
      },
    }
  );

  return send(res, 200, 'add item to cart');
});

exports.removeItems = tryCatch(async (userId, itemIds) => {
  await topLevelBucketController.removeGivenItems(
    UserActivity,
    userId,
    'cart',
    itemIds
  );

  await this.updateUserTotalCartItemsCount(userId);
});

exports.updateItem = catchAsync(async (req, res, next) => {
  const itemId = req.params.id;
  const { qty } = req.body;

  await topLevelBucketController.updateItemInList(
    UserActivity,
    req.user._id,
    'cart',
    itemId,
    { $set: { 'cart.$.qty': qty } }
  );
  await this.updateUserTotalCartItemsCount(req.user._id);
  return send(res, 200, 'item qty updated');
});

exports.getBucketSummary = catchAsync(async (req, res, next) => {
  // amount is in dollar
  const agg = await UserActivity.aggregate([
    {
      $match: { cart: { $gt: [] } },
    },

    {
      $unwind: '$cart',
    },

    { $replaceWith: '$cart' },

    { $sort: { ts: -1 } },

    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        pipeline: [
          {
            $project: { price: 1 },
          },
        ],
        as: 'match',
      },
    },

    { $set: { match: { $first: '$match' } } },

    {
      $group: {
        _id: null,
        count: { $sum: '$qty' },
        amount: { $sum: { $multiply: ['$qty', '$match.price.value'] } },
      },
    },

    { $unset: ['_id'] },
  ]);

  const summary = agg[0];

  summary.amount = convertPrice(summary.amount, req.user.currency);

  return send(res, 200, 'cart summary', summary);
});

// the user i am following
exports.getAllItems = tryCatch(async (userId) => {
  const items = await topLevelBucketController.getAllEmbeddedItems(
    UserActivity,
    userId,
    {
      listName: 'cart',
      sort: null,
      project: null,
      directContainItems: true,
    }
  );

  return items;
});

exports.removeAllItems = tryCatch(async (userId) => {
  await topLevelBucketController.removeAllItems(
    UserActivity,
    userId,
    'cart',
    {}
  );
  await this.updateUserTotalCartItemsCount(userId);
});

exports.itemExist = tryCatch(
  async (meId, userId) =>
    await topLevelBucketController.itemExistInList(
      UserActivity,
      meId,
      'following',
      userId
    )
);

// ref
exports.getRefItems = tryCatch(async (userId, currency) => {
  let items = await topLevelBucketController.getRefAllItems(
    UserActivity,
    userId,
    {
      listName: 'cart',
      sort: '-ts',
      project: null,
      directContainItems: true,
      lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'item',
        pipeline: [
          {
            $project: {
              title: 1,
              'assets.thumbnail': 1,
              curVariant: 1,
              price: 1,
            },
          },
        ],
      },
      replaceWith: { $mergeObjects: ['$$ROOT', { $first: '$item' }] },
      unset: 'item',
    }
  );

  // format cart-item product
  items = items.map((item) => formatProduct(item, currency));

  return items;
});

exports.apiGetCartItems = catchAsync(async (req, res, next) => {
  const items = await this.getCartItems(req.user._id, req.user.currency);
  return send(res, 200, 'cart-items', items);
});

exports.apiGetCartItemsTotalCount = catchAsync(async (req, res, next) => {
  const totalCount = await this.getCartItemsTotalCount(req.user._id);
  return send(res, 200, 'cart items total qty', { count: totalCount });
});
exports.apiSaveHistory = catchAsync(async (req, res, next) => {
  await this.saveHistory(req.user._id, req.body.product);

  // add wishlist with item to user

  return send(res, 200, 'history-saved');
});

exports.apiGetHistory = catchAsync(async (req, res, next) => {
  const history = await this.getItems(req.user._id, req.query);
  return send(res, 200, 'docs', { docs: history });
});

exports.apiDeleteOne = catchAsync(async (req, res, next) => {
  const history = await this.deleteOne(req.user._id, req.params.id);
  return send(res, 200, 'docs', { docs: history });
});
exports.apiDeleteAll = catchAsync(async (req, res, next) => {
  const history = await topLevelBucketController.removeAllItems(
    History,
    req.user._id,
    'items',
    {
      update: true,
      query: {
        filter: {},
        update: {
          $set: {
            history: [],
          },
        },
      },
    }
  );
  return send(res, 200, 'docs', { docs: history });
});
