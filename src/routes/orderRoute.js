const express = require('express');
const routes = express.Router();
const orderController = require('../controllers/orderController');
const passport = require('passport');
const checkRole = require('../middlewares/checkRole');

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management API
 */

/**
 * @swagger
 * /createOrder:
 *   post:
 *     summary: Place an order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 123
 *               cartIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *               paymentMethod:
 *                 type: string
 *                 example: "credit_card"
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order placed successfully"
 *                 orderId:
 *                   type: integer
 *                   example: 1001
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "userId, cartIds, and paymentMethod are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to place order"
 */
routes.post('/createOrder',passport.authenticate('jwt', { session: false }),orderController.createOrder);


/**
 * @swagger
 * /getOrders:
 *   get:
 *     summary: Get all orders of the user  
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Successfully fetched orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Orders has been successfully fetched!"
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1001
 *                       userId:
 *                         type: integer
 *                         example: 123
 *                       totalPrice:
 *                         type: integer
 *                         example: 5000
 *                       paymentMethod:
 *                         type: string
 *                         example: "credit_card"
 *       404:
 *         description: No orders found or access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Sellers are not allowed !!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Something went wrong!"
 */
routes.get('/getOrders',passport.authenticate('jwt', { session: false }),orderController.getOrders);

/**
 * @swagger
 * /deleteOrder/{id}:
 *   delete:
 *     summary: Delete an order 
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Order Has Been Successfully Deleted !!"
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1001
 *       403:
 *         description: Forbidden, only admin can delete orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Only Admin Can Delete This Order !!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Something Went Wrong !!"
 */
routes.delete('/deleteOrder/:id',passport.authenticate('jwt', { session: false }),checkRole(["admin"]),orderController.deleteOrder);

/**
 * @swagger
 * /getSpecificOrder/{id}:
 *   get:
 *     summary: Fetch a specific order 
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order to fetch
 *     responses:
 *       200:
 *         description: Specific order fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Specific Order Has Been Successfully Fetched !!"
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1001
 *                     userId:
 *                       type: integer
 *                       example: 123
 *                     totalPrice:
 *                       type: integer
 *                       example: 5000
 *                     paymentMethod:
 *                       type: string
 *                       example: "credit_card"
 *       403:
 *         description: Access denied, not authorized to view the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "You are not allowed to view this order !!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Something Went Wrong !"
 */
routes.get('/getSpecificOrder/:id',passport.authenticate('jwt', { session: false }),checkRole(["admin","user"]),orderController.getSpecificOrder);

/**
 * @swagger
 * /updateOrder/{id}:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "shipped"
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Order Has Been Successfully Updated !!"
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1001
 *                     status:
 *                       type: string
 *                       example: "shipped"
 *       400:
 *         description: Invalid status provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Invalid Status !!"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Order Not Found !!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Something Went Wrong !!"
 */
routes.put('/updateOrder/:id',passport.authenticate('jwt', { session: false }),checkRole(["admin","user"]),orderController.updateOrder);

module.exports = routes;