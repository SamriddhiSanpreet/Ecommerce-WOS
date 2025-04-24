const express = require('express');
const routes = express.Router();
const roleController = require('../controllers/roleController');

routes.post('/createRole', roleController.createRole);
routes.get('/getRole', roleController.getRole);
routes.delete('/deleteRole/:id', roleController.deleteRole);
routes.get('/getSingleRole/:id', roleController.getSingleRole);
routes.put('/updateRole/:id', roleController.updateRole);
module.exports = routes;