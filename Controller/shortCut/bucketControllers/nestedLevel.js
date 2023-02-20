const mongoose = require('mongoose');

// MODEL
const User = require('../../../Model/user/userModel');
const UserActivity = require('../../Model/user/userActivityModel');

// CONTROLLER
const topLevelBucketController = require('../../userBucketController/ParentList');
const nestedLevelBucketController = require('../../userBucketController/nestedLevelList');
const Factory = require('../../handleFactoryController');

// UTILS
const catchAsync = require('../../../utils/catchAsync');
const send = require('../../../utils/sendJSON');
const AppError = require('../../../utils/AppError');
const tryCatch = require('../../../utils/tryCatch');
const sendReq = require('../../../utils/sendJSON');


const schema= {
  wishlists:[
    {
      name:"new2023",
      items:[{}]
    },
    {
      name:"new2023",
      items:[{}]
    }
  ]

}


// wishlists(top-level) -------------------------------------------
exports.addItemToParentList = catchAsync(async (req, res, next) => {
  const wishlistId = mongoose.Types.ObjectId();

  const { wishlistName, product } = req.body;

  const userId = req.user._id;

  const result = await topLevelBucketController.addItemToList(
    UserActivity,
    userId,
    'wishlists',
    {
      _id: wishlistId,
      name: wishlistName,
      items: [{ _id: product._id }],
    },
    {
      checkItemExist: true,
      limit: 'infinite',
    },
    {
      update: true,
      query: {
        filter: {},
        update: {
          $push: {
            wishlists: {
              _id: wishlistId,
              name: wishlistName,
              items: {
                _id: product._id,
                thumbnail: product.thumbnail,
              },
            },
          },
        },
      },
    }
  );


  // add wishlist with item to user

  return send(res, 200, 'wishlist-created', result);
});
exports.removeItemfromParentList = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user._id;

  const result = await topLevelBucketController.removeItemFromList(
    UserActivity,
    userId,
    'wishlists',
    id,

    {
      update: true,
      query: {
        filter: {},
        update: {
          $pull: {
            wishlists: {
              _id: id,
            },
          },
        },
      },
    }
  );


  // add wishlist with item to user

  return send(res, 200, 'wishlist-removed', result);
});


// wishlist items list => myShoppingList
exports.getParentList = tryCatch(async(userId)=>{// return top level list name and id
    const doc = await UserActivity.findOne(
      { userId: userId },
      { wishlists: 1 }
    ).exec();
    let { wishlists } = doc;
    wishlists = wishlists.map((el) => ({ _id: el._id, name: el.name }));
      return wishlists;
      
  })


// wishlist(nested-level) ---------------------------
exports.addItemToParentList = catchAsync(async (req, res, next) => {
  const { wishlist, product } = req.body;

  const userId = req.user._id;

  const result = await nestedLevelBucketController.addItemToListAndUpdateUser(
    UserActivity,
    userId,
    'wishlists',
    wishlist, // {_id,name}
    product, // {product}
    {
      update: true,
      query: {
        filter: {
          'wishlists._id': wishlist._id,
        },
        update: {
          $push: {
            'wishlists.$.items': {
              $each: [
                {
                  _id: product._id,
                  thumbnail: product.thumbnail,
                },
              ],
              $sort: {
                _id: -1,
              },
              $slice: 3,
            },
          },
        },
      },
    } // {update,query}
  );

  if (result === 'item-exist') return next(new AppError('item-exist', 400));


  // add wishlist with item to user

  return send(res, 200, 'wishlist product added', result);
});
exports.removeItemfromParentList = catchAsync(async (req, res, next) => {
  const { wishlistId, productId } = req.params;

  const userId = req.user._id;

  const result =
    await nestedLevelBucketController.removeItemFromListAndUpdateUser(
      UserActivity,
      userId,
      'wishlists',
      wishlistId, // {_id,name}
      productId, // {product}
      {
        update: true,
        query: {
          filter: {
            'wishlists._id': wishlistId,
          },
          update: {
            $pull: {
              'wishlists.$.items': {
                _id: productId,
              },
            },
          },
        },
      } // {update,query}
    );
  // add wishlist with item to user

  if(result==='item-not-exist') return next(new AppError('Item not exist',400))

  return send(res, 200, 'wishlist item removed', result);
}); 

