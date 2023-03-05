/* eslint-disable camelcase */
const mongoose = require('mongoose');

// group by user to limit data loaded when search by user
// 1000 -> 50

const GenreSchema = new mongoose.Schema({
  genre: String,

  count: {
    writers: { type: Number, default: 0 },
    blogs: { type: Number, default: 0 },
  },
  writerAvatar:[String],

  __v:{type:Number,select:false}
  // this will be fast to fill so no need it to be here
});

const Genre = mongoose.model('genre', GenreSchema);

module.exports = Genre;
