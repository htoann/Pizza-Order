const homeController = require("../app/http/controllers/HomeController");
const authController = require("../app/http/controllers/AuthController");
const cartController = require("../app/http/controllers/customers/CartController");
const orderController = require("../app/http/controllers/customers/OrderController");
const guest = require("../app/http/middleware/guest");

function initRoute(app) {
  app.get("/", homeController.index);

  app.get("/login", guest, authController.login);
  app.post("/login", authController.postLogin);
  app.get("/register", guest, authController.register);
  app.post("/register", authController.postRegister);
  app.get("/logout", authController.logout);

  app.get("/cart", cartController.index);
  app.post("/update-cart", cartController.update);

  // Customer routes
  app.post("/orders", orderController.store);
  app.get("/customer/orders", orderController.index);
}

module.exports = initRoute;
