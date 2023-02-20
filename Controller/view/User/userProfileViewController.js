const mongoose = require('mongoose');

const catchAsync = require('../../../utils/catchAsync');
const User = require('../../../Model/user/userModel');
const Product = require('../../../Model/Product/product_model');
const followingController = require('../../User/followController');

exports.renderUserProfile = catchAsync(async (req, res) => {
  let meFollowProfileUser = false;
  const otherUser = await User.findOne({ _id: req.params.id==="me"?req.user._id:req.params.id })
    .populate({
      path: 'reviews.item',
      select: ['title', 'assets.thumbnail', 'rating.count', 'rating.value'],
    })
    .select(['profile', 'following', 'reviews', 'count', 'name', 'address'])
    .exec();

  otherUser.profile.address =
    otherUser.address.find((el) => el.setAsDefaultAddress) &&
    otherUser.address.find((el) => el.setAsDefaultAddress).country;

  otherUser.profile.name = otherUser.name;

  // non login user
  if (req.user) {
    meFollowProfileUser = await followingController.meFollowGivenUser(
      req.user._id,
      otherUser._id
    );
  } 
 
 return res.render('pages/user/userProfile', {
    page: req.params.id==="me"?"my-profile": 'other-user-profile',
    otherUser,
    userData: req.restrictUserData,
    meFollowProfileUser,
  });
});

 