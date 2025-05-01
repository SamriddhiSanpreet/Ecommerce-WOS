const express = require('express');
const routes = express.Router();
const registerController = require('../controllers/registrationController');
const {uploadImage} = require('../middlewares/profileUploads');
const passport = require('passport');
const checkRole = require('../middlewares/checkRole');

/**
 * @swagger
 * tags:
 *   name: Registration
 *   description: Registration management API
 */


/**
 * @swagger
 * /registerUser:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with optional profile image.
 *     tags:
 *       - Registration
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - roleId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ali Raza"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ali@example.com"
 *               password:
 *                 type: string
 *                 example: "Password123"
 *               phone:
 *                 type: string
 *                 example: "03001234567"
 *               address:
 *                 type: string
 *                 example: "Lahore, Pakistan"
 *               roleId:
 *                 type: integer
 *                 example: 2
 *               isVerified:
 *                 type: boolean
 *                 example: false
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: inactive
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: "User Has Been Successfully Registered !!"
 *               registration:
 *                 id: 15
 *                 name: "Samriddhi Sanpreet"
 *                 email: "sam@example.com"
 *                 phone: "062894388798"
 *                 address: "Surat, Gujarat"
 *                 roleId: 2
 *                 slug: "samriddhi-sanpreet"
 *                 profileImage: "sam.jpg"
 *                 isVerified: false
 *                 status: "inactive"
 *                 createdAt: "2025-05-01T12:00:00.000Z"
 *                 updatedAt: "2025-05-01T12:00:00.000Z"
 *       400:
 *         description: Required fields missing
 *         content:
 *           application/json:
 *             example:
 *               msg: "name,email,password,roleId are required !!"
 *       500:
 *         description: Server error during registration
 *         content:
 *           application/json:
 *             example:
 *               msg: "Something Went Wrong during User registration !!"
 */

routes.post('/registerUser',uploadImage,registerController.registerUser );

/**
 * @swagger
 * /getRegisteredUser:
 *   get:
 *     summary: Get registered users
 *     description: 
 *       Admin can fetch all registered users. 
 *       Seller and user roles can only fetch their own details.
 *     tags:
 *       - Registration
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Registered user(s) retrieved successfully
 *         content:
 *           application/json:
 *             examples:
 *               adminResponse:
 *                 summary: Admin View (all users)
 *                 value:
 *                   msg: "Registered User Has Been Successfully Fetched !!"
 *                   registeredUser:
 *                     - id: "123e4567-e89b-12d3-a456-426614174000"
 *                       name: "Admin"
 *                       email: "admin@example.com"
 *                       phone: "1234567890"
 *                       address: "Admin Address"
 *                       roleId: "123e4567-e89b-12d3-a456-426614174001"
 *                       slug: "admin"
 *                       profileImage: "admin.jpg"
 *                       isVerified: true
 *                       status: "active"
 *                       createdAt: "2025-01-01T12:00:00.000Z"
 *                       updatedAt: "2025-01-01T12:00:00.000Z"
 *                     - id: "223e4567-e89b-12d3-a456-426614174000"
 *                       name: "User 1"
 *                       email: "user1@example.com"
 *                       phone: "9876543210"
 *                       address: "User Address"
 *                       roleId: "223e4567-e89b-12d3-a456-426614174001"
 *                       slug: "user-1"
 *                       profileImage: "user1.jpg"
 *                       isVerified: false
 *                       status: "inactive"
 *                       createdAt: "2025-02-01T12:00:00.000Z"
 *                       updatedAt: "2025-02-01T12:00:00.000Z"
 *               userResponse:
 *                 summary: User View (self only)
 *                 value:
 *                   msg: "Registered User Has Been Successfully Fetched !!"
 *                   registeredUser:
 *                     id: "223e4567-e89b-12d3-a456-426614174000"
 *                     name: "John"
 *                     email: "john@example.com"
 *                     phone: "03001234567"
 *                     address: "Pune, India"
 *                     roleId: "223e4567-e89b-12d3-a456-426614174001"
 *                     slug: "john"
 *                     profileImage: "john.jpg"
 *                     isVerified: false
 *                     status: "inactive"
 *                     createdAt: "2025-05-01T12:00:00.000Z"
 *                     updatedAt: "2025-05-01T12:00:00.000Z"
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             example:
 *               msg: "Access denied !!"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Something Went Wrong during fetching the registered users !!"
 */
routes.get('/getRegisteredUser',passport.authenticate('jwt',{session:false}),checkRole(['admin','seller','user']), registerController.getRegisteredUser);

/**
 * @swagger
 * /deleteRegisteredUser/{id}:
 *   delete:
 *     summary: Delete a registered user
 *     description: 
 *       Admin, Seller, or User can delete their own account. 
 *       Admin can delete any user's account, while Seller and User can only delete their own account.
 *     tags:
 *       - Registration
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to be deleted
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User successfully deleted
 *         content:
 *           application/json:
 *             example:
 *               msg: "User Has Been Successfully Deleted !!"
 *               deletedUser:
 *                 id: "223e4567-e89b-12d3-a456-426614174000"
 *                 name: "John"
 *                 email: "john@example.com"
 *                 phone: "03001234567"
 *                 address: "Lucknow, India"
 *                 roleId: "223e4567-e89b-12d3-a456-426614174001"
 *                 slug: "john"
 *                 profileImage: "john.jpg"
 *                 isVerified: false
 *                 status: "inactive"
 *                 createdAt: "2025-05-01T12:00:00.000Z"
 *                 updatedAt: "2025-05-01T12:00:00.000Z"
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             example:
 *               msg: "Access denied !! You can only delete your own account !"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               msg: "User not found with the provided id !!"
 *       500:
 *         description: Server error during deletion
 *         content:
 *           application/json:
 *             example:
 *               msg: "Something Went Wrong during user deletion !!"
 */

