const homeController = require("../app/http/controllers/HomeController");
const authController = require("../app/http/controllers/AuthController");
const cartController = require("../app/http/controllers/customers/CartController");
const guest = require("../app/http/middleware/guest");

function initRoute(app) {
  app.get("/", homeController.index);
  app.get("/login", guest, authController.login);
  app.post("/login", authController.postLogin);
  app.get("/register", guest, authController.register);
  app.post("/register", authController.postRegister);

  app.get("/cart", cartController.index);
  app.post("/update-cart", cartController.update);
}

module.exports = initRoute;