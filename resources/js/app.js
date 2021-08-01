import axios from "axios";
import Noty from "noty";
import { initAdmin } from "./admin";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCouter = document.querySelector("#cartCouter");
let deleteCartButton = document.querySelectorAll("#deleteCartButton");
let cancelOrderButton = document.querySelectorAll("#cancelOrderButton");

function updateCart(pizza) {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      cartCouter.innerText = res.data.totalQty;
      new Noty({
        layout: "centerRight",
        theme: "light",
        type: "success",
        timeout: 1000,
        progressBar: false,
        text: "Item added to cart",
        // modal: true,
        killer: true,
      }).show();
    })
    .catch((err) => {
      new Noty({
        layout: "centerRight",
        theme: "light",
        type: "error",
        timeout: 1000,
        text: "Something went wrong",
      }).show();
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});

let adminAreaPath = window.location.pathname;
if (adminAreaPath.includes("admin")) {
  initAdmin();
}

// Delete items in cart
function deleteItem(pizza) {
  axios
    .post("/delete-cart", pizza)
    .then((res) => {
      window.location.assign("/cart");
      cartCouter.innerText = res.data.totalQty;
    })
    .catch((err) => {
      console.log(err);
    });
}

deleteCartButton.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = btn.getAttribute("data-pizza-id");
    deleteItem(pizza);
  });
});

// Cancel Orders
function cancelOrder(pizza) {
  axios
    .post("/cancel-order", pizza)
    .then(() => {
      window.location.assign("/customer/orders");
    })
    .catch((err) => {
      console.log(err);
    });
}

cancelOrderButton.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = btn.getAttribute("data-pizza-id");
    cancelOrder(pizza);
  });
});
