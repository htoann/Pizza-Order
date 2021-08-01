const { json } = require("express");
const Order = require("../../../models/Order");

class CartController {
  index(req, res) {
    res.render("customers/cart");
  }

  update(req, res) {
    // For the first time creating cart and adding basic object structure
    if (!req.session.cart) {
      req.session.cart = {
        items: {},
        totalQty: 0,
        totalPrice: 0,
      };
    }
    let cart = req.session.cart;

    // Check if item does not exist in cart
    if (!cart.items[req.body._id]) {
      cart.items[req.body._id] = {
        item: req.body,
        qty: 1,
      };
      cart.totalQty++;
      cart.totalPrice += req.body.price;
    } else {
      cart.items[req.body._id].qty++;
      cart.totalQty++;
      cart.totalPrice += req.body.price;
    }
    return res.json({ totalQty: req.session.cart.totalQty });
  }

  delete(req, res) {
    let cart = req.session.cart;
    const itemId = Object.keys(req.body)[0];
    cart.totalQty -= cart.items[itemId].qty;
    cart.totalPrice -= cart.items[itemId].item.price * cart.items[itemId].qty;
    delete cart.items[itemId];
    return res.json({
      totalQty: req.session.cart.totalQty ? req.session.cart.totalQty : 0,
    });
  }
}

module.exports = new CartController();
