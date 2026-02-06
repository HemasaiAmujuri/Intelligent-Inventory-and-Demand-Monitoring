const mongoose = require("mongoose");

                                                  // schema for when creating orders
const orderSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true
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
        required : true
    },
    isDeleted : {             // for soft delete 
        type : Boolean,
        default : false
    },
}, { timeStamps : true});



module.exports = mongoose.model( "orders", orderSchema )