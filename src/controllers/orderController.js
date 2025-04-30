const { where } = require('sequelize');
const db = require('../models');
const slugify = require('slugify');

module.exports.createOrder = async(req,res)=>{
    try {
        let { userId, cartIds, paymentMethod } = req.body;
        
        console.log('Request body:', req.body);

        if (typeof cartIds === 'string') {
        cartIds = [cartIds];
        }

        if (typeof cartIds === 'string' && cartIds.includes(',')) {
        cartIds = cartIds.split(',');
        }

        if (!userId || !Array.isArray(cartIds) || !cartIds.length || !paymentMethod) {
        return res.status(400).json({ error: 'userId, cartIds, and paymentMethod are required' });
        }
            
        const cartItems = await db.Cart.findAll({
          where: { user_id: userId },
          include: ['Product']
        });
    
        const selectedItems = cartItems.filter(item => cartIds.includes(item.id));

        let orderSlug = 'order-' + Date.now(); 
        if (selectedItems[0]?.Product?.name) {
            orderSlug = slugify(selectedItems[0].Product.name + '-' + Date.now(), { lower: true });
        }

    
        if (!selectedItems.length) {
          return res.status(400).json({ error: 'No matching cart items found' });
        }
    
        const totalPrice = selectedItems.reduce((sum, item) => sum + item.total, 0);
    
        const order = await db.Order.create({
          userId,
          totalPrice,
          paymentMethod,
          status: 'confirmed',
          slug: orderSlug
        });
    
        const orderItems = selectedItems.map(item => ({
          orderId: order.id,
          productId: item.product_id,
          quantity: item.quantity,
          price: item.price,
          slug: item.Product.slug
        }));
    
        await db.OrderItem.bulkCreate(orderItems);
        await db.Cart.destroy({ where: { id: cartIds } });
    
        res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to place order' });
      }
    
}

module.exports.getOrders = async (req, res) => {
    try {
        const user_id = req.user.id;
        const user_role = req.user.role.name;
        let orders;

        if (user_role === 'admin') {
            orders = await db.Order.findAll({ include: ['items'] });
        } else {
            orders = await db.Order.findAll({ 
                where: { userId: user_id }, 
                include: ['items'] 
            });
        }

        if (orders && orders.length > 0) {
            return res.status(200).json({ msg: "Orders has been successfully fetched!", orders });
        } else {
            return res.status(404).json({ msg: "Sellers are not allowed !!" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Something went wrong!" });
    }
}

module.exports.deleteOrder = async(req,res)=>{
    try{
        const user_role = req.user.role.name;
        let order;
        if(user_role === 'admin'){
            order = await db.Order.findByPk(req.params.id);
            if(!order){
                return res.status(404).json({msg:"Order Not Found !!"});
            }
        }
        else{
            return res.status(403).json({msg:"Only Admin Can Delete This Order !!"});
        }
        await order.destroy();
        return res.status(200).json({msg:"Order Has Been Successfully Deleted !!",order});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Something Went Wrong !!"});
    }
}

module.exports.getSpecificOrder = async(req,res)=>{
    try{
        const user_id = req.user.id;
        let order;
        if(req.user.role.name === 'admin'){
            order = await db.Order.findByPk(req.params.id,{include:['items']});
            if(order){
                return res.status(200).json({msg:"Specific Order Has Been Successfully Fetched !!",order});
            }
            else{
                return res.status(404).json({msg:"Order Not Found !!"});
            }
        }
        else{
            order = await db.Order.findByPk(req.params.id,{ 
                where: { userId: user_id }, 
                include: ['items'] 
            });
            return res.status(400).json({msg:"Specific Order Has Been Successfully Fetched !!",order});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Something Went Wrong !"});
    }
}
  
module.exports.updateOrder = async(req,res)=>{
    try{
        const {status} = req.body;
        const order = await db.Order.findByPk(req.params.id);

        // console.log("==========",order);

        if(!order){
            return res.status(404).json({msg:"Order Not Found !!"});
        }

        const validStatus = ['confirmed','processing','shipped','delivered','cancelled','refunded'];
        if(!validStatus.includes(status)){
            return res.status(400).json({msg:"Invalid Status !!"});
        }

        order.status = status;
        await order.save();
        return res.status(200).json({msg:"Order Has Been Successfully Updated !!",order})
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Something Went Wrong !!"});
    }
}