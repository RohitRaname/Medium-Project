/* eslint-disable camelcase */
const mongoose = require('mongoose');

// group by user to limit data loaded when search by user
// 1000 -> 50

const HistorySchema = new mongoose.Schema({
  // user id
  userId: mongoose.Schema.Types.ObjectId,

  page: { type: Number, default: 0 },

  // this limit if for top level items => review,wishlists
  limit: { type: Number, default: 100 },

  history: [
    {
      authorId:String,
      _id: String,
      title: String,
      text: String,
      ts:{type:Date,default:new Date()},
      thumbnail:String
    },
  ],

  __v:{type:Number,select:false}

  // this will be fast to fill so no need it to be here
});

HistorySchema.index({ userId: 1, page: 1 });

HistorySchema.index({ userId: 1, 'history._id': 1 });

const History = mongoose.model('history', HistorySchema);

module.exports = History;
