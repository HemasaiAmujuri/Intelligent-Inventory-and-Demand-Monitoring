const express = require("express")
const router = express.Router();
const { getInventoryProducts, addInventoryProducts, getCriticalInventoryAlerts, getAllProductNames}  = require("../controllers/inventoryList/inventoryList");
const { registerController, loginController } = require("../controllers/user/user");
const  createOrder  = require("../controllers/order/order");


router.get("/inventory/inventoryList",  getInventoryProducts);
router.post("/inventory/addInventory", addInventoryProducts);
router.get("/inventory/getCriticalInventoryAlerts", getCriticalInventoryAlerts);
router.post("/user/register",registerController);
router.post("/user/login",loginController);
router.post("/order/createOrder", createOrder);
router.get("/inventory/getAllProductNames", getAllProductNames)




module.exports = router;