const Menu = require("../../models/menu");

class homeController {
  async index(req, res) {
    const pizzas = await Menu.find();
    return res.render("home", { pizzas: pizzas });
  }
}

module.exports = new homeController();
