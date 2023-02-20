const catchAsync = require('../../utils/catchAsync');
const tryCatch = require('../../utils/tryCatch');
const send = require('../../utils/sendJSON');

const followerController = require('../../Model/userActivity/followersModel');

// Model
const Notification = require('../../Model/userActivity/notificationModel');


// CONTROLLER
const topLevelBucketController = require('../userBucketController/topLevelList');

// send notification to followers when i post something
exports.sendNotificationToFollowers = tryCatch(async (userId, item) => {
  console.log('sendNotification', userId, item);

  const followers = await followerController.getFollowers(userId);

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
  async (userId, query) =>
    await topLevelBucketController.getEmbeddedItems(
      Notification,
      userId,
      'notifications',
      query
    )
);

exports.apiGetNotifications = catchAsync(async (req, res) => {
  console.log(req.query);

  const users = await this.getNotifications(req.user._id, req.query);
  return send(res, 200, 'notifications', { total: users.length, docs: users });
});
