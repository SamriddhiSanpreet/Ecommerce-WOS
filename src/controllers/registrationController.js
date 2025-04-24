const db = require('../models');
const slugify = require('slugify');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

module.exports.registerUser = async(req,res)=>{
    try{
        // console.log(req.body);
        if(!req.body.name || !req.body.email || !req.body.password || !req.body.roleId){
            return res.status(400).json({msg:"name,email,password,roleId are required !!"});
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const registration = await db.Registration.create({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            phone:req.body.phone,
            address:req.body.address,
            roleId:req.body.roleId,
            slug: slugify(req.body.name, { lower: true }),
            profileImage: req.file ? req.file.filename : null,
            isVerified:req.body.isVerified || false,
            status:req.body.status || 'inactive'
        })
        if(registration){
            return res.status(200).json({msg:"User Has Been Successfully Registered !!",registration})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong during User registration !!"})
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getRegisteredUser = async(req,res)=>{
    try{
        const registeredUser = await db.Registration.findAll();
        if(registeredUser){
            return res.status(200).json({msg:"Registered User Has Been Successfully Fetched !!",registeredUser})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong during fetching the registered users !!"})
        }
    }
    catch(err){
        return false;
    }
}

module.exports.deleteRegisteredUser = async(req,res)=>{
    try{
        const getRegisteredUser = await db.Registration.findByPk(req.params.id);
        if(!getRegisteredUser){
            return res.status(400).json({msg:"User not found !!"});
        }
        if(getRegisteredUser.profileImage){
            const imagePath = path.join(__dirname, '..','uploads', getRegisteredUser.profileImage);
            fs.unlinkSync(imagePath);
        }
        await getRegisteredUser.destroy();
        return res.status(200).json({msg:"User Has Been Successfully Deleted !!",getRegisteredUser})
            
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getSingleRegisteredUser = async(req,res)=>{
    try{
        let getSpecificRegisteredUser = await db.Registration.findByPk(req.params.id);
        if(getSpecificRegisteredUser){
            return res.status(200).json({msg:"Specific Registration Has Been Successfully Fetched !!",getSpecificRegisteredUser})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong during fetching the specific getSpecificRegisteredUser !!"});
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.updateRegisteredUser = async(req,res)=>{
    try{
        const registeredUser = await db.Registration.findByPk(req.params.id);
        if(!registeredUser){
            return res.status(400).json({msg:"User not found with the provided id !!"});
        }
        if(req.file){
            if(registeredUser.profileImage){
                const oldImagePath = path.join(__dirname,'..','uploads',registeredUser.profileImage);
                fs.unlinkSync(oldImagePath);
            }
        }
        const updateData = {
            name:req.body.name || registeredUser.name,
            email:req.body.email || registeredUser.email,
            password:req.body.password || registeredUser.password,
            phone:req.body.phone || registeredUser.phone,
            address:req.body.address || registeredUser.address,
            roleId:req.body.roleId || registeredUser.roleId,
            slug:slugify(req.body.name || registeredUser.name,{lower:true}),
            profileImage:req.file ? req.file.filename : registeredUser.profileImage,
            isVerified:req.body.isVerified || registeredUser.isVerified,
            status:req.body.status || registeredUser.status
        }
        await registeredUser.update(updateData);
        res.status(200).json({msg:"User Has Been Successfully Updated !!",registeredUser})
        
    }
    catch(err){
        console.log(err);
    }
}