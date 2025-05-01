const express = require("express");
const routes = express.Router();
const productController = require("../controllers/productController");
const { uploadProductImage } = require("../middlewares/profileUploads");
const passport = require("passport");
const checkRole = require("../middlewares/checkRole");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /createProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *                 example: "Premium Leather Wallet"
 *               price:
 *                 type: number
 *                 example: 45.99
 *               description:
 *                 type: string
 *                 example: "A high-quality leather wallet with RFID protection"
 *               stock:
 *                 type: integer
 *                 example: 100
 *               sellerId:
 *                 type: string
 *                 example: "seller123"
 *               categoryId:
 *                 type: string
 *                 example: "electronics"
 *               subcategoryId:
 *                 type: string
 *                 example: "wallets"
 *               brand:
 *                 type: string
 *                 example: "LeatherCraft"
 *               color:
 *                 type: string
 *                 example: "Brown"
 *               size:
 *                 type: string
 *                 example: "Medium"
 *               material:
 *                 type: string
 *                 example: "Genuine Leather"
 *               image:
 *                 type: string
 *                 example: "https://example.com/images/wallet.jpg"
 *     responses:
 *       200:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Product created successfully"
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Premium Leather Wallet"
 *                     price:
 *                       type: number
 *                       example: 45.99
 *                     description:
 *                       type: string
 *                       example: "A high-quality leather wallet with RFID protection"
 *                     stock:
 *                       type: integer
 *                       example: 100
 *                     sellerId:
 *                       type: string
 *                       example: "seller123"
 *                     categoryId:
 *                       type: string
 *                       example: "electronics"
 *                     subcategoryId:
 *                       type: string
 *                       example: "wallets"
 *                     brand:
 *                       type: string
 *                       example: "LeatherCraft"
 *                     color:
 *                       type: string
 *                       example: "Brown"
 *                     size:
 *                       type: string
 *                       example: "Medium"
 *                     material:
 *                       type: string
 *                       example: "Genuine Leather"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/images/wallet.jpg"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Invalid input, please check your data!"
 */

routes.post(
  "/createProduct",
  passport.authenticate("jwt", { session: false }),
  checkRole(["admin", "seller"]),
  uploadProductImage,
  productController.createProduct
);

/**
 * @swagger
 * /getProducts:
 *   get:
 *     summary: Get all products based on user role
 *     description: 
 *       Admin gets all products. Seller gets their own products. User sees products from all sellers.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: "Products Has Been Successfully Fetched !!"
 *               products:
 *                 - id: "a1b2c3d4-e89b-12d3-a456-426614174000"
 *                   name: "Oxford Leather Briefcase"
 *                   slug: "oxford-leather-briefcase"
 *                   description: "Classic British style leather briefcase for professionals."
 *                   price: 129.99
 *                   stock: 50
 *                   sellerId: "321e4567-e89b-12d3-a456-426614174001"
 *                   categoryId: "654e4567-e89b-12d3-a456-426614174002"
 *                   subcategoryId: "987e4567-e89b-12d3-a456-426614174003"
 *                   brand: "Cambridge & Co."
 *                   color: "Black"
 *                   size: "Large"
 *                   material: "Full-Grain Leather"
 *                   image: "oxford-briefcase.jpg"
 *                   createdAt: "2025-05-01T12:00:00.000Z"
 *                   updatedAt: "2025-05-01T12:00:00.000Z"
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             example:
 *               msg: "Access denied"
 *       500:
 *         description: Server error during fetching
 *         content:
 *           application/json:
 *             example:
 *               msg: "Something Went Wrong during fetching the products !!"
 */

routes.get(
  "/getProducts",
  passport.authenticate("jwt", { session: false }),
  productController.getProducts
);

/**
 * @swagger
 * /deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: 
 *       Admin can delete any product. Sellers can delete their own products only.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the product to be deleted
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: "Product Has Been Successfully Deleted !!"
 *               product:
 *                 id: "a1b2c3d4-e89b-12d3-a456-426614174000"
 *                 name: "Oxford Leather Briefcase"
 *                 slug: "oxford-leather-briefcase"
 *                 price: 129.99
 *                 stock: 50
 *                 sellerId: "321e4567-e89b-12d3-a456-426614174001"
 *                 image: "oxford-briefcase.jpg"
 *       400:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               msg: "Product not found !!"
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             example:
 *               msg: "Access denied"
 *       500:
 *         description: Server error during deletion
 *         content:
 *           application/json:
 *             example:
 *               msg: "Something Went Wrong !!"
 */

routes.delete(
  "/deleteProduct/:id",
  passport.authenticate("jwt", { session: false }),
  checkRole(["admin", "seller"]),
  productController.deleteProduct
);

/**
 * @swagger
 * /getSingleProduct/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     description: 
 *       Admin can fetch any product. Sellers can fetch their own products only.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the product to fetch
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Specific product fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: "Specific Product Has Been Successfully Fetched !!"
 *               getSpecificProduct:
 *                 id: "a1b2c3d4-e89b-12d3-a456-426614174000"
 *                 name: "Cambridge Tweed Jacket"
 *                 slug: "cambridge-tweed-jacket"
 *                 description: "A premium wool tweed jacket ideal for British winters."
 *                 price: 179.99
 *                 stock: 20
 *                 sellerId: "321e4567-e89b-12d3-a456-426614174001"
 *                 categoryId: "111e4567-e89b-12d3-a456-426614174002"
 *                 subcategoryId: "222e4567-e89b-12d3-a456-426614174003"
 *                 brand: "BritWear"
 *                 color: "Olive Green"
 *                 size: "L"
 *                 material: "100% Wool"
 *                 image: "cambridge-tweed.jpg"
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             example:
 *               msg: "Access denied"
 *       500:
 *         description: Server error during fetch
 *         content:
 *           application/json:
 *             example:
 *               msg: "Something Went Wrong during fetching the specific product !!"
 */

routes.get(
  "/getSingleProduct/:id",
  passport.authenticate("jwt", { session: false }),
  checkRole(["admin", "seller"]),
  productController.getSingleProduct
);

/**
 * @swagger
 * /updateProduct/{id}:
 *   put:
 *     summary: Update product details
 *     description: 
 *       Admin can update any product. Sellers can update their own products only.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: "Product Has Been Successfully Updated !!"
 *               product:
 *                 id: "a1b2c3d4-e89b-12d3-a456-426614174000"
 *                 name: "London Heritage Coat"
 *                 slug: "london-heritage-coat"
 *                 description: "Classic British long coat perfect for autumn walks in Hyde Park."
 *                 price: 199.99
 *                 stock: 15
 *                 sellerId: "321e4567-e89b-12d3-a456-426614174001"
 *                 categoryId: "111e4567-e89b-12d3-a456-426614174002"
 *                 subcategoryId: "222e4567-e89b-12d3-a456-426614174003"
 *                 brand: "Union Attire"
 *                 color: "Navy Blue"
 *                 size: "M"
 *                 material: "Wool Blend"
 *                 image: "london-heritage-coat.jpg"
 *       400:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               msg: "Product not found with the provided id !!"
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             example:
 *               msg: "Access denied"
 *       500:
 *         description: Server error during update
 *         content:
 *           application/json:
 *             example:
 *               msg: "Something Went Wrong !!"
 */

routes.put(
  "/updateProduct/:id",
  passport.authenticate("jwt", { session: false }),
  checkRole(["admin", "seller"]),
  uploadProductImage,
  productController.updateProduct
);

module.exports = routes;
