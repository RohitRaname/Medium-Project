const mongoose = require('mongoose');

// MODEL
const UserActivity = require('../../Model/user/userActivityModel');

// CONTROLLER
const globalBlogController= require('../Blog/blogController')
const topLevelBucketController = require('../userBucketController/topLevelList');
const nestedLevelBucketController = require('../userBucketController/nestedLevelList');

// UTILS
const catchAsync = require('../../utils/catchAsync');
const send = require('../../utils/sendJSON');
const AppError = require('../../utils/AppError');
const tryCatch = require('../../utils/tryCatch');

// wishlists(top-level) -------------------------------------------
exports.apiCreateReadingList = catchAsync(async (req, res, next) => {
  const listId = mongoose.Types.ObjectId();


  const userId = req.user._id;

  const result = await topLevelBucketController.addItemToList(
    UserActivity,
    userId,
    'readingLists',
    {
      _id: listId,
      
      items: [],
      ...req.body
    },
    {
      checkItemExist: true,
      limit: 50,
    },
    {
      update: false,
      query: {
        filter: {},
        update: {
          $push: {},
        },
      },
    }
  );

  // add wishlist with item to user

  return send(res, 200, 'readingListCreated', {readingListId:listId});
});
exports.apiDeleteReadingList = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user._id;

  const result = await topLevelBucketController.removeItemFromList(
    UserActivity,
    userId,
    'readingLists',
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

// reading {_id,name}
exports.getReadingLists = tryCatch(async (userId) => {
  // return top level list name and id
  const doc = await UserActivity.findOne(
    { userId: userId },
    { readingLists: 1 }
  ).exec();
  let { readingLists } = doc;
  readingLists = readingLists.map((el) => ({ _id: el._id, name: el.name }));
  return readingLists;
});

// return top level list name and id
exports.apiGetReadingLists = catchAsync(async (req, res) => {
  const wishlists = await this.getReadingLists(req.user._id);

  return send(res, 200, 'readingLists', { docs: wishlists });
});

// wishlist(nested-level) ---------------------------
exports.apiAddItemToReadingList = catchAsync(async (req, res, next) => {
  // list {_id}
  

  const {id}= req.params;


  const userId = req.user._id;

  const result = await nestedLevelBucketController.addItemToListAndUpdateUser(
    UserActivity,
    userId,
    'readingLists',
    { _id: id }, // {_id}
    req.body, // {}
    {
      update: false,
      query: {
        filter: {},
        update: {},
      },
    } // {update,query}
  );

  if (result === 'item-exist') return next(new AppError('item-exist', 400));

  // add wishlist with item to user

  return send(res, 200, 'wishlist product added', result);
});
exports.apiRemoveItemFromReadingList = catchAsync(async (req, res, next) => {
  const { id, itemId } = req.params;

  const userId = req.user._id;

  const result =
    await nestedLevelBucketController.removeItemFromListAndUpdateUser(
      UserActivity,
      userId,
      'readingLists',
      id, // {_id,name}
      itemId, // {product}
      {
        update: false,
        query: {
          filter: {},
          update: {},
        },
      } // {update,query}
    );
  // add wishlist with item to user

  if (result === 'item-not-exist')
    return next(new AppError('Item not exist', 400));

  return send(res, 200, 'wishlist item removed', result);
});

exports.apiMoveItemBwWishlist = catchAsync(async (req, res) => {
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

exports.getReadingListsSummary = tryCatch(async (userId) => {
  const summary = await UserActivity.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },

    { $project: { readingLists: 1 } },

    { $unwind: '$readingLists' },

    {
      $unwind: {
        path: '$readingLists.items',
        preserveNullAndEmptyArrays: true,
      },
    },

    { $sort: { ts: -1 } },

    { $replaceWith: '$readingLists' },

    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        totalItems: {
          $sum: {
            $cond: {
              if: '$items',
              then: 1,
              else: 0,
            },
          },
        },
        items: { $push: '$items' },
      },
    },

    {
      $set: {
        items: { $slice: ['$items', -3] },
      },
    },

    {
      $set: {
        itemsThumbnail: {
          $map: {
            input: '$items',
            as: 'item',
            in: '$$item.content.thumbnail',
          },
        },
      },
    },

    // {
    //   $set: {
    //     last3Items: {
    //       $slice: [{ $concatArrays: '$items' }, -3],
    //     },
    //   },
    // },

    // {
    //   $set: {
    //     last3ItemsThumbnail: {
    //       $map: {
    //         input: '$last3Items',
    //         as: 'item',
    //         in: '$$item.thumbnail',
    //       },
    //     },
    //   },
    // },

    { $unset: ['items'] },
  ]);
  return summary;
});

exports.apiGetReadingListsSummary = catchAsync(async (req, res, next) => {
  const summary = await this.getReadingListsSummary(req.user._id);
  return send(res, 200, 'summary', summary);
});

// filter
exports.getReadingListItems = tryCatch(async (userId, listId) => {
  const wishlistItems = await nestedLevelBucketController.getListItems(
    UserActivity,
    userId,
    'readingLists',
    listId
  );
  return wishlistItems;
});

exports.apiGetReadingListsItems = catchAsync(async (req, res, next) => {
  const wishlistItems = await this.getReadingListItems(
    req.user._id,
    req.params.id
  );
  return send(res, 200, 'items', { docs: wishlistItems });
});

// i now know the value of consistency just show up 
exports.getReadingListsInWhichItemExist= tryCatch(async(userId,itemId,activityDocs)=>{
  const userActivityDocs= activityDocs || await UserActivity.find({userId:userId})


  const listArr=[]

userActivityDocs.forEach(doc=>{
  const {readingLists}=doc;

  readingLists.forEach(list=>{
    if(list.items.find(item=>item._id.toString()===itemId.toString())) listArr.push({_id:list._id,name:list.name})
  })

})

return listArr;




  

})

exports.apiGetListsInWhichItemExist = catchAsync(async (req, res, next) => {
  const lists = await this.getReadingListsInWhichItemExist(
    req.user._id,
    req.params.itemId,
    false
  );
  return send(res, 200, 'reading list item exist', lists);
});


// small queries---------------------------------

exports.updateWishlistsAllItems = catchAsync(async (req, res) => {
  nestedLevelBucketController.updateAllItems(
    UserActivity,
    req.user._id,
    'readingLists',
    req.body
  );
  return send(res, 200, 'update all items');
});

