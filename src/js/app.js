import axios from "axios";
import Noty from "noty";
import { initAdmin } from "./admin";
import { updateStatus } from "./update-status";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCouter = document.querySelector("#cartCouter");
let deleteCartButton = document.querySelectorAll("#deleteCartButton");

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
      console.log(err);
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
    .then(() => {
      window.location.assign("/cart");
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

updateStatus();
