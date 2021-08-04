const Order = require("../../../models/Order");

function StatusOrder() {
  return {
    update(req, res) {
      Order.updateOne(
        { _id: req.body.orderId },
        { status: req.body.status },
        (err, data) => {
          // Emit event
          const eventEmiiter = req.app.get("eventEmitter");
          eventEmiiter.emit("orderUpdated", {
            id: req.body.orderId,
            status: req.body.status,
          });

          return res.redirect("/admin/orders/");
        }
      );
    },
  };
}

module.exports = StatusOrder();
