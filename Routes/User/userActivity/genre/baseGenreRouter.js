/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// Routes
const genreFollowRouter= require('./genreFollowRouter')
const ignoreGenreRouter= require('./ignoreGenreRouter')

// Controller
const genreController= require('../../../../Controller/genreController')







// Genre Follow
Router.use('/follow',genreFollowRouter)
Router.use('/ignore',ignoreGenreRouter)

Router.get('/recommed',genreController.apiRecommendGenre)

module.exports= Router;