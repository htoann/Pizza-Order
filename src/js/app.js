import axios from "axios";
import Noty from "noty";
import moment from "moment-timezone";
import { initAdmin } from "./admin";
import { updateStatus } from "./update-status";
import { initStripe } from "./stripe";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCouter = document.querySelector("#cartCouter");
let deleteCartButton = document.querySelectorAll("#deleteCartButton");

let hiddenInput = document.querySelector("#hiddenInput");
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);

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
        text: "Item added to cart",
        progressBar: false,
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

updateStatus(order);

initStripe();

// Socket
let socket = io();
// Join socket
if (order) {
  socket.emit("join", `order_${order._id}`);
}

let adminAreaPath = window.location.pathname;
if (adminAreaPath.includes("admin")) {
  initAdmin(socket);
  socket.emit("join", "adminRoom");
}

socket.on("orderUpdated", (data) => {
  const updatedOrder = { ...order };
  updatedOrder.updatedAt = moment().tz("Asia/Ho_Chi_Minh").format("LLL");
  updatedOrder.status = data.status;
  updateStatus(updatedOrder);
  new Noty({
    layout: "centerRight",
    theme: "light",
    type: "success",
    timeout: 1000,
    text: "Order updated",
  }).show();
});
