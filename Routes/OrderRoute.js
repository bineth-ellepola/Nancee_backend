const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/OrderController");

router.get("/", orderController.getOrders);
router.put("/update/:id", orderController.updateOrder);
router.put("/updateStock/:id", orderController.updateStock);
router.post("/add", orderController.addOrder);

module.exports = router;
