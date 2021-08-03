let statuses = document.querySelectorAll(".status_line");
let hiddenInput = document.querySelector("#hiddenInput");
import moment from "moment";

export function updateStatus() {
  let order = hiddenInput ? hiddenInput.value : null;
  order = JSON.parse(order);
  let time = document.createElement("time");

  let stepCompleted = true;

  statuses.forEach((status) => {
    let dataProp = status.dataset.status;

    if (stepCompleted) {
      status.classList.add("step-completed");
    }

    if (dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format("LLL");
      status.appendChild(time);

      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add("current");
      }
    }
  });
}
