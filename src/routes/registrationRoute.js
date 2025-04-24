const express = require('express');
const routes = express.Router();
const registerController = require('../controllers/registrationController');
const {uploadImage} = require('../middlewares/profileUploads');

routes.post('/registerUser',uploadImage,registerController.registerUser );
routes.get('/getRegisteredUser', registerController.getRegisteredUser);
routes.delete('/deleteRegisteredUser/:id', registerController.deleteRegisteredUser);
routes.get('/getSingleRegisteredUser/:id', registerController.getSingleRegisteredUser);
routes.put('/updateRegisteredUser/:id',uploadImage,registerController.updateRegisteredUser);

module.exports = routes;
