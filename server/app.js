//app.js
const express = require("express");
const app = express();
app.use(express.json());


const configDB = require("./src/config/db")



configDB();

// Import routes
const userRoutes = require("./src/router/router");
app.use("/api", userRoutes);

// Export app for Jest / Supertest
module.exports = app;
