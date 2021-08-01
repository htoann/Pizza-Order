const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/OrderController");
const adminOrderController = require("../app/http/controllers/admin/OrderController");
const guest = require("../app/http/middleware/Guest");
const auth = require("../app/http/middleware/Auth");
const admin = require("../app/http/middleware/Admin");

module.exports = function initRoute(app) {
  app.get("/", homeController.index);

  app.get("/login", guest, authController.login);
  app.post("/login", authController.postLogin);
  app.get("/register", guest, authController.register);
  app.post("/register", authController.postRegister);
  app.get("/logout", authController.logout);

  // Cart routes
  app.get("/cart", cartController.index);
  app.post("/update-cart", cartController.update);
  app.post("/delete-cart", cartController.delete);

  // Customer routes
  app.get("/customer/orders", auth, orderController.index);
  app.post("/orders", auth, orderController.store);
  app.post("/cancel-order", auth, orderController.cancel);

  // Admin routes
  app.get("/admin/orders", admin, adminOrderController.index);

  app.get("*", (req, res) => {
    return res.render("404");
  });
};
