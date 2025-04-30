const express = require('express');
const routes = express.Router();
const roleController = require('../controllers/roleController');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management API
 */

/**
 * @swagger
 * /createRole:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Role name (e.g., Admin, User, Seller)
 *                 example: Admin
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Invalid input
 */
routes.post('/createRole', roleController.createRole);
/**
 * @swagger
 * /getRole:
 *   get:
 *     summary: Fetch all roles from the database
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Successfully fetched roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Roles have been successfully fetched!
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Admin
 *                       slug:
 *                         type: string
 *                         example: admin
 *       500:
 *         description: Internal Server Error
 */

routes.get('/getRole', roleController.getRole);
routes.delete('/deleteRole/:id', roleController.deleteRole);
routes.get('/getSingleRole/:id', roleController.getSingleRole);
routes.put('/updateRole/:id', roleController.updateRole);

module.exports = routes;
