const express = require("express")
const router = express.Router();
const getInventoryProducts  = require("../controllers/inventoryList/inventoryList");
const { registerController, loginController } = require("../controllers/user/user");


router.get("/inventory/inventoryList",  getInventoryProducts);
router.post("/user/regiser",registerController);
router.post("user/login",loginController)




module.exports = router;