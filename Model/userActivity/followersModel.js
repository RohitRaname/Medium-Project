/* eslint-disable camelcase */
const mongoose = require('mongoose');

// group by user to limit data loaded when search by user
// 1000 -> 50

const FollowersSchema = new mongoose.Schema({
  // user id
  userId: mongoose.Schema.Types.ObjectId,

  page: { type: Number, default: 0 },

  // this limit if for top level items => review,wishlists
  limit: { type: Number, default: 100 },

  followers: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      bio:String,
      followers: { type: Number, default: 0 },
    },
  ],
  // this will be fast to fill so no need it to be here
});

FollowersSchema.index({ userId: 1, page: 1 });

FollowersSchema.index({ userId: 1, 'followers._id': 1 });

const Followers = mongoose.model('followers', FollowersSchema);

module.exports = Followers;
