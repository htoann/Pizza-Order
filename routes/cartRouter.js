const express = require("express");
const router = express.Router();
const cartController = require("../app/http/controllers/customers/CartController");

router.get("/cart", cartController.index);
router.post("/update-cart", cartController.update);
router.post("/delete-cart", cartController.delete);

module.exports = router;
