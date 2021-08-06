const { json } = require("express");
const Order = require("../../../models/order");

class CartController {
  index(req, res) {
    res.header("Cache-Control", "no-store");
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
    let itemId = Object.keys(req.body)[0];
    let listItems = cart.items[itemId];

    cart.totalQty -= listItems.qty;
    cart.totalPrice -= listItems.item.price * listItems.qty;
    delete cart.items[itemId];

    if (cart.totalQty == 0) {
      delete req.session.cart;

      return res.redirect("/cart");
    }

    return res.json({
      totalQty: req.session.cart.totalQty,
    });
  }
}

module.exports = new CartController();
