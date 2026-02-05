const orderSchema = require("../../models/order/order");
const inventorySchema = require("../../models/InventoryProducts/inventoryProducts");

const createOrder = async (req, res) => {
  try {
    const data = req.body;
    const newOrder = await new orderSchema(data);
    await newOrder.save();
    if (data?.productName) {
  const productExist = await inventorySchema.findOne({ name: data.productName });

  if (productExist) {
    productExist.currentStock -= Number(data.quantity);

    if (productExist.currentStock < 0) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    await productExist.save();
  } else {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
}

    await newOrder.save();
    return res
      .status(201)
      .json({
        success: true,
        data: newOrder,
        message: "Data saved successfully",
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = createOrder;
