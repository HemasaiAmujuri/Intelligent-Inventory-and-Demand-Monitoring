const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    Category: {
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
    isDeleted : {
        type : Boolean,
        default : false
    }
}, { timeStamps : true});



module.exports = mongoose.model(orderSchema , orders)