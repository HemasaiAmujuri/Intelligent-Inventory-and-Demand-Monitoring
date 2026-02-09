const orderSchema = require("../../models/order/order");
const inventorySchema = require("../../models/InventoryProducts/inventoryProducts");

const createOrder = async (req, res) => {
  try {
    const data = req.body;

    if (!data.quantity || isNaN(data.quantity) || data.quantity <= 0) {
  return res.status(400).json({
    success: false,
    message: "Valid quantity is required"
  });
}


    if (!data?.productName) {
      return res.status(400).json({ success: false, message: "Product name is required" });
    }

    // Find product in inventory
    const productExist = await inventorySchema.findOne({ name: data.productName });

    if (!productExist) {   //check product exist or not
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Check stock
    if (productExist.currentStock < data.quantity) {
      return res.status(409).json({ 
        success: false, 
        message: `Not enough stock available. Only ${productExist.currentStock} items left.` 
      });
    }

     // Create order only after stock validation
    const newOrder = new orderSchema(data);
    const savedOrder = await newOrder.save();   //create new document if not existing products

    // Reduce stock
    if(savedOrder){
       productExist.currentStock -= Number(data.quantity);
       await productExist.save();  //update details with existing product
    }
    

   
    return res.status(201).json({               //true block
      success: true, 
      data: newOrder,
      message: "Order placed successfully",
    });

  } catch (err) {                  //false block
    return res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = createOrder;
