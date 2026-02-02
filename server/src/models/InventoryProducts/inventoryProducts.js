const mongoose = require("mongoose");

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
    },
    reOrderPoint: {
      type: Number,
      required: true,
      default : 5
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("products", InventoryProductsSchema);

