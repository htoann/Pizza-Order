const express = require("express");
const router = express.Router();
const guest = require("../app/http/middleware/guest");
const authController = require("../app/http/controllers/AuthController");

router.get("/login", guest, authController.login);
router.post("/login", authController.postLogin);
router.get("/register", guest, authController.register);
router.post("/register", authController.postRegister);
router.get("/logout", authController.logout);

module.exports = router;
