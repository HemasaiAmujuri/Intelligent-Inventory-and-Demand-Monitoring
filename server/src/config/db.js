const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv")
dotenv.config()


const userName = encodeURIComponent(process.env.Email);
const password = encodeURIComponent(process.env.Password);


const dbUri = `mongodb+srv://${userName}:${password}@questions.e2ai2cz.mongodb.net/Inventory-monitoring`;


console.log(dbUri, "DB")



const configDB = async() => {
    try{
    await mongoose.connect(dbUri)
    console.log("connected Database")
    }catch(err){
        console.log(err)
    }
}



module.exports = configDB;