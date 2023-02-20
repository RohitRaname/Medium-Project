/* eslint-disable camelcase */
const mongoose = require('mongoose');

// group by user to limit data loaded when search by user
// 1000 -> 50

const FollowingSchema = new mongoose.Schema({
  // user id
  userId: mongoose.Schema.Types.ObjectId,

  page: { type: Number, default: 0 },

  // this limit if for top level items => review,wishlists
  limit: { type: Number, default: 100 },

  following: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      bio:String,
      followersCount: { type: Number, default: 0 },
    },
  ],
  // this will be fast to fill so no need it to be here
});

FollowingSchema.index({ userId: 1, page: 1 });

FollowingSchema.index({ userId: 1, 'following._id': 1 });

const Following = mongoose.model('following', FollowingSchema);

module.exports = Following;
