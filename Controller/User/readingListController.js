const mongoose = require('mongoose');

// MODEL
const UserActivity = require('../../Model/user/userActivityModel');

// CONTROLLER
const topLevelBucketController = require('../userBucketController/topLevelList');
const nestedLevelBucketController = require('../userBucketController/nestedLevelList');

// UTILS
const catchAsync = require('../../utils/catchAsync');
const send = require('../../utils/sendJSON');
const AppError = require('../../utils/AppError');
const tryCatch = require('../../utils/tryCatch');



// READING LIST (CREATE OR DELETE READING LIST)(top-level) -------------------------------------------
exports.createReadingList = catchAsync(async (req, res, next) => {
  const listId = mongoose.Types.ObjectId();

  const { listName, blog } = req.body;

  const userId = req.user._id;

  const result = await topLevelBucketController.addItemToList(
    UserActivity,
    userId,
    'readingLists',
    {
      _id: listId,
      name: listName,
      items: [blog],
    },
    {
      checkItemExist: false,
      limit: 'infinite',
    },
    {
      update: false,
      query: {
        filter: {},
        update: {
          $push: {
          
          },
        },
      },
    }
  );


  // add wishlist with item to user

  return send(res, 200, 'readingList created', result);
});

exports.removeReadingList = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user._id;

  const result = await topLevelBucketController.removeItemFromList(
    UserActivity,
    userId,
    'readingLists',
    id,

    {
      update: false,
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

  return send(res, 200, 'readingList removed', result);
});


// return readingLists= {name,_id}
exports.getReadingLists = tryCatch(async(userId)=>{// return top level list name and id
    const doc = await UserActivity.findOne(
      { userId: userId },
      { wishlists: 1 }
    ).exec();
    let { wishlists } = doc;
    wishlists = wishlists.map((el) => ({ _id: el._id, name: el.name }));
      return wishlists;
      
  })

// return top level list name and id
exports.apiGetReadingLists = catchAsync(async (req, res) => {
  const wishlists= await this.getReadingLists(req.user._id);

  return send(res, 200, 'readingLists', { docs: wishlists });
});

// wishlist(nested-level) ---------------------------
exports.addItemToReadingList = catchAsync(async (req, res, next) => {
  const { wishlist, product } = req.body;

  const userId = req.user._id;

  const result = await nestedLevelBucketController.addItemToListAndUpdateUser(
    UserActivity,
    userId,
    'readingLists',
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
exports.removeItemFromWishlist = catchAsync(async (req, res, next) => {
  const { wishlistId, productId } = req.params;

  const userId = req.user._id;

  const result =
    await nestedLevelBucketController.removeItemFromListAndUpdateUser(
      UserActivity,
      userId,
      'readingLists',
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

exports.moveItemBwWishlist = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { fromWishlistId, toWishlistId } = req.params;
  const { item } = req.body;
  await nestedLevelBucketController.addItemToListAndUpdateUser(
    UserActivity,
    userId,
    'readingLists',
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
    'readingLists',
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
exports.getWishlistItems = tryCatch(async(userId,wishlistId,query)=>{
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

exports.apiGetWishlistItems = catchAsync(async (req, res, next) => {
  const wishlistItems= await this.getWishlistItems(req.user._id,req.params.id,req.query);
  return send(res, 200, 'items', { docs: wishlistItems });
});

// small queries---------------------------------
exports.getMyWishlistCount = (req, res) =>
  send(res, 200, 'my-wishlists-count', {
    wishlistsCount: req.user.wishlists.length,
  });

exports.updateWishlistsAllItems = catchAsync(async (req, res) => {
  nestedLevelBucketController.updateAllItems(
    UserActivity,
    req.user._id,
    'readingLists',
    req.body
  );
  return send(res, 200, 'update all items');
});
