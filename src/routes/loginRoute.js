const express = require('express');
const routes = express.Router();
const loginController = require('../controllers/loginController');

routes.post('/login', loginController.login);

module.exports = routes;