routes.delete('/deleteRegisteredUser/:id',passport.authenticate('jwt',{session:false}),checkRole(['admin','seller','user']), registerController.deleteRegisteredUser);

/**
 * @swagger
 * /getSingleRegisteredUser/{id}:
 *   get:
 *     summary: Get a specific registered user
 *     description: 
 *       Admin can fetch the details of a specific registered user using their user ID.
 *     tags:
 *       - Registration
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to fetch details for
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Specific registered user retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: "Specific Registration Has Been Successfully Fetched !!"
 *               registeredUser:
 *                 id: "223e4567-e89b-12d3-a456-426614174000"
 *                 name: "Ali Raza"
 *                 email: "ali.raza@example.com"
 *                 phone: "03001234567"
 *                 address: "Lahore, Pakistan"
 *                 roleId: "223e4567-e89b-12d3-a456-426614174001"
 *                 slug: "ali-raza"
 *                 profileImage: "ali-raza.jpg"
 *                 isVerified: false
 *                 status: "inactive"
 *                 createdAt: "2025-05-01T12:00:00.000Z"
 *                 updatedAt: "2025-05-01T12:00:00.000Z"
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             example:
 *               msg: "Access denied !! Only Admin Can View this !!"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               msg: "User not found with the provided id !!"
 *       500:
 *         description: Server error during fetching user details
 *         content:
 *           application/json:
 *             example:
 *               msg: "Something Went Wrong during fetching the specific user !!"
 */

routes.get('/getSingleRegisteredUser/:id',passport.authenticate('jwt',{session:false}),checkRole(['admin']), registerController.getSingleRegisteredUser);

/**
 * @swagger
 * /updateRegisteredUser/{id}:
 *   put:
 *     summary: Update a registered user's details
 *     description: 
 *       Admin, Seller, and User can update their own details. Admin can update any user's details.
 *     tags:
 *       - Registration
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to be updated
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Khushi"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "khushi@example.com"
 *               phone:
 *                 type: string
 *                 example: "03001234567"
 *               address:
 *                 type: string
 *                 example: "Vararansi, India"
 *               roleId:
 *                 type: string
 *                 example: "223e4567-e89b-12d3-a456-426614174001"
 *               isVerified:
 *                 type: boolean
 *                 example: false
 *               status:
 *                 type: string
 *                 enum: [active, inactive, blocked]
 *                 example: "inactive"
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User details updated successfully
 *         content:
 *           application/json:
 *             examples:
 *               adminUpdate:
 *                 summary: Admin updating a user's profile
 *                 value:
 *                   msg: "User Has Been Successfully Updated !!"
 *                   updatedUser:
 *                     id: "223e4567-e89b-12d3-a456-426614174000"
 *                     name: "Sam San"
 *                     email: "sam.san@example.com"
 *                     phone: "03001234567"
 *                     address: "Surat, India"
 *                     roleId: "223e4567-e89b-12d3-a456-426614174001"
 *                     slug: "sam-san"
 *                     profileImage: "sam.jpg"
 *                     isVerified: false
 *                     status: "inactive"
 *                     createdAt: "2025-05-01T12:00:00.000Z"
 *                     updatedAt: "2025-05-01T12:00:00.000Z"
 *               userUpdate:
 *                 summary: User updating their own profile
 *                 value:
 *                   msg: "User Has Been Successfully Updated !!"
 *                   updatedUser:
 *                     id: "789e4567-e89b-12d3-a456-426614174099"
 *                     name: "Emily Brown"
 *                     email: "emily.brown@example.co.uk"
 *                     phone: "07123456789"
 *                     address: "Bristol, United Kingdom"
 *                     roleId: "323e4567-e89b-12d3-a456-426614174011"
 *                     slug: "emily-brown"
 *                     profileImage: "emily-brown.jpg"
 *                     isVerified: true
 *                     status: "active"
 *                     createdAt: "2025-02-15T10:20:00.000Z"
 *                     updatedAt: "2025-05-01T12:00:00.000Z"
 *       400:
 *         description: Invalid user ID or missing required fields
 *         content:
 *           application/json:
 *             example:
 *               msg: "User not found with the provided id !!"
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             example:
 *               msg: "Access denied !! You can only update your own account !"
 *       500:
 *         description: Server error during update
 *         content:
 *           application/json:
 *             example:
 *               msg: "Something Went Wrong during updating the user !!"
 */

routes.put('/updateRegisteredUser/:id',passport.authenticate('jwt',{session:false}),checkRole(['admin','seller','user']),uploadImage,registerController.updateRegisteredUser);

module.exports = routes;
