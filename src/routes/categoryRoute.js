const express = require('express');
const routes = express.Router();
const categoryController = require('../controllers/categoryController');
const passport = require('passport');
const checkRole = require('../middlewares/checkRole');

routes.post('/createCategory', passport.authenticate('jwt', { session: false }), checkRole(['admin']) ,categoryController.createCategory);
routes.get('/getCategory', passport.authenticate('jwt', { session: false }), checkRole(['admin']) ,categoryController.getCategory);
routes.delete('/deleteCategory/:id', passport.authenticate('jwt', { session: false }), checkRole(['admin']) ,categoryController.deleteCategory);
routes.get('/getSingleCategory/:id', passport.authenticate('jwt', { session: false }), checkRole(['admin']) ,categoryController.getSingleCategory);
routes.put('/updateCategory/:id', passport.authenticate('jwt', { session: false }), checkRole(['admin']) ,categoryController.updateCategory);

module.exports = routes;