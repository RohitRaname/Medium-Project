const User = require('../../Model/user/userModel');
const AppError = require('../../utils/AppError');
const send = require('../../utils/sendJSON');
const catchAsync = require('../../utils/catchAsync');

exports.setNewPassword = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const user = req.user;

  user.password = password;
  await user.save();
  return send(res, 200);
});
