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
 *     summary: Fetch all roles 
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

/**
 * @swagger
 * /deleteRole/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the role to delete
 *     responses:
 *       200:
 *         description: Role has been successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Role Has Been Successfully Deleted !!
 *                 getRoles:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 3
 *                     name:
 *                       type: string
 *                       example: Seller
 *                     slug:
 *                       type: string
 *                       example: seller
 *       500:
 *         description: Role not found or internal error
 */
routes.delete('/deleteRole/:id', roleController.deleteRole);

/**
 * @swagger
 * /getSingleRole/{id}:
 *   get:
 *     summary: Fetch a specific role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the role to fetch
 *     responses:
 *       200:
 *         description: Specific Role has been successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Specific Role Has Been Successfully Fetched !!
 *                 getSpecificRole:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     name:
 *                       type: string
 *                       example: User
 *                     slug:
 *                       type: string
 *                       example: user
 *       500:
 *         description: Role not found or internal error
 */

routes.get('/getSingleRole/:id', roleController.getSingleRole);

/**
 * @swagger
 * /updateRole/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the role to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Manager
 *     responses:
 *       200:
 *         description: Role has been successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Role Has Been Successfully Updated !!
 *                 role:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 4
 *                     name:
 *                       type: string
 *                       example: Manager
 *                     slug:
 *                       type: string
 *                       example: manager
 *       400:
 *         description: Bad Request - name is required
 *       500:
 *         description: Internal Server Error or Role not found
 */

routes.put('/updateRole/:id', roleController.updateRole);

module.exports = routes;
