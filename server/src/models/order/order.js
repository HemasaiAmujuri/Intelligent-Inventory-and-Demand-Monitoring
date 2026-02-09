const mongoose = require("mongoose");

                                                  // schema for when creating orders
const orderSchema = new mongoose.Schema({
    productName : {
        type : String,
        ref: "inventoryProducts",
        required : true
    },
    orderedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
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
    quantity : {
        type : Number,
        required : true,
        min:1
    },
    isDeleted : {             // for soft delete 
        type : Boolean,
        default : false
    },
    status: {
  type: String,
  enum: ["pending", "confirmed", "cancelled", "delivered"],
  default: "confirmed"
}
}, { timestamps : true});



module.exports = mongoose.model( "orders", orderSchema )