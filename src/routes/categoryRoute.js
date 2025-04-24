const express = require('express');
const routes = express.Router();
const categoryController = require('../controllers/categoryController');

routes.post('/createCategory', categoryController.createCategory);
routes.get('/getCategory', categoryController.getCategory);
routes.delete('/deleteCategory/:id', categoryController.deleteCategory);
routes.get('/getSingleCategory/:id', categoryController.getSingleCategory);
routes.put('/updateCategory/:id', categoryController.updateCategory);

module.exports = routes;