import axios from "axios";
import Noty from "noty";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCouter = document.querySelector("#cartCouter");

function updateCart(pizza) {
  axios
    .post("/update-cart", pizza)
    .then((res, req) => {
      cartCouter.innerText = res.data.totalQty;
      new Noty({
        layout: "centerRight",
        theme: "light",
        type: "success",
        timeout: 1000,
        progressBar: false,
        text: "Item added to cart",
      }).show();
    })
    .catch((err) => {
      new Noty({
        theme: "light",
        type: "error",
        timeout: 1000,
        progressBar: false,
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
