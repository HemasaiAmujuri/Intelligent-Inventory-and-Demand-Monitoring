const express = require("express")
const router = express.Router();
const getInventoryProducts  = require("../src/controllers/inventoryList/inventoryList");


router.get("/inventory/inventoryList",  getInventoryProducts)
module.exports = router;