exports.moveItemBwParentList = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { fromWishlistId, toWishlistId } = req.params;
  const { item } = req.body;
  await nestedLevelBucketController.addItemToListAndUpdateUser(
    UserActivity,
    userId,
    'wishlists',
    { _id: toWishlistId }, // {_id,name}
    item, // {product}
    {
      update: true,
      query: {
        filter: {
          'wishlists._id': toWishlistId,
        },
        update: {
          $push: {
            'wishlists.$.items': {
              $each: [item],
              $sort: {
                _id: -1,
              },
              $slice: 1,
            },
          },
        },
      },
    } // {update,query}
  );
  await nestedLevelBucketController.removeItemFromListAndUpdateUser(
    UserActivity,
    userId,
    'wishlists',
    fromWishlistId, // {_id,name}
    item._id, // {product}
    {
      update: true,
      query: {
        filter: {
          'wishlists._id': fromWishlistId,
        },
        update: {
          $pull: {
            'wishlists.$.items': {
              _id: item._id,
            },
          },
        },
      },
    } // {update,query}
  );

  return send(res, 200, 'moved-item');
});  

// filter
exports.getParentListItems = tryCatch(async(userId,wishlistId,query)=>{
  const { sort, filter } = query;
  const pipeline = [
    {
      $match: {
        $and: [
          {
            userId: new mongoose.Types.ObjectId(userId),
          },
          {
            wishlists: { $gt: [] },
          },
        ],
      },
    },

    { $project: { wishlists: 1, _id: 0 } },

    {
      $set: {
        wishlists: {
          $first: {
            $filter: {
              input: '$wishlists',
              as: 'wishlist',
              cond: {
                $and: [
                  {
                    $eq: [
                      '$$wishlist._id',
                      new mongoose.Types.ObjectId(wishlistId),
                    ],
                  },
                  {
                    $gt: [{ $size: '$$wishlist.items' }, 0],
                  },
                ],
              },
            },
          },
        },
      },
    },

    { $project: { items: '$wishlists.items' } },

    { $unwind: '$items' },

    { $replaceWith: '$items' },

    // filter stage (purchased or not)
    { $match: { purchased: filter === 'purchased' } }, // false or true

    {
      $lookup: {
        from: 'products',
        let: { itemId: `$_id` },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$_id', '$$itemId'] }],
              },
            },
          },

          {
            $project: {
              title: 1,
              _id: 1,
              rating: { count: '$rating.count', value: '$rating.value' },
              curVariant: 1,
              price: 1,
              thumbnail: '$assets.thumbnail',
            },
          },
        ],

        as: 'matched',
      },
    },

    {
      $replaceWith: {
        $mergeObjects: [
          { $first: '$matched' },
          { ts: '$ts', purchased: '$purchased' },
        ],
      },
    },
  ];
  if (sort) {
    if (sort === 'default') pipeline.push({ $sort: { ts: -1 } });
    if (sort === 'price') pipeline.push({ $sort: { 'price.value': 1 } });
    if (sort === '-price') pipeline.push({ $sort: { 'price.value': -1 } });
  }
  const wishlistItems = await UserActivity.aggregate(pipeline);
  return wishlistItems;
})



// small queries---------------------------------
exports.getTopLevelItemsCount = (req, res) =>
  send(res, 200, 'my-wishlists-count', {
    wishlistsCount: req.user.wishlists.length,
  });

exports.updateTopLevelAllItems = catchAsync(async (req, res) => {
  nestedLevelBucketController.updateAllItems(
    UserActivity,
    req.user._id,
    'wishlists',
    req.body
  );
  return send(res, 200, 'update all items');
});
