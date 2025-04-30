const express = require('express');
const routes = express.Router();
const cartController = require('../controllers/cartController');
const passport = require('passport');
const checkRole = require('../middlewares/checkRole');

routes.post("/addCart",passport.authenticate('jwt', { session: false }),checkRole(["admin", "user"]),cartController.addCart);
routes.get("/getCart",passport.authenticate('jwt', { session: false }),checkRole(["admin", "user"]),cartController.getCart);
routes.delete("/deleteCart/:id",passport.authenticate('jwt', { session: false }),checkRole(["admin", "user"]),cartController.deleteCart);
routes.get('/getSpecificCart/:id',passport.authenticate('jwt', { session: false }),checkRole(["admin", "user"]),cartController.getSpecificCart);
routes.put("/updateCart/:id",passport.authenticate('jwt', { session: false }),checkRole(["admin", "user"]),cartController.updateCart);



module.exports = routes;