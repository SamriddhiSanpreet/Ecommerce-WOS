const express = require('express');
const routes = express.Router();
const cartController = require('../controllers/cartController');
const passport = require('passport');
const checkRole = require('../middlewares/checkRole');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management API
 */

/**
 * @swagger
 * /addCart:
 *   post:
 *     summary: Add a product to the user's cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               user_id:
 *                 type: integer
 *                 example: 123
 *     responses:
 *       201:
 *         description: Cart has been successfully created/updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 msg:
 *                   type: string
 *                   example: "Cart Has Been Created !!"
 *                 cart:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       example: 123
 *                     product_id:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     total:
 *                       type: integer
 *                       example: 1000
 *       403:
 *         description: Access denied or invalid user
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
 *                   example: "Only users are allowed !!"
 *       500:
 *         description: Internal server error
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
 *                   example: "Something went wrong in the add to cart"
 */
routes.post("/addCart",passport.authenticate('jwt', { session: false }),checkRole(["admin", "user"]),cartController.addCart);

/**
 * @swagger
 * /getCart:
 *   get:
 *     summary: Get all items in the user's cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successfully fetched cart items
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
 *                   example: "Cart Has Been Successfully Fetched !!"
 *                 cart:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       user_id:
 *                         type: integer
 *                         example: 123
 *                       product_id:
 *                         type: integer
 *                         example: 1
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                       total:
 *                         type: integer
 *                         example: 1000
 *       403:
 *         description: Access denied or invalid role
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
 *         description: Internal server error
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
 *                   example: "Something went wrong in the get cart"
 */
routes.get("/getCart",passport.authenticate('jwt', { session: false }),checkRole(["admin", "user"]),cartController.getCart);

/**
 * @swagger
 * /deleteCart/{id}:
 *   delete:
 *     summary: Delete an item from the user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cart item to delete
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
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
 *                   example: "Cart Has Been Successfully Deleted !!"
 *       403:
 *         description: Access denied or user mismatch
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
 *                   example: "You are not allowed to deleted this cart !!"
 *       500:
 *         description: Internal server error
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
 *                   example: "Something went wrong in the delete cart"
 */
routes.delete("/deleteCart/:id",passport.authenticate('jwt', { session: false }),checkRole(["admin", "user"]),cartController.deleteCart);

/**
 * @swagger
 * /getSpecificCart/{id}:
 *   get:
 *     summary: Fetch a specific cart item
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cart item to fetch
 *     responses:
 *       200:
 *         description: Specific cart item fetched successfully
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
 *                   example: "Specific Cart Has Been Successfully Fetched !!"
 *                 cartItem:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       example: 123
 *                     product_id:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     total:
 *                       type: integer
 *                       example: 1000
 *       403:
 *         description: Access denied or invalid user
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
 *                   example: "You are not allowed to view this cart !!"
 *       500:
 *         description: Internal server error
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
 *                   example: "Something went wrong in the get specific cart"
 */
routes.get('/getSpecificCart/:id',passport.authenticate('jwt', { session: false }),checkRole(["admin", "user"]),cartController.getSpecificCart);

/**
 * @swagger
 * /updateCart/{id}:
 *   put:
 *     summary: Update an item in the user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cart item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *               price:
 *                 type: integer
 *                 example: 500
 *               total:
 *                 type: integer
 *                 example: 1500
 *     responses:
 *       200:
 *         description: Cart item updated successfully
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
 *                   example: "Cart Has Been Successfully Updated !!"
 *                 cart:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       example: 123
 *                     product_id:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 3
 *                     total:
 *                       type: integer
 *                       example: 1500
 *       403:
 *         description: Access denied or user mismatch
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
 *                   example: "You are not allowed to update this cart !!"
 *       500:
 *         description: Internal server error
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
 *                   example: "Something went wrong in the update cart"
 */
routes.put("/updateCart/:id",passport.authenticate('jwt', { session: false }),checkRole(["admin", "user"]),cartController.updateCart);



module.exports = routes;