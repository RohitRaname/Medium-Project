const catchAsync = require('../../utils/catchAsync');
const { logoutFunc } = require('../../Controller/Auth/commonAuthController');

exports.logout = catchAsync(async (req, res) => {
  logoutFunc(res);

  return res.redirect('/home');
});
