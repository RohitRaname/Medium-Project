const catchAsync = require('../../utils/catchAsync');
const tryCatch = require('../../utils/tryCatch');
const send = require('../../utils/sendJSON');

// Model
const History = require('../../Model/userActivity/historyModel');

// CONTROLLER
const topLevelBucketController = require('../userBucketController/topLevelList');

// if blog already exist then update ts of blog so we get blog at latest history at top 
exports.saveBlogInHistory = tryCatch(async (userId, blog) => {
  await topLevelBucketController.addItemToList(
    History,
    userId,
    'history',
    blog,
    {
      checkItemExist: true,
      updateIfItemExist:{
        $set:{
            "history.$.ts": new Date()
        }
      }
    },
    {
      update: false,
    }
  );
});

exports.removeBlogFromHistory = tryCatch(async (userId, blogId) => {
    await topLevelBucketController.removeItemFromList(
      History,
      userId,
      'history',
      blogId,
      {
        update: false,
       
      }
    );
  });
  
exports.getHistory = tryCatch(
  async (userId, query) =>
    await topLevelBucketController.getEmbeddedItems(
      History,
      userId,
      'history',
      query
    )
);

exports.removeAllHistoryBlogs= tryCatch(async (userId) => {
    await topLevelBucketController.removeAllItems(
      History,
      userId,
      'history',
      {update:false}
    );
  });

exports.apiSaveBlogInHistory = catchAsync(async (req, res) => {
  const result = await this.saveBlogInHistory(req.user._id, req.body);
  return send(res, 200,'blog saved');
});

exports.apiRemoveBlogFromHistory = catchAsync(async (req, res) => {
  const result = await this.removeBlogFromHistory(req.user._id, req.params.id);
  return send(res, 200, 'blog remove from history');
});
exports.apiRemoveAllBlogsFromHistory = catchAsync(async (req, res) => {
    const result = await this.removeAllHistoryBlogs(req.user._id);
    return send(res, 200,'all blog removed from history');
  });
exports.apiGetHistory = catchAsync(async (req, res) => {
  const result = await this.getHistory(req.user._id, req.query);
  return send(res, 200, 'get blogs from history', { total: result.length, docs: result });
});
