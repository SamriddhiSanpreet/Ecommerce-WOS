const db = require('../models')
const slugify = require('slugify');

module.exports.createCategory = async(req,res)=>{
    try{
        // console.log(req.body);
        const slug = slugify(req.body.name,{lower:true});
        const categoryData = {
            name:req.body.name,
            slug:slug,
        }
        let category = await db.Category.create(categoryData);
        if(category){
            return res.status(200).json({msg:"Category Has Been Successfully Created !!",category})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong !!"})
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getCategory = async(req,res)=>{
    try{
        let categories = await db.Category.findAll();
        if(categories){
            return res.status(200).json({msg:"Categories Has Been Successfully Fetched !!",categories})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong during fetching the categories !!"})
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteCategory = async(req,res)=>{
    try{
        let getCategories = await db.Category.findByPk(req.params.id);
        if(getCategories){
            await getCategories.destroy();
            return res.status(200).json({msg:"Category Has Been Successfully Deleted !!",getCategories})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong during deleting the category Or category not found!!"});
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getSingleCategory = async(req,res)=>{
    try{
        let getSpecificCategory = await db.Category.findByPk(req.params.id);
        if(getSpecificCategory){
            return res.status(200).json({msg:"Specific Category Has Been Successfully Fetched !!",getSpecificCategory})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong during fetching the specific category !!"});
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.updateCategory = async(req,res)=>{
    try{
        const {name} = req.body;
        if(!name){
            return res.status(400).json({msg:"name is required for updation !!"});
        }
        const category = await db.Category.findByPk(req.params.id);
        if(!category){
            return res.status(200).json({msg:"Category not found with the provided id !!"})
        }
        const updateData = {
            name:name,
            slug:slugify(name,{lower:true})
        }
        await category.update(updateData);
        res.status(200).json({msg:"Category Has Been Successfully Updated !!",category})
    }
    catch(err){
        console.log(err);
    }
}