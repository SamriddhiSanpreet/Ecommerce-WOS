const express = require('express');
const routes = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

routes.post('/createSubcategory',subcategoryController.createSubcategory);
routes.get('/getSubcategories',subcategoryController.getSubcategories);
routes.delete('/deleteSubcategory/:id',subcategoryController.deleteSubcategory);
routes.get('/getSingleSubcategory/:id',subcategoryController.getSingleSubcategory);
routes.put('/updateSubcategory/:id',subcategoryController.updateSubcategory);

module.exports = routes;