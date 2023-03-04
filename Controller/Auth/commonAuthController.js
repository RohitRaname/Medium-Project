/* eslint-disable camelcase */
const User = require('../../Model/user/userModel');

const AppError = require('../../utils/AppError');
const send = require('../../utils/sendJSON');
const sendEmail = require('../../utils/email');
const { generateHash } = require('../../utils/crypto');
const catchAsync = require('../../utils/catchAsync');

exports.restricTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError('Permission denied'));

    next();
  };

exports.logoutFunc = (res) => {
  res.clearCookie('refreshJwt', { httpOnly: true });
  res.clearCookie('jwt', { httpOnly: true });
};

exports.logout = (req, res, next) => {
  res.clearCookie('refreshJwt', { httpOnly: true });
  res.clearCookie('jwt', { httpOnly: true });

  req.user = undefined;
  return send(res, 200);
};

exports.accountWithEmailExist = (pass) =>
  catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user)
      return next(
        new AppError(
          { title: 'Email not exist', text: 'User with email does not exist' },
          400
        )
      );

    req.user = user;
    if (pass) return next();
    return send(res, 200, 'email exist');
  });

exports.accountPasswordValid = (pass) =>
  catchAsync(async (req, res, next) => {
    const { email, password, keepMeSignedIn } = req.body;
    const user = await User.findOne({ email }, { password: 1 }).exec();

    if (!user) return next(new AppError('User with email not exist', 400));

    if (!(await user.isValidPassword(password, user.password)))
      return next(
        new AppError(
          {
            title: 'Password is incorrect',
            text: 'Account password is not matching',
          },
          400
        )
      );

    if (keepMeSignedIn) {
      user.keepMeSignedIn = keepMeSignedIn;
      user.save();
    }

    if (pass) {
      req.user = user;
      return next();
    }
    return send(res, 200, 'email exist');
  });

// need token
exports.verifyOTPToken = (pass) =>
  catchAsync(async (req, res, next) => {
    const {  token } = req.query;
    console.log('token',token)
    const tokenHash = generateHash(token);

    const user = await User.findOne({
      tokenHash,
    }).exec();

    if (!user)
      return next(
        new AppError(
          { title: 'Invalid Token', text: 'Please enter valid token' },
          400
        )
      );
    if (user && new Date() > new Date(user.tokenExpiresIn))
      return next(
        new AppError(
          { title: 'Token Expired', text: 'Reapply for new Token' },
          400
        )
      );
    user.removeTokenProperties();
    await user.save();

    req.user = user;

    if (pass) return next();
    return send(res, 200);
  });

// need req.user
exports.sendOTPToken = (email_type, redirect_link_path) => async (req, res) => {
  const { user } = req;

  try {
    let verificationToken = '';

    verificationToken = req.user.setTokenPropertiesAndgetTokenCode();

    await user.save();
    await sendEmail(
      req,
      user,
      email_type,
      `${redirect_link_path}`,
      verificationToken
    );
  } catch (err) {
    console.log(err);
    // if error comes during sending of email
    // remove user token set propeties as there are no longer userful

    user.removeTokenProperties();

    // then save the user
    await user.save();
    return send(res, err.statusCode, err.status, err.message);
  }

  return send(res, 200, 'Check verification code at mailtrap');
};

// send token to user email (need user email)
exports.setUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    email: req.params.email || req.body.email,
  }).exec();
  if (!user)
    return next(
      new AppError(
        {
          title: 'Email not exist',
          text: 'Account with email not exist',
        },
        400
      )
    );
  req.user = user;
  next();
});

// ADMIN ==================================================

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError('field missing', 400));

  const user = await User.findOne({ email }, { password: 1 }).exec();
  if (!user) return next(new AppError('user does not exist', 400));

  if (!(await user.isValidPassword(password, user.password)))
    return next(new AppError('password not matched', 400));

  req.user = user;
  next();
});

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = { name, email, password, emailVerify: false };
  user = await User.create(user);

  req.user = user;
  next();
});
exports.adminSignup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = { name, email, password, emailVerify: true };
  user = await User.create(user);

  req.user = user;
  next();
});
