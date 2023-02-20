/* eslint-disable camelcase */
const express = require('express');

const Router = express.Router();

// controller -----------------------
const userBlogController = require('../../Controller/User/userBlogController');


Router.route('/').post(userBlogController.apiCreateBlog)





// // bookmark blog
// Router.post('/:id/like/',userBlogController.apiBookmarkBlog)
// Router.delete('/:id/bookmark/false',userBlogController.apiUnBookmarkBlog)





module.exports = Router;
