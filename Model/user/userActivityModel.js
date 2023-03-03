/* eslint-disable camelcase */
const mongoose = require('mongoose');

// group by user to limit data loaded when search by user
// 1000 -> 50

const UserActivitySchema = new mongoose.Schema({
  // user id
  userId: mongoose.Schema.Types.ObjectId,

  page: { type: Number, default: 0 },

  // this limit if for top level items => review,wishlists
  limit: { type: Number, default: 50 },

  blockedUsers: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      bio: String,
    },
  ],
  mutedUsers: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      bio: String,
    },
  ],

  // reading list with blogs
  readingLists: [
    {
      // readingList id
      _id: mongoose.Schema.Types.ObjectId,
      
      // reading list name
      name: String,

      private:{type:Boolean,default:false},
      description:String,

      items: [{
        _id: mongoose.Schema.Types.ObjectId,
        genre: String,
        access: String,
        author: {
          _id: mongoose.Schema.Types.ObjectId,
          name: String,
          avatar: String,
        },
        content: {
          title: String,
          text: String,
          thumbnail: String,
          timeToRead: Number,
        },
        ts: Date,
      }],
    },
  ],

  following: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      followers: { type: Number, default: 0 },
      bio: String,
    },
  ],
  followers: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      followers: { type: Number, default: 0 },
      bio: String,
    },
  ],
  history: [
    {
      authorId: mongoose.Schema.Types.ObjectId,
      title: String,
      text: String,
      ts: { type: Date, default: new Date() },
    },
  ],
  blogs: [
    {
      genre: String,
      access: String,
      content: {
        title: String,
        text: String,
        thumbnail: String,
        photos: [String],
        timeToRead: Number,
      },
      active: { type: Boolean, default: false },
      ts: { type: Date, default: new Date() },

      count: {
        like: { type: Number, default: 0 },
        comment: { type: Number, default: 0 },
        bookmark: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
      },
    },
  ],

  genreBlogsWrite: [String],
  genreFollow: [String],
  genreIgnore: [String],

  likeBlogs: [{ _id: mongoose.Schema.Types.ObjectId }],
  bookmarkBlogs: [{ _id: mongoose.Schema.Types.ObjectId }],
  comments: [{ _id: mongoose.Schema.Types.ObjectId }],

  // this will be fast to fill so no need it to be here
});

UserActivitySchema.index({ userId: 1, page: 1 });

UserActivitySchema.index({ userId: 1, 'following._id': 1 });
UserActivitySchema.index({ userId: 1, 'followers._id': 1 });
UserActivitySchema.index({ userId: 1, 'history._id': 1 });
UserActivitySchema.index({ userId: 1, 'reviews._id': 1 });
UserActivitySchema.index({ userId: 1, 'following._id': 1 });
UserActivitySchema.index({ userId: 1, 'cart._id': 1 });
UserActivitySchema.index({ userId: 1, 'orders._id': 1 });
UserActivitySchema.index({ userId: 1, 'orderItems._id': 1 });

const UserActivity = mongoose.model('userActivity', UserActivitySchema);

module.exports = UserActivity;
