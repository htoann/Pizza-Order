import axios from "axios";
import Noty from "noty";

export function initStripe() {
  const paymentType = document.querySelector("#paymentType");

  // Ajax call
  const paymentForm = document.querySelector("#payment-form");
  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let formData = new FormData(paymentForm);
      let formObject = {};

      for (let [key, value] of formData.entries()) {
        formObject[key] = value;
      }

      axios
        .post("/customer/orders", formObject)
        .then((res) => {
          console.log(res.data.message);
          new Noty({
            layout: "centerRight",
            theme: "light",
            type: "success",
            timeout: 1000,
            text: res.data.message,
          }).show();
          setTimeout(() => {
            window.location.assign("/customer/orders");
          }, 1000);
        })
        .catch((err) => {
          new Noty({
            layout: "centerRight",
            theme: "light",
            type: "error",
            timeout: 1000,
            text: err.res.data.message,
          }).show();
        });
    });
  }
}
