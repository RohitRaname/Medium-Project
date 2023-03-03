const Router = require('express').Router();

// controller
const {
  isLoggedIn,
  sendJwtIfNeeded,
} = require('../../Controller/jwtController');
const homeViewController = require('../../Controller/view/homeViewController');

Router.use('/img*', (req, res) => res.status(400).send('img not found'));
Router.use('/api*', (req, res) => res.send('api not found'));

Router.get(
  '/',
  isLoggedIn,
  sendJwtIfNeeded(true),
  homeViewController.renderHomePage
);

module.exports = Router;
