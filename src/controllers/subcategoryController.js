const db = require('../models');
const slugify = require('slugify');

module.exports.createSubcategory = async(req,res)=>{
    try{
        // console.log(req.body);
        const  slug = slugify(req.body.name,{lower:true});
        const subcategoryData = {
            categoryId:req.body.categoryId,
            name:req.body.name,
            slug:slug
        }
        let subcategory = await db.Subcategory.create(subcategoryData);
        if(subcategory){
            return res.status(200).json({msg:"Subcategory Has Been Successfully Created !!",subcategory})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong !!"})
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getSubcategories = async(req,res)=>{
    try{
        let subcategories = await db.Subcategory.findAll();
        if(subcategories){
            return res.status(200).json({msg:"Subcategories Has Been Successfully Fetched !!",subcategories})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong during fetching the subcategories !!"})
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteSubcategory = async(req,res)=>{
    try{
        let getSubcategories = await db.Subcategory.findByPk(req.params.id);
        if(getSubcategories){
            await getSubcategories.destroy();
            return res.status(200).json({msg:"Subcategory Has Been Successfully Deleted !!",getSubcategories})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong during deleting the subcategory Or subcategory not found!!"});
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getSingleSubcategory = async(req,res)=>{
    try{
        let getSpecificSubcategory = await db.Subcategory.findByPk(req.params.id);
        if(getSpecificSubcategory){
            return res.status(200).json({msg:"Specific Subcategory Has Been Successfully Fetched !!",getSpecificSubcategory})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong during fetching the specific subcategory !!"});
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.updateSubcategory = async(req,res)=>{
    try{
        const {name,categoryId} = req.body;
        if(!name || !categoryId){
            return res.status(400).json({msg:"name and categoryId are required for updation !!"});
        }
        const updateData = {
            name:name,
            slug:slugify(name,{lower:true}),
            categoryId:categoryId
        }
        const subcategory = await db.Subcategory.findByPk(req.params.id);
        if(!subcategory){
            return res.status(200).json({msg:"Subcategory not found with the provided id !!"})
        }
        await subcategory.update(updateData);
        return res.status(200).json({msg:"Subcategory Has Been Successfully Updated !!",subcategory})  
    }
    catch(err){
        console.log(err);
    }
}