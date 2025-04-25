const db = require('../models');
const slugify = require('slugify');
const path = require('path');
const fs = require('fs');

module.exports.createProduct = async(req,res)=>{
    try{
        // console.log(req.body);
        
        if (!req.body.name || !req.body.sellerId || !req.body.categoryId || !req.body.subcategoryId || !req.body.price || !req.body.stock) {
            return res.status(400).json({ msg: "All required fields must be filled!" });
        }

        const slug = slugify(req.body.name, { lower: true });
        req.body.slug = slug;
        const image = req.file ? req.file.filename : null;
        req.body.image = image;
        const userRole = req.user.role ? req.user.role.name : null; 
        const userId = req.user.id;

        if (userRole === "admin" || (userRole === "seller" && req.body.sellerId === userId)) {

            const data = await db.Product.create(req.body,slug,image);
            if(data){
                return res.status(200).json({msg:"Product Has Been Successfully Created !!",data})
            }
            else{
                return res.status(500).json({msg:"Something Went Wrong !!"})
            }
        }
        else{
            return res.status(403).json({ msg: "Access denied" });
        }
        
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getProducts = async(req,res)=>{
    try{
        let products;
        const userRole = req.user.role.name;
        const userId = req.user.id; 
        if (userRole === 'admin') {
            products = await db.Product.findAll();
        }
        else if (userRole === 'seller') {
            products = await db.Product.findAll({ where: { sellerId: userId } });
        }
        else if (userRole === 'user') {
            const sellerRole = await db.Role.findOne({ where: { name: 'seller' } }); 
            const sellers = await db.Registration.findAll({
                where: {
                    roleId: sellerRole.id 
                }
            });

            const sellerIds = sellers.map(seller => seller.id);

            products = await db.Product.findAll({
                where: {
                    sellerId: sellerIds
                }
            });
        }

        if(products){
            return res.status(200).json({msg:"Products Has Been Successfully Fetched !!",products})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong during fetching the products !!"})
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteProduct = async(req,res)=>{
    try{
        const product = await db.Product.findByPk(req.params.id);
        if(!product){
            return res.status(400).json({msg:"Product not found !!"});
        }
        const userRole = req.user.role ? req.user.role.name : null; 
        const userId = req.user.id;

        if (userRole === "admin" || (userRole === "seller" && product.sellerId === userId)) {
            if(product.image){
                const imagePath = path.join(__dirname, '..','uploads', product.image);
                fs.unlinkSync(imagePath);
            }
            await product.destroy();
            return res.status(200).json({msg:"Product Has Been Successfully Deleted !!",product})
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getSingleProduct = async(req,res)=>{
    try{
        let getSpecificProduct = await db.Product.findByPk(req.params.id);
        const userRole = req.user.role ? req.user.role.name : null; 
        const userId = req.user.id;

        if (userRole === "admin" || (userRole === "seller" && getSpecificProduct.sellerId === userId)) {
            if(getSpecificProduct){
                return res.status(200).json({msg:"Specific Product Has Been Successfully Fetched !!",getSpecificProduct})
            }
            else{
                return res.status(500).json({msg:"Something Went Wrong during fetching the specific product !!"});
            }
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.updateProduct = async(req,res)=>{
    try{
        const product = await db.Product.findByPk(req.params.id);
        const userRole = req.user.role ? req.user.role.name : null; 
        const userId = req.user.id;
        if (userRole === "admin" || (userRole === "seller" && getSpecificProduct.sellerId === userId)) {
            if(!product){
                return res.status(400).json({msg:"Product not found with the provided id !!"});
            }
            if(req.file){
                if(product.image){
                    const oldImagePath = path.join(__dirname,'..','uploads',product.image);
                    fs.unlinkSync(oldImagePath);
                }
            }
            const updateData = {
                name:req.body.name || product.name,
                slug:slugify(req.body.name || product.name,{lower:true}),
                description:req.body.description || product.description,
                price:req.body.price || product.price,
                stock:req.body.stock || product.stock,
                image:req.file ? req.file.filename : product.image,
                sellerId:req.body.sellerId || product.sellerId,
                categoryId:req.body.categoryId || product.categoryId,
                subcategoryId:req.body.subcategoryId || product.subcategoryId,
            }
            await product.update(updateData);
            res.status(200).json({msg:"Product Has Been Successfully Updated !!",product})
        }
    }
    catch(err){
        console.log(err);
    }
}