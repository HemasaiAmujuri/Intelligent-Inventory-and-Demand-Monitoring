const express = require("express")
const router = express.Router();
const { getInventoryProducts, addInventoryProducts, getCriticalInventoryAlerts, getAllProductNames}  = require("../controllers/inventoryList/inventoryList");
const { registerController, loginController, getUserInfo } = require("../controllers/user/user");
const  createOrder  = require("../controllers/order/order");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/inventory/inventoryList",  getInventoryProducts);
router.post("/inventory/addInventory", addInventoryProducts);
router.get("/inventory/getCriticalInventoryAlerts",  authMiddleware, getCriticalInventoryAlerts);
router.post("/user/register",registerController);
router.post("/user/login",loginController);
router.post("/order/createOrder", createOrder);
router.get("/inventory/getAllProductNames", getAllProductNames);
router.get("/user/getUserInfo",authMiddleware,  getUserInfo);




module.exports = router;