const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await db.Registration.findOne({ where: { email } });

        if (!user) return res.status(404).json({ msg: 'User not found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: 'Wrong credentials' });

        const payload = { id: user.id, roleId: user.roleId };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ msg: 'Login successful', token });

    }
    catch(err){
        console.log(err);
    }
}