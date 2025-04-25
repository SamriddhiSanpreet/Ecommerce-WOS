const express = require('express');
const routes = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const passport = require('passport');
const checkRole = require('../middlewares/checkRole');

routes.post('/createSubcategory',passport.authenticate('jwt', { session: false }), checkRole(['admin']),subcategoryController.createSubcategory);
routes.get('/getSubcategories',passport.authenticate('jwt', { session: false }), checkRole(['admin']),subcategoryController.getSubcategories);
routes.delete('/deleteSubcategory/:id',passport.authenticate('jwt', { session: false }), checkRole(['admin']),subcategoryController.deleteSubcategory);
routes.get('/getSingleSubcategory/:id',passport.authenticate('jwt', { session: false }), checkRole(['admin']),subcategoryController.getSingleSubcategory);
routes.put('/updateSubcategory/:id',passport.authenticate('jwt', { session: false }), checkRole(['admin']),subcategoryController.updateSubcategory);

module.exports = routes;