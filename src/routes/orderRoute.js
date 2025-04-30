const express = require('express');
const routes = express.Router();
const orderController = require('../controllers/orderController');
const passport = require('passport');
const checkRole = require('../middlewares/checkRole');

routes.post('/createOrder',passport.authenticate('jwt', { session: false }),orderController.createOrder);
routes.get('/getOrders',passport.authenticate('jwt', { session: false }),orderController.getOrders);
routes.delete('/deleteOrder/:id',passport.authenticate('jwt', { session: false }),checkRole(["admin"]),orderController.deleteOrder);
routes.get('/getSpecificOrder/:id',passport.authenticate('jwt', { session: false }),checkRole(["admin","user"]),orderController.getSpecificOrder);
routes.put('/updateOrder/:id',passport.authenticate('jwt', { session: false }),checkRole(["admin","user"]),orderController.updateOrder);

module.exports = routes;