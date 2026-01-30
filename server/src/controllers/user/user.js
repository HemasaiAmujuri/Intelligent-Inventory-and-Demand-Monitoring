const express = require("express");
const userSchema = require("../../models/user/user")
const bcrypt = require("bcrypt")
const saltRounds = 10;

const registerController = async(res,req) => {
    try{
    const data = req.body;
    if(data.password){
       const hashedPassword = await bcrypt.hash(data?.password)
       data.password = hashedPassword;
    }
    const user = await new userSchema(data);
    return res.status(200).json({ success : true , data : user, message : "Data received successfully"})
}catch(err){
    console.log(err.message);
    return res.status(500).json({ success : false, message : err.message})
}
}



const loginController = async(req,req) => {
    try{
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email : email})

        if(!user){
            return res.status(404).json({ success : false, message : "User not found"})
        }
        const isMatch = await bcrypt.compare(user.password, password)
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