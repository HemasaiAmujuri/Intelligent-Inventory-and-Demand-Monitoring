const orderSchema = require("../../models/order/order");
const inventorySchema = require("../../models/InventoryProducts/inventoryProducts");

const createOrder = async (req, res) => {
  try {
    const data = req.body;

    if (!data?.productName) {
      return res.status(400).json({ success: false, message: "Product name is required" });
    }

    // Find product in inventory
    const productExist = await inventorySchema.findOne({ name: data.productName });

    if (!productExist) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Check stock
    if (productExist.currentStock < data.quantity) {
      return res.status(409).json({ 
        success: false, 
        message: `Not enough stock available. Only ${productExist.currentStock} items left.` 
      });
    }

    // Reduce stock
    productExist.currentStock -= Number(data.quantity);
    await productExist.save();

    // Create order only after stock validation
    const newOrder = new orderSchema(data);
    await newOrder.save();

    return res.status(201).json({
      success: true,
      data: newOrder,
      message: "Order placed successfully",
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = createOrder;
