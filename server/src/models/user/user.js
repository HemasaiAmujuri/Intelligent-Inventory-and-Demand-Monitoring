const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      required: true
    },
    email: {
      type: String,
      unique:true,
      trim:true,
      lowercase: true, 
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isDeleted : {                 // for soft delete user
      type : Boolean,
      default : false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
