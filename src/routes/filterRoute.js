const express = require('express');
const routes = express.Router();
const filterController = require('../controllers/filterController');

routes.get('/getFilteredProducts', filterController.getFilteredProducts);

module.exports = routes;