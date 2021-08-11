const Order = require("../../../models/order");
const moment = require("moment-timezone");

class OrderController {
  async index(req, res) {
    const orders = await Order.find({ customerId: req.user._id }).sort({
      createdAt: -1,
    });
    res.header("Cache-Control", "no-store");
    res.render("customers/orders", { orders: orders, moment: moment });
  }

  store(req, res) {
    const { phone, address, paymentType } = req.body;

    const order = new Order({
      customerId: req.user._id,
      items: req.session.cart.items,
      phone,
      address,
      paymentType,
    })
      .save()
      .then((result) => {
        Order.populate(result, { path: "customerId" }, (err, placedOrder) => {
          // req.flash("success", "Order placed successfully");
          delete req.session.cart;
          // Emit
          const eventEmiiter = req.app.get("eventEmitter");
          eventEmiiter.emit("orderPlaced", placedOrder);

          return res.json({ message: "Order placed successfully" });
          // return res.redirect("/customer/orders");
        });
      })
      .catch((err) => {
        req.flash("err", "Something went wrong");
        return res.redirect("/cart");
      });
  }

  cancel(req, res) {
    Order.deleteOne({ _id: req.body.orderId }, (err, data) => {
      return res.redirect("/customer/orders");
    });
  }

  async status(req, res) {
    const order = await Order.findById(req.params.id);

    // Authorize user
    if (req.user._id.toString() === order.customerId.toString()) {
      return res.render("customers/status", { order });
    }

    return res.redirect("/");
  }
}

module.exports = new OrderController();
