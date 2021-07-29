class OrderController {
  index(req, res) {
    res.render("admin/orders");
  }
}

module.exports = new OrderController();
