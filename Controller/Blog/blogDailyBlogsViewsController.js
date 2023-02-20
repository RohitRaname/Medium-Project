const mongoose = require('mongoose');

// Utils
const catchAsync = require('../../utils/catchAsync');
const tryCatch = require('../../utils/tryCatch');
const send = require('../../utils/sendJSON');

// Model
const BlogDailyViews = require('../../Model/blog/blogDailyViews');

// how to update the views when someone watches the profile
// it should be done at the end of day how to do this
// update when a user watched the user blogs update it in blodDailyViewsSummary

exports.getDaysInMonths = (month, year) => new Date(year, month, 0).getDate();

exports.createYearViewObj = tryCatch(async (userId, year) => {
  const summary = [];
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((monthNum) => {
    const monthObj = {};
    monthObj.month = monthNum;
    monthObj.days = [];

    for (
      let i = 1;
      i < this.getDaysInMonths(monthNum, new Date().getFullYear());
      i++
    ) {
      const dayObj = {};
      dayObj.day = i;

      dayObj.views = 0;
      console.log('dayObj', dayObj);
      monthObj.days.push(dayObj);
    }
    summary.push(monthObj);
  });
  await BlogDailyViews.create({ userId, summary, year });
});

exports.recordView = tryCatch(async (userId, year, month, day) => {
  await BlogDailyViews.findOneAndUpdate(
    {
      userId,
      year,
    },

    {
      $inc: {
        'summary.$[el].days.$[el2].views': 1,
      },
    },

    {
      arrayFilters: [
        {
          'el.month': { $eq: month },
        },
        {
          'el2.day': { $eq: day },
        },
      ],
    }
  );
});

// this will be called whenever someone reads my blog
exports.recordProfileBlogsView = tryCatch(async (userId, year, month, day) => {
  const recordView = this.recordView(userId, year, month, day);

  if (!recordView) {
    await this.createYearViewObj(userId, year);
    await this.recordView(userId, year, month, day);
  }
});

exports.getMonthView = tryCatch(async (userId, year, month) => {
  const views = await BlogDailyViews.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        year,
      },
    },

    {
      $project: {
        days: {
          $getField: {
            input: {
              $first: {
                $filter: {
                  input: '$summary',
                  as: 'summary',
                  cond: {
                    $eq: ['$$summary.month', month],
                  },
                },
              },
            },
            field:"days"
          },
        },
      },
    },

    {
      $project: {
        views: {
          $reduce: {
            input: '$days',
            initialValue: 0,
            in: {
              $sum: ['$$value', '$$this.views'],
            },
          },
        },
      },
    },
  ]);

  return views;
});

exports.apiRecordProfileBlogsView = catchAsync(async (req, res) => {
  await this.recordProfileBlogsView(
    req.user._id,
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );
  send(res, 200, 'view record');
});
exports.apiMonthlyViews = catchAsync(async (req, res) => {
  const views = await this.getMonthView(req.user._id, 2023, 2);
  send(res, 200, 'view record', views);
});
