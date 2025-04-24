const db = require('../models');
const slugify = require('slugify');

module.exports.createRole = async (req,res)=>{
    try{
        const slug = slugify(req.body.name,{lower:true});
        const roleData ={
            name:req.body.name,
            slug:slug
        }
        // console.log(req.body);

        let role = await db.Role.create(roleData);
        // console.log(role.toJSON());

        if(role){
            return res.status(200).json({msg:"Role Has Been Successfully Created !!",role})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong !!"})
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getRole = async(req,res)=>{
    try{
        let roles = await db.Role.findAll();
        if(roles){
            return res.status(200).json({msg:"Roles Has Been Successfully Fetched !!",roles})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong during fetching the roles !!"})
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteRole = async(req,res)=>{
    try{
        let getRoles = await db.Role.findByPk(req.params.id);
        if(getRoles){
            await getRoles.destroy();
            return res.status(200).json({msg:"Role Has Been Successfully Deleted !!",getRoles})
        }
        else{
            return res.status(500).json({msg:"Something Went Wrong during deleting the roles Or roles not found!!"});
        }

    }
    catch(err){
        console.log(err);
    }
}

module.exports.getSingleRole = async(req,res)=>{
    try{
        let getSpecificRole = await db.Role.findByPk(req.params.id);
        if(getSpecificRole){
            return res.status(200).json({msg:"Specific Role Has Been Successfully Fetched !!",getSpecificRole})
            }
        else{
            return res.status(500).json({msg:"Something Went Wrong during fetching the specific roles !!"});
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.updateRole = async(req,res)=>{
    try{
        const {name} = req.body;
        if(!name){
            return res.status(400).json({msg:"name is required for updation !!"});
        }
        const role = await db.Role.findByPk(req.params.id);
        if(!role){
            return res.status(200).json({msg:"Role not found with the provided id !!"})
        }
        const updateData = {
            name:name,
            slug:slugify(name,{lower:true})
        }
        await role.update(updateData);
        res.status(200).json({msg:"Role Has Been Successfully Updated !!",role})
    }
    catch(err){
        console.log(err);
    }
}