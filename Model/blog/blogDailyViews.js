/* eslint-disable camelcase */
const mongoose = require('mongoose');

// group by user to limit data loaded when search by user
// 1000 -> 50

const BlogDailyViewsSchema = new mongoose.Schema({
  userId:mongoose.Schema.Types.ObjectId,
  year:Number,

  summary: [
    {
      month: String,
      days: [{ day: Number, views: { type: Number, default: 0 } }],
    },
  ],

  
  __v:{type:Number,select:false}

  // this will be fast to fill so no need it to be here
});

const BlogDailyViews = mongoose.model('profileBlogDailyViews', BlogDailyViewsSchema);

module.exports = BlogDailyViews;
