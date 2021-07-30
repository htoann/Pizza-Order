const Order = require("../../../models/Order");

class OrderController {
  async index(req, res) {
    const order = await Order.find({
      status: { $ne: "completed" },
    })
      .sort({ createdAt: -1 })
      .populate("customerId", "- password")
      .exec((err, orders) => {
        res.render("admin/orders");
      });
  }
}

module.exports = new OrderController();
