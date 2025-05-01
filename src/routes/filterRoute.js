const express = require('express');
const routes = express.Router();
const filterController = require('../controllers/filterController');

/**
 * @swagger
 * tags:
 *   name: Filter
 *   description: Filtered product retrieval
 */

/**
 * @swagger
 * /getFilteredProducts:
 *   get:
 *     summary: Get products based on filter criteria
 *     tags: [Filter]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *                 example: "Nike"
 *               color:
 *                 type: string
 *                 example: "Red"
 *               price:
 *                 type: number
 *                 example: 2999
 *               size:
 *                 type: string
 *                 example: "M"
 *               material:
 *                 type: string
 *                 example: "Cotton"
 *     responses:
 *       200:
 *         description: List of filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       name:
 *                         type: string
 *                         example: "T-Shirt"
 *                       brand:
 *                         type: string
 *                         example: "Nike"
 *                       price:
 *                         type: number
 *                         example: 2999
 *                       size:
 *                         type: string
 *                         example: "M"
 *                       material:
 *                         type: string
 *                         example: "Cotton"
 *                       color:
 *                         type: string
 *                         example: "Red"
 *       404:
 *         description: No products found with the given filters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No products found with the given filters."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Something Went Wrong !!"
 */
routes.get('/getFilteredProducts', filterController.getFilteredProducts);

module.exports = routes;