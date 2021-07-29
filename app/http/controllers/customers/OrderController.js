const Order = require("../../../models/Order");

class OrderController {
  store(req, res) {
    const { phone, address, paymentType } = req.body;

    const order = new Order({
      customerId: req.body._id,
      items: req.session.cart.items,
      phone,
      address,
    })
      .save()
      .then((result) => {
        req.flash("success", "Order placed successfully");
        return res.redirect("/customer/orders");
      })
      .catch((err) => {
        req.flash("err", "Something went wrong");
        console.log(err);
        return res.redirect("/cart");
      });
  }

  async index(req, res) {
    const orders = await Order.find({ customerId: req.user._id });
    res.render("customers/orders", { orders: orders });
  }
}

module.exports = new OrderController();
