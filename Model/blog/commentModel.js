/* eslint-disable camelcase */
const mongoose = require('mongoose');

// group by user to limit data loaded when search by user
// 1000 -> 50

const CommentSchema = new mongoose.Schema({
  // treat userId as blogId 
  userId: mongoose.Schema.Types.ObjectId,

  page: { type: Number, default: 0 },

  // this limit if for top level items => review,wishlists
  limit: { type: Number, default: 100 },

  comments: [
    {
      author: {
        _id: mongoose.Schema.Types.ObjectId,
        avatar: { type: String, default: 'default.png' },
        name: String,
      },

      parentId: mongoose.Schema.Types.ObjectId,
      ancestorIds: [String],
      

      text: String,
      active: { type: Boolean, default: true },

      count: {
        like: { type: Number, default: 0 },
        bookmark: { type: Number, default: 0 },
        reply: { type: Number, default: 0 },
      },

      ts: { type: Date, default: new Date() },
    },
  ],

  
  __v:{type:Number,select:false}

  // this will be fast to fill so no need it to be here
});
const Comment = mongoose.model('comment', CommentSchema);

CommentSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = Comment;
