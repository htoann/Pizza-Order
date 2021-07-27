function cartController() {
  return {
    index(req, res) {
      res.render("/cart");
    },
  };
}

module.exports = cartController;
