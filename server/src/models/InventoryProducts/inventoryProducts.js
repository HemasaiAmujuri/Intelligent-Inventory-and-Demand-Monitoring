const mongoose = require("mongoose");      // schema for Inventory products

const InventoryProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "electronics",
        "stationery",
        "groceries",
        "furniture",
        "clothing",
        "tools",
        "toys",
        "cosmetics",
        "sports",
         "books",
        "other"       
      ],
    },
    currentStock: {
      type: Number,
      required: true,
      min: 0   // current stock never be a negative
    },
    reOrderPoint: {
      type: Number,
      default : 5,
      min: 0     // re-order Point never be a negative
    },
      isDeleted : {         // for soft delete
      type : Boolean,
      default : false
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("products", InventoryProductsSchema);

