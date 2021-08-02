let statuses = document.querySelectorAll(".status-line");
let hiddenInput = document.querySelector("#hiddenInput");

export function updateStatus() {
  let order = hiddenInput ? hiddenInput.value : null;
  order = JSON.parse(order);

  let stepCompleted = true;
  statuses.forEach((status) => {
    let dataProp = status.dataset.status;

    if (stepCompleted) {
      status.classList.add("step-completed");
    }

    if (dataProp === order.status) {
      stepCompleted = false;
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add("current");
      }
    }
  });
}
