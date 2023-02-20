const Router = require('express').Router();

// controller
const genreController = require('../Controller/genreController');


Router.route('/').get(genreController.apiGetAllGenre);

module.exports = Router;
