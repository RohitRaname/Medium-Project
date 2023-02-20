/* eslint-disable camelcase */
const mongoose = require('mongoose');

// group by user to limit data loaded when search by user
// 1000 -> 50

const BlogSchema = new mongoose.Schema({
  author: {
    _id: mongoose.Schema.Types.ObjectId,
    avatar: { type: String, default: 'default.png' },
    name: String,
  },

  genre: String,
  access: String,
  content: {
    title: String,
    text: String,
    thumbnail: String,
    photos: [String],
  },
  active: { type: Boolean, default: false },
  ts: { type: Date, default: new Date() },

  // this will be fast to fill so no need it to be here
});

BlogSchema.index({ userId: 1, page: 1 });

BlogSchema.index({ userId: 1, 'following._id': 1 });
BlogSchema.index({ userId: 1, 'followers._id': 1 });
BlogSchema.index({ userId: 1, 'history._id': 1 });
BlogSchema.index({ userId: 1, 'reviews._id': 1 });
BlogSchema.index({ userId: 1, 'following._id': 1 });
BlogSchema.index({ userId: 1, 'cart._id': 1 });
BlogSchema.index({ userId: 1, 'orders._id': 1 });
BlogSchema.index({ userId: 1, 'orderItems._id': 1 });

const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;
