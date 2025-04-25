const express = require('express');
const routes = express.Router();
const registerController = require('../controllers/registrationController');
const {uploadImage} = require('../middlewares/profileUploads');
const passport = require('passport');
const checkRole = require('../middlewares/checkRole');

routes.post('/registerUser',uploadImage,registerController.registerUser );
routes.get('/getRegisteredUser',passport.authenticate('jwt',{session:false}),checkRole(['admin','seller','user']), registerController.getRegisteredUser);
routes.delete('/deleteRegisteredUser/:id',passport.authenticate('jwt',{session:false}),checkRole(['admin','seller','user']), registerController.deleteRegisteredUser);
routes.get('/getSingleRegisteredUser/:id',passport.authenticate('jwt',{session:false}),checkRole(['admin']), registerController.getSingleRegisteredUser);
routes.put('/updateRegisteredUser/:id',passport.authenticate('jwt',{session:false}),checkRole(['admin','seller','user']),uploadImage,registerController.updateRegisteredUser);

module.exports = routes;
