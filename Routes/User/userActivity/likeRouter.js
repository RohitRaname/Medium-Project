/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const meController = require('../../../Controller/User/meController');


// bookmark blog
Router.post('/bookmark/blog/:id',meController.apiUpdateUserActivityAndBlogCountField("bookmarkBlogs","bookmark","increase"))
Router.delete('/unbookmark/blog/:id',meController.apiUpdateUserActivityAndBlogCountField("bookmarkBlogs","bookmark","decrease"))

// 
Router.post('/like/blog/:id',meController.apiUpdateUserActivityAndBlogCountField("likeBlogs","like","increase"))
Router.delete('/unlike/blog/:id',meController.apiUpdateUserActivityAndBlogCountField("likeBlogs","like","decrease"))



module.exports = Router;

