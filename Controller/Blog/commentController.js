const { default: mongoose } = require('mongoose');

// Utils
const catchAsync = require('../../utils/catchAsync');
const tryCatch = require('../../utils/tryCatch');
const send = require('../../utils/sendJSON');
const {
  formatQueryIntoPipeline,
} = require('../../utils/mongodbQueryConverter');
const { retryUntilFulfillReqDocsLimit } = require('../helper_controller');

// Model
const Comment = require('../../Model/blog/commentModel');
const UserActivity = require('../../Model/user/userActivityModel');

// Controller

const meController = require('../User/meController');
const topLevelBucketController = require('../userBucketController/topLevelList');
const {
  addUserActivityItemAndUpdateCountInBlog,
} = require('../User/meController');

// save comment in comment bucket controller
exports.saveBlogComment = tryCatch(async (userId, blogId, comment) => {
  // 1.check parent exist of comment and if exist then increase its child comment count
  // 1.5.increase tweet comment count (if comment top parent el)
  // 2.save comment
  // 3.save comment in user_comment_bucket

  const { parentId } = comment;
  let parentComment, updateParentCommentReplyCount;

  // 1. update parent comment replyTo Count
  if (parentId) {
    [parentComment, updateParentCommentReplyCount] = await Promise.all([
      topLevelBucketController.getEmbeddedItem(
        Comment,
        blogId,
        'comments',
        parentId
      ),
      topLevelBucketController.updateItemInList(
        Comment,
        blogId,
        'comments',
        parentId,
        { $inc: { 'comments.$.count.reply': 1 } }
      ),
    ]);

    console.log('parent-comment', parentComment);

    comment.ancestorIds = [...parentComment.ancestorIds, parentComment._id];
  }

  // 2.save blog comments
  const commentDoc = await topLevelBucketController.addItemToList(
    Comment,
    blogId,
    'comments',
    comment,
    {
      checkItemExist: false,
      deleteItemExist: false,
    },
    {
      update: false,
      query: {
        filter: {},

        update: {},
      },
    }
  );

  return commentDoc;
});

// whole comment save
exports.postComment = tryCatch(async (userId, blogId, comment) => {
  comment._id = new mongoose.Types.ObjectId();

  const saveBlogComment = this.saveBlogComment(userId, blogId, comment);

  const saveCommentInUser = topLevelBucketController.addItemToList(
    UserActivity,
    userId,
    'comments',
    { _id: comment._id, text: comment.text },
    {
      checkItemExist: false,
      deleteItemExist: false,
    },
    {
      update: false,
      query: {
        filter: {},

        update: {
          $inc: { 'count.following': 1 },
        },
      },
    }
  );

  // update comment count in user blog and global blog
  const updateCommentCountInBlog = addUserActivityItemAndUpdateCountInBlog(
    userId,
    blogId,
    { _id: comment._id, text: comment.text },
    'comments',
    'comment',
    'increase'
  );

  await Promise.all([
    saveBlogComment,
    saveCommentInUser,
    updateCommentCountInBlog,
  ]);

  return comment._id;
});

// userId, blogId, query
exports.getComments = (funcArgs, reqQuery) =>
  retryUntilFulfillReqDocsLimit(
    tryCatch(async () => {
      const [userId, blogId] = funcArgs;

      console.log("query",reqQuery)

      delete reqQuery.blogId;
      let comments = await topLevelBucketController.getEmbeddedItems(
        Comment,
        blogId,
        'comments',
        reqQuery,
        {}
      );

      comments = await meController.filterDocsForMe(
        UserActivity,
        userId,
        ['mutedUsers', 'blockedUsers'],
        comments,
        'author'
      );

      return comments;
    }),reqQuery
  );

exports.apiCreateComment = catchAsync(async (req, res, next) => {
 const commentId= await this.postComment(req.user._id, req.query.blogId, req.body);
  return send(res, 200, 'comment created',{commentId});
});
exports.apiGetComments = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const comments = await this.getComments(
    [userId, req.query.blogId],
    req.query
  );
  return send(res, 200, 'get comments', comments);
});
