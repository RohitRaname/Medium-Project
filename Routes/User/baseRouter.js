/* eslint-disable camelcase */
const express = require('express');

const meRouter = require('./meRouter');
const otherUserRouter = require('./otherUserRouter');
const blogRouter = require('./blogRouter');

// these req can be made by any user(search blogs and users)
const searchRouter= require('./searchRouter')

const Router = express.Router();

// Controller -----------------------
const { protect, sendJwtIfNeeded } = require('../../Controller/jwtController');
const {
  setRestrictUserDataInReq,
} = require('../../Controller/User/userController');

// Router.use('/', (req, res, next) => {
//   req.user = {
//     _id: '63ad447c3b31d43ac562d5d2',
//     currency: {
//       symbol: '₹',
//       code: 'INR',
//       rate: 81.6505,
//     },
//   };

//   next();
// });

// non login user can make these req 

Router.use('/',searchRouter)

// for other used id not me 
Router.use('/other/:id', otherUserRouter);

Router.use(protect, sendJwtIfNeeded(true), setRestrictUserDataInReq);

Router.use('/me/blogs', blogRouter);

// user doc update
Router.use('/me', meRouter);

module.exports = Router;
