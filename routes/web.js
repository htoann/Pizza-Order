const homeController = require("../app/http/controllers/HomeController");
const authController = require("../app/http/controllers/AuthController");
const cartController = require("../app/http/controllers/customers/CartController");

function initRoute(app) {
  app.get("/", homeController.index);
  app.get("/login", authController.login);
  app.post("/login", authController.postLogin);
  app.get("/register", authController.register);
  app.post("/register", authController.postRegister);

  app.get("/cart", cartController.index);
  app.post("/update-cart", cartController.update);
}

module.exports = initRoute;
