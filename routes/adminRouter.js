const express = require("express");
const router = express.Router();
const admin = require("../app/http/middleware/admin");
const adminOrderController = require("../app/http/controllers/admin/OrderController");

router.get("/orders", admin, adminOrderController.index);
router.post("/order/status", admin, statusController.update);

module.exports = router;
