const express = require('express');
const routes = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const passport = require('passport');
const checkRole = require('../middlewares/checkRole');


/**
 * @swagger
 * tags:
 *   name: Subcategories
 *   description: Subcategory management API
 */

/**
 * @swagger
 * /createSubcategory:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [Subcategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Smartphones"
 *     responses:
 *       200:
 *         description: Subcategory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: "Subcategory Has Been Successfully Created !!"
 *                 subcategory:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     categoryId:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Smartphones"
 *                     slug:
 *                       type: string
 *                       example: "smartphones"
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 msg:
 *                   type: string
 *                   example: "Access denied"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 msg:
 *                   type: string
 *                   example: "Something Went Wrong !!"
 */
routes.post('/createSubcategory',passport.authenticate('jwt', { session: false }), checkRole(['admin']),subcategoryController.createSubcategory);

/**
 * @swagger
 * /getSubcategories:
 *   get:
 *     summary: Fetch all subcategories
 *     tags: [Subcategories]
 *     responses:
 *       200:
 *         description: Successfully fetched subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: "Subcategories Has Been Successfully Fetched !!"
 *                 subcategories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       categoryId:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Smartphones"
 *                       slug:
 *                         type: string
 *                         example: "smartphones"
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 msg:
 *                   type: string
 *                   example: "Access denied"
 *       500:
 *         description: Internal Server Error during fetching
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 msg:
 *                   type: string
 *                   example: "Something Went Wrong during fetching the subcategories !!"
 */
routes.get('/getSubcategories',passport.authenticate('jwt', { session: false }), checkRole(['admin']),subcategoryController.getSubcategories);

/**
 * @swagger
 * /deleteSubcategory/{id}:
 *   delete:
 *     summary: Delete a subcategory by ID
 *     tags: [Subcategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the subcategory to delete
 *     responses:
 *       200:
 *         description: Subcategory has been successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: "Subcategory Has Been Successfully Deleted !!"
 *                 subcategory:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     categoryId:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Smartphones"
 *                     slug:
 *                       type: string
 *                       example: "smartphones"
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 msg:
 *                   type: string
 *                   example: "Access denied"
 *       500:
 *         description: Internal Server Error or Subcategory not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 msg:
 *                   type: string
 *                   example: "Something Went Wrong during deleting the subcategory Or subcategory not found!!"
 */
routes.delete('/deleteSubcategory/:id',passport.authenticate('jwt', { session: false }), checkRole(['admin']),subcategoryController.deleteSubcategory);

/**
 * @swagger
 * /getSingleSubcategory/{id}:
 *   get:
 *     summary: Fetch a single subcategory by ID
 *     tags: [Subcategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the subcategory to fetch
 *     responses:
 *       200:
 *         description: Specific subcategory fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: "Specific Subcategory Has Been Successfully Fetched !!"
 *                 subcategory:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     categoryId:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Smartphones"
 *                     slug:
 *                       type: string
 *                       example: "smartphones"
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 msg:
 *                   type: string
 *                   example: "Access denied"
 *       500:
 *         description: Internal Server Error or Subcategory not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 msg:
 *                   type: string
 *                   example: "Something Went Wrong during fetching the specific subcategory !!"
 */
routes.get('/getSingleSubcategory/:id',passport.authenticate('jwt', { session: false }), checkRole(['admin']),subcategoryController.getSingleSubcategory);

/**
 * @swagger
 * /updateSubcategory/{id}:
 *   put:
 *     summary: Update a subcategory by ID
 *     tags: [Subcategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the subcategory to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Smartphones"
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Subcategory has been successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: "Subcategory Has Been Successfully Updated !!"
 *                 subcategory:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     categoryId:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Updated Smartphones"
 *                     slug:
 *                       type: string
 *                       example: "updated-smartphones"
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 msg:
 *                   type: string
 *                   example: "Access denied"
 *       400:
 *         description: Bad Request - name and categoryId are required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 msg:
 *                   type: string
 *                   example: "name and categoryId are required for updation !!"
 *       500:
 *         description: Internal Server Error or Subcategory not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 msg:
 *                   type: string
 *                   example: "Something Went Wrong during updating the subcategory !!"
 */
routes.put('/updateSubcategory/:id',passport.authenticate('jwt', { session: false }), checkRole(['admin']),subcategoryController.updateSubcategory);

module.exports = routes;