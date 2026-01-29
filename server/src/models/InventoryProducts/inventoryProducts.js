const mongoose = require("mongoose");

const InventoryProducts = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Electronics",
        "Stationery",
        "Groceries",
        "Furniture",
        "Clothing",
        "Tools",
        "Toys",
        "Cosmetics",
        "Sports",
        "Other",
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

module.exports = mongoose.model("InventoryProducts", InventoryProducts);
