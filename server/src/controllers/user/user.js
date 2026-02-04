const express = require("express");
const userSchema = require("../../models/user/user")
const bcrypt = require("bcrypt")
const saltRounds = 10;

const registerController = async(req,res) => {
    try{
    const data = req.body;

    const existingUser = await userSchema.findOne({ email : data.email});

    if(existingUser){
        return res.status(409).json({ success : true, message : "User already exist, Please Login"})
    }
    if(data.password){
       const hashedPassword = await bcrypt.hash(data?.password, saltRounds)
       data.password = hashedPassword;
    }
    const user = await new userSchema(data);
    await user.save()
    return res.status(201).json({ success : true , data : user, message : "Register Successfully"})
}catch(err){
    console.log(err.message);
    return res.status(500).json({ success : false, message : err.message})
}
}



const loginController = async(req,res) => {
    try{
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email : email})

        if(!user){
            return res.status(404).json({ success : false, message : "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({ success : false, message : "Invalid Credentials"})
        }
        return res.status(200).json({ success : true, data : user, message : "Login Successful"})
    }catch(err){
        return res.status(500).json({ success : false, message : err.message})
    }
}


module.exports = {
    registerController, loginController
}