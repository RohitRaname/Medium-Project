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
  timeToRead:{type:Number,default:1},
  active: { type: Boolean, default: false },
  ts: { type: Date, default: new Date() },

  count: {
    like: { type: Number, default: 0 },
    bookmark:{type:Number,default:0},
    comment: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },


  // property for user interaction by me during when blogs is shown in site 
  authorMuted:{type:Boolean,default:false}, // authorMutedByMe
  addedToReadingList:{type:Boolean,default:false} // authorMutedByMe
  

  // this will be fast to fill so no need it to be here
});
BlogSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;
