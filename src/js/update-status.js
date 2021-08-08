let statuses = document.querySelectorAll(".status_line");
import moment from "moment-timezone";

export function updateStatus(order) {
  let time = document.createElement("time");
  let stepCompleted = true;

  statuses.forEach((status) => {
    status.classList.remove("step-completed");
    status.classList.remove("current");
  });

  statuses.forEach((status) => {
    let dataProp = status.dataset.status;

    if (stepCompleted) {
      status.classList.add("step-completed");
    }

    if (dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt)
        .tz("Asia/Ho_Chi_Minh")
        .format("LLL");
      status.appendChild(time);

      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add("current");
      }
    }
  });
}
