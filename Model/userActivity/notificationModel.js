/* eslint-disable camelcase */
const mongoose = require('mongoose');

// group by user to limit data loaded when search by user
// 1000 -> 50

const NotificationSchema = new mongoose.Schema({
  // user id
  userId: mongoose.Schema.Types.ObjectId,

  page: { type: Number, default: 0 },

  // this limit if for top level items => review,wishlists
  limit: { type: Number, default: 100 },

  notifications: [
    {
        author: String,
        blog: {
          _id: mongoose.Schema.Types.ObjectId,
          title: String,
          thumbnail: String,
        },
      }
  ],

  __v:{type:Number,select:false}
  // this will be fast to fill so no need it to be here
});

NotificationSchema.index({ userId: 1, page: 1 });

NotificationSchema.index({ userId: 1, 'notifications._id': 1 });

const Notification = mongoose.model('notification', NotificationSchema);

module.exports = Notification;
