/* eslint-disable camelcase */
const mongoose = require('mongoose');
const catchAsync = require('../../utils/catchAsync');
const tryCatch = require('../../utils/tryCatch');
const defaultLimit = 50;

const getNewDocPageNumber = tryCatch(async (model, userId) => {
  const doc = await model
    .findOne({
      userId,
    })
    .sort({ page: -1 })
    .limit(1)
    .exec();
  if (!doc) return 0;
  return Number(doc.page) + 1;
});

exports.updateUserDoc = tryCatch(async (userId, query) => {
  await mongoose
    .model('user')
    .findOneAndUpdate({ _id: userId, ...query.filter }, query.update)
    .exec();
});

// create new doc with empty list
exports.createNewList = tryCatch(
  async (
    model,
    userId,
    mainListName,
    topParentListObj,
    item,
    updateUserOptions
  ) => {
    const newPage = await getNewDocPageNumber(model, userId);

    // create list
    const docUpdate = await model.create({
      userId: userId,
      page: newPage,

      [mainListName]: {
        ...topParentListObj,
        items: [item],
        /////////////////////////////
        // STOPPED
      },
    });

    if (updateUserOptions.update)
      this.updateUserDoc(userId, updateUserOptions.query);
  }
);

// check item exist then return list
exports.checkItemExistAndReturnItemList = tryCatch(
  async (model, userId, mainListName, topParentListObj, itemId) => {
    const doc = await model
      .findOne(
        {
          userId: userId,

          $and: [
            {
              [`${mainListName}._id`]: topParentListObj._id,
            },
            { [`${mainListName}.items`]: { _id: itemId } },
          ],
        },
        { [mainListName]: 1 }
      )
      .exec();

    if (!doc) return;

    return doc[mainListName].find(
      (el) => el._id.toString() === topParentListObj._id.toString()
    ).items;
  }
);

exports.addItem = tryCatch(
  async (
    model,
    userId,
    mainListName,
    topParentListObj, // {_id,name}
    item
  ) =>
    await model
      .findOneAndUpdate(
        {
          userId: userId,
          [`${mainListName}._id`]: topParentListObj._id,
        },
        {
          $push: { [`${mainListName}.$.items`]: { _id: item._id } },
        },
        {
          new: true,
        }
      )
      .exec()
);

// remove item from list
exports.removeItem = tryCatch(
  async (model, userId, mainListName, topParentListId, itemId) =>
    await model
      .findOneAndUpdate(
        {
          userId: userId,
          $and: [
            {
              [`${mainListName}._id`]: topParentListId,
            },
            // { [`${mainListName}.items`]: { _id: itemId } },
          ],
        },
        {
          $pull: {
            // remove wishlist item
            [`${mainListName}.$[el].items`]: { _id: itemId },
          },
        },
        { new: true, arrayFilters: [{ 'el._id': topParentListId }] }
      )
      .exec()
);

exports.moveItemToTopOfList = tryCatch(
  async (
    model,
    userId,
    mainListName,
    topParentListObj, // {_id,name}
    item
  ) => {
    await this.removeItem(
      model,
      userId,
      mainListName,
      topParentListObj._id,
      item._id
    );
    await model
      .findOneAndUpdate(
        {
          userId: userId,
          [`${mainListName}._id`]: topParentListObj._id,
        },
        {
          $push: {
            [`${mainListName}.$[el].items`]: { $each: [item], $position: 0 },
          },
        },
        {
          arrayFilters: [{ 'el._id': topParentListObj._id }],
          new: true,
        }
      )
      .exec();
  }
);

// add item to bucketList
exports.addItemToListAndUpdateUser = tryCatch( async (
  model,
  userId,
  mainListName,
  topParentListObj, // {_id,name}
  item,
  updateUserOptions // {update,query}
) => {
  const itemList = await this.checkItemExistAndReturnItemList(
    model,
    userId,
    mainListName,
    topParentListObj,
    item
  );


  // list length exceed
  if (itemList && itemList.length > defaultLimit)
    return await this.createNewList(
      model,
      userId,
      mainListName,
      topParentListObj,
      item,
      updateUserOptions
    );

  // item already exist
  if (itemList) {
    await this.moveItemToTopOfList(
      model,
      userId,
      mainListName,
      topParentListObj, // {_id,name}
      item
    );

    return 'item-exist';
  }

  const docUpdate = await this.addItem(
    model,
    userId,
    mainListName,
    topParentListObj,
    item
  );

  if (docUpdate) {
    if (updateUserOptions.update)
      this.updateUserDoc(userId, updateUserOptions.query);
  }

  // if list is full then new create new doc
});
exports.removeItemFromListAndUpdateUser = tryCatch( async (
  model,
  userId,
  mainListName,
  topParentListId, // {_id}
  itemId, // {_id}
  updateUserOptions // {update,query}
) => {

  const docUpdate = await this.removeItem(
    model,
    userId,
    mainListName,
    topParentListId, // {_id}
    itemId
  );

  if (!docUpdate) return 'item-not-exist';

  if (docUpdate) {
    if (updateUserOptions.update)
      this.updateUserDoc(userId, updateUserOptions.query);
  }
});

// tojust add new field during development phase
exports.updateAllItems = tryCatch(
  async (model, userId, mainListName, updateItemBody) =>
    await model
      .updateMany(
        {
          userId: userId,
        },
        {
          $set: {
            [`${mainListName}.$[].items.$[].${updateItemBody.field}`]:
              updateItemBody.value,
          },
        },
        {
          new: true,
        }
      )
      .exec()
);
