const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,      // Use the JS constructor String, not "string"
      required: true
    },
    email: {
      type: String,
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

module.exports = mongoose.model("User", userSchema);
