/* eslint-disable camelcase */
const mongoose = require('mongoose');

// group by user to limit data loaded when search by user
// 1000 -> 50

const CommentSchema = new mongoose.Schema({
  author: {
    _id: mongoose.Schema.Types.ObjectId,
    avatar: { type: String, default: 'default.png' },
    name: String,
  },

  parentId: mongoose.Schema.Types.ObjectId,
  ancestorIds: [String],

  text: String,
  active: { type: Boolean, default: false },
  
  count: {
      like: { type: Number, default: 0 },
      bookmark: { type: Number, default: 0 },
      replyTo: { type: Number, default: 0 },
  },

  ts: { type: Date, default: new Date() },

});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
