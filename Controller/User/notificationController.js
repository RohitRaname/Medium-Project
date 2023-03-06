const catchAsync = require('../../utils/catchAsync');
const tryCatch = require('../../utils/tryCatch');
const send = require('../../utils/sendJSON');

const followerController = require('../../Model/userActivity/followersModel');

// Model
const Notification = require('../../Model/userActivity/notificationModel');
const UserActivity = require('../../Model/user/userActivityModel');


// CONTROLLER
const topLevelBucketController = require('../userBucketController/topLevelList');
const meController= require('./meController')

// send notification to followers when i post something
exports.sendNotificationToFollowers = tryCatch(async (userId, item) => {
  console.log('sendNotification', userId, item);

  let followers = await followerController.getFollowers(userId);

  followers=  await meController.filterDocsForMe(
    UserActivity,
    userId,
    ['mutedUsers', 'blockedUsers'],
    followers,
  );

  console.log('followers', followers);
  const sendNotificationPromises = [];

  followers.forEach((follower) => {
    const sendNotification = topLevelBucketController.addItemToList(
      Notification,
      follower._id,
      'notifications',
      item,
      {
        checkItemExist: false,
        deleteItemExist: false,
      },
      {
        update: false,
      }
    );

    sendNotificationPromises.push(sendNotification);
  });

  await Promise.all(sendNotificationPromises);
});

exports.getNotifications = tryCatch(
  async (userId, query) =>{

    const notifications= await topLevelBucketController.getEmbeddedItems(
      Notification,
      userId,
      'notifications',
      query
      )

    const mutedUsers= await getMyActivityFieldAllItems(userId,"mutedUsers")

    // filter comments from user that i muted in past
    comments= comments.filter(comment=> !mutedUsers.find(user=> user._id.toString()===comment.author._id.toString()));
    }
);

exports.apiGetNotifications = catchAsync(async (req, res) => {
  console.log(req.query);

  const users = await this.getNotifications(req.user._id, req.query);
  return send(res, 200, 'notifications', { total: users.length, docs: users });
});
