const express = require("express");
const userSchema = require("../../models/user/user");
const bcrypt = require("bcrypt");
const saltRounds = 10; //bcrypt will run 2¹⁰ = 1024 rounds  and recommended way is 10 0r 12 incresing salt rounds lead to increse time complexity

const registerController = async (req, res) => {
  try {
    const data = req.body;

    if (!data.email || !data.password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const existingUser = await userSchema.findOne({ email: data.email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist, Please Login" });
    }
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data?.password, saltRounds); //here algorith runs 2^10 to hash the password
      data.password = hashedPassword;
    }
    const user = new userSchema(data);
    await user.save(); //here data saved in DB without this data is not saved in db
    return res
      .status(201)
      .json({ success: true, data: user, message: "Register Successfully" }); //true response
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ success: false, message: err.message }); //false response
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email || password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userSchema.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password); //compare passwords matching
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const userData = user.toObject();
    delete userData.password; //delete password from response
    return res
      .status(200)
      .json({ success: true, data: userData, message: "Login Successful" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  registerController,
  loginController,
};
