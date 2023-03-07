/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const {apiUpdateUserActivityAndBlogCountField} = require('../../../Controller/User/meController');





Router.post('/like/blog/:id',apiUpdateUserActivityAndBlogCountField("likeBlogs","like","increase"))
Router.delete('/like/blog/:id',apiUpdateUserActivityAndBlogCountField("likeBlogs","like","decrease"))



module.exports = Router;

