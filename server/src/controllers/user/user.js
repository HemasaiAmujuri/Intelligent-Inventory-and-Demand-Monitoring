const express = require("express");
const userSchema = require("../../models/user/user");
const bcrypt = require("bcrypt");
const saltRounds = 10; //bcrypt will run 2¹⁰ = 1024 rounds  and recommended way is 10 0r 12 incresing salt rounds lead to increse time complexity
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const registerController = async (req, res) => {
  try {
    const data = req.body;

    if (!data.name || !data.email || !data.mobile || !data.password) {
      return res.status(400).json({
        success: false,
        message: "Missing Required Fields",
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

    const payload = {
      id: user.id,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {    // generate access token
      expiresIn: "15min",
    });

    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {   // generate refresh token
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // JavaScript cannot access
      secure: true, // HTTPS only
      sameSite: "Strict", // CSRF protection
    });
    return res
      .status(201)
      .json({
        success: true,
        data: user,
        token: accessToken,
        message: "Registered Successfully",
      }); //true response
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ success: false, message: err.message }); //false response
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
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

    const payload = {
      id: user._id,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn : "15min"
    })

    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    res.cookie( "refreshToken", refreshToken, {
      httpOnly : true,   //Javascript cannot access
      secure : true,      // HTTPS only
      sameSite: "Strict", // CSRF protection

    })


    return res
      .status(200)
      .json({ success: true, token: accessToken, message: "Login Successful" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getUserInfo = (req, res) => {
  const name = req.user?.name;
  return res.status(200).json({
    success: true,
    name,
    message: "Data retrieved successfully",
  });
};


module.exports = {
  registerController,
  loginController,
  getUserInfo,
};

