const Order = require("../../../models/order");

function OrderController() {
  return {
    index(req, res) {
      Order.find({ status: { $ne: "completed" } }, null, {
        sort: { createdAt: -1 },
      })
        .populate("customerId", "-password")
        .exec((err, orders) => {
          if (req.xhr) {
            res.header("Cache-Control", "no-store");
            return res.json(orders);
          } else {
            res.header("Cache-Control", "no-store");
            return res.render("admin/orders");
          }
        });
    },
  };
}

module.exports = OrderController();
