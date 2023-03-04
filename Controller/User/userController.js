/* eslint-disable camelcase */
const sharp = require('sharp');
const catchAsync = require('../../utils/catchAsync');
const send = require('../../utils/sendJSON');
const Factory = require('../handleFactoryController');
const User = require('../../Model/user/userModel');
const tryCatch = require('../../utils/tryCatch');
const {
  formatQueryIntoPipeline,
} = require('../../utils/mongodbQueryConverter');
const readingListController= require('../User/readingListController')

exports.setRestrictUserDataInReq = (req, res, next) => {
  if (!req.user) return next();
  const { user } = req;
  req.restrictUser = {
      _id: user._id,
      name: user.name,
      ...user.profile,
  };

  next();
};

// new user have some fields that are provided by site(one reading list already created) 
exports.setMustDataForNewUser= catchAsync(async(req,res,next)=>{
  const userId= req.user._id;

  // create one mandatory reading list
  await readingListController.createReadingList(userId,"readingList");

  next()



})

// only return profile info format document
exports.formatUser = (user) => {
  const { profile, _id, name } = user;

  return { _id, name, ...profile };
};

exports.formatUsers = (users) => users.map((user) => this.formatUser(user));

exports.updateMe = catchAsync(async (req, res, next) => {
  const nonAcceptableFields = ['email', 'password'];

  nonAcceptableFields.forEach((field) => {
    if (req.body[field]) delete req.body[field];
  });

  await User.updateOne({ _id: req.user._id }, { $set: req.body }).exec();
  return send(res, 200, 'user-updated');
});

exports.updateUser = tryCatch(
  async (userId, updateBody) =>
    await Factory.updateOneFunc(User, userId, updateBody)
);

exports.findUser = tryCatch(
  async (userId, selectFields) =>
    await Factory.getOneFunc(User, userId, selectFields)
);
exports.findUsers = tryCatch(
  async (query) => await Factory.getAllFunc(User, query)
);

const save_img = tryCatch(async (file, dimension, filename) => {
  await sharp(file.buffer)
    .resize(...dimension)
    .toFormat('png')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${filename}`);
});

// ques has answer property in it
exports.resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  const img_promise = [];

  const { cover_pic, pic } = req.files;

  if (cover_pic) {
    const filename = `user-${req.user.id}-${Date.now()}.png`;
    req.body['profile.coverPic'] = filename;

    img_promise.push(save_img(cover_pic[0], [1200, 1080], filename));
  }
  if (pic) {
    const filename = `user-${req.user.id}-${Date.now()}.png`;
    req.body['profile.pic'] = filename;

    img_promise.push(save_img(pic[0], [600, 600], filename));
  }

  if (img_promise.length > 0) await Promise.all(img_promise);

  // req.body.pic = filename;

  next();
};


// recentGenreFollow,readingLists
exports.addItemToUserArrField = tryCatch(async(userId, arrField,item)=>{
  await User.findOneAndUpdate({_id:userId},{$push:{[arrField]:item}}).exec()
})
exports.removeItemFromUserArrField = tryCatch(async(userId, arrField,itemId)=>{
  await User.findOneAndUpdate({_id:userId},{$pull:{[arrField]:{_id:itemId}}}).exec()
})
exports.removeItemsFromUserArrField = tryCatch(async(userId, arrField,itemIds)=>{
  await User.findOneAndUpdate({_id:userId},{$pullAll:{[arrField]:{_id:{$in:itemIds}}}}).exec()
})

exports.setUserIdAsParams = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.searchUsers = tryCatch(async (q, query) => {
  const pipeline = [
    {
      $search: {
        compound: {
          should: [
            {
              autocomplete: {
                path: 'name',
                query: q,
                score: { boost: { value: 2 } },
                fuzzy: {
                  prefixLength: 1,
                },
              },
            },
            {
              text: {
                path: 'name',
                query: q,
              },
            },
          ],
          minimumShouldMatch: 1,
        },

        returnStoredSource: true,
      },
    },

    ...formatQueryIntoPipeline(query, [], ['match']),

    // {$project:{title:"$content.title"}}
  ];
  return await User.aggregate(pipeline);
});

exports.apiSearchUsers = catchAsync(async (req, res) => {
  const users = await this.searchUsers(req.query.q, req.query);
  return send(res, 200, 'search users', {docs:users});
});
///////////////////////////////////////////////
// AddressController
///////////////////////////////////////////////

exports.apiGetUser = Factory.getOne(User);
exports.apiGetUsers = Factory.getAll(User);
exports.apiUpdateUser = Factory.updateOne(User);
exports.apiDeleteUser = Factory.deleteOne(User);
exports.apiCreateUser = Factory.createOne(User);
