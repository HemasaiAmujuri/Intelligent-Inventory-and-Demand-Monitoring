const express = require("express")
const router = express.Router();
const { getInventoryProducts, addInventoryProducts}  = require("../controllers/inventoryList/inventoryList");
const { registerController, loginController } = require("../controllers/user/user");


router.get("/inventory/inventoryList",  getInventoryProducts);
router.post("/inventory/addInventory", addInventoryProducts);
router.post("/user/register",registerController);
router.post("/user/login",loginController)




module.exports = router;