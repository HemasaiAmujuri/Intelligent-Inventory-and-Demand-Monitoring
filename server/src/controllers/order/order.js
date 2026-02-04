const orderSchema = require("../../models/order/order");



const createOrder = async(req,res) => {
    try{
    const data = req.body;
    console.log(data,"data");
    const newOrder = await new orderSchema(data);
    await newOrder.save();
    return res.status(201).json({ success : true, data : newOrder, message : "Data saved successfully"})
    }catch(err){
        return res.status(500).json({ success : false, message : err.message })
    }
}


module.exports = createOrder;