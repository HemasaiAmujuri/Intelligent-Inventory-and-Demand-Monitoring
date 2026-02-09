const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv")
dotenv.config()


const userName = encodeURIComponent(process.env.Email);
const password = encodeURIComponent(process.env.Password);

const dbUri = `mongodb+srv://${userName}:${password}@questions.e2ai2cz.mongodb.net/Inventory-monitoring?retryWrites=true&w=majority&authSource=admin`;




const configDB = async() => {     // try-catch is used to handle DB connection errors such as server down, wrong credentials, wrong port, or network issues
    try{
    await mongoose.connect(dbUri)
    console.log("connected Database")
    }catch(err){
        console.log(err)
    }
}



module.exports = configDB;