const multer = require('multer');
const path = require('path');
const imagePath = 'uploads'

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',imagePath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const uploadImage = multer({ storage: storage }).single('profileImage');
const uploadProductImage = multer({ storage: storage }).single('image');


module.exports = {uploadImage,uploadProductImage};