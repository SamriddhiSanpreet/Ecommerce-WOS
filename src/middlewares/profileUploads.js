const multer = require('multer');
const path = require('path');

// Absolute path for public folder
const publicPath = path.join(__dirname, '..','..', 'public');

// Storage for registration images
const registrationStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(publicPath, 'registration_img'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_REG_" + Date.now() + path.extname(file.originalname));
    }
});

// Storage for product images
const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(publicPath, 'products_img'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_PROD_" + Date.now() + path.extname(file.originalname));
    }
});

// Middleware
const uploadImage = multer({ storage: registrationStorage }).single('profileImage');
const uploadProductImage = multer({ storage: productStorage }).single('image');

module.exports = { uploadImage, uploadProductImage };
