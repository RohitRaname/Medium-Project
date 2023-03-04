const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// contains all user imformation
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 1,
      required: [true, 'Please enter the name'],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,

      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
      minLength: 6,
    },

    active: {
      type: Boolean,
      default: true,
    },

    emailVerify: {
      default: false,
      type: Boolean,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: 'Role is required',
      },
      trim: true,
      default: 'user',
    },

    passwordChangedAt: Date,
    tokenHash: String,
    tokenExpiresIn: Date,

    invalidRefreshTokenTries: {
      default: 0,
      type: Number,
    },

    blackList: {
      type: Boolean,
      default: false,
    },

    profile: {
      fullName: String,
      avatar: { type: String, default: 'default.png' },
      bio: { type: String },
      birth: Date,
      coverPic: { type: String, default: 'defaultCover.png' },
    },

    recentGenreBlogsWrite: [String],
    recentGenreFollow: [String],
    recentGenreIgnore: [String],

    keepMeSignedIn: { type: Boolean, default: false },

    recentBlogs: [
      {
        genre: String,
        access: String,
        content: {
          title: String,
          text: String,
          thumbnail: String,
          photos: [String],
        },

        ts: { type: Date, default: new Date() },
      },
    ],

    readingLists: [{ _id: mongoose.Types.ObjectId, name: String }],

    count: {
      following: { type: Number, default: 0 },
      followers: { type: Number, default: 0 },
    },
  },
  {
    toObject: { virtual: true },
    toJSON: { virtual: true },
    timestamps: true,
  }
);

// INDEX ****************************************************************
UserSchema.index({ email: 1, name: 1 }, { unique: true });

// VIRTUAL PROPERTY ****************************************************
// UserSchema.virtual('joined').get(function () {

// });

// METHODS ****************************************************************

// compare password after login and check for password changed at
UserSchema.methods.isValidPassword = async function (
  inputPassword,
  passwordDB
) {
  return await bcrypt.compare(inputPassword, passwordDB);
};

UserSchema.methods.removeUserCredentialfromReq = function () {
  this.password = undefined;
  this.active = undefined;
  // this.confirmPassword = undefined;
};

// handle token send for tpassword
UserSchema.methods.setTokenPropertiesAndgetTokenCode = function () {
  const token = crypto.randomBytes(6).toString('hex');
  this.tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  this.tokenExpiresIn = new Date(Date.now() + 10 * 60 * 1000);

  return token;
};

UserSchema.methods.removeTokenProperties = function () {
  this.tokenHash = undefined;
  this.tokenExpiresIn = undefined;
};

UserSchema.methods.compareToken = function (tokenDB, token) {
  const tokenHash = crypto
    .createHash('sha256')
    .update(token)
    .update(token)
    .digest('hex');
  return tokenHash === tokenDB;
};

// PRE MIDDLEWARE ****************************************************************

// hash password  before saving
UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  if (!this.isNew && this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 8);
    this.passwordChangedAt = Date.now() - 1000;
  }

  next();
});

// this filter the data before any find query
UserSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// UserSchema.pre('aggregate', function (next) {
//   this.pipeline.unshift({ $match: { active: true } });

//   next();
// });

const User = mongoose.model('user', UserSchema);

module.exports = User;
