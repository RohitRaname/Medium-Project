/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();
const genreFollowRouter= require('./genreFollowRouter')
const ignoreGenreRouter= require('./ignoreGenreRouter')




// Genre Follow
Router.use('/follow',genreFollowRouter)
Router.use('/ignore',ignoreGenreRouter)

module.exports= Router;