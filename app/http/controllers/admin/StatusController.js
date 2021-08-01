const Order = require("../../../models/Order");

function StatusOrder() {
  return {
    update(req, res) {
      res.send("Hello");
    },
  };
}

module.exports = StatusOrder();
