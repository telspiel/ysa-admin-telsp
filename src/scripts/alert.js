const alert = require("./../partials/alert.hbs");

class Alert {
  constructor() {
    $("main").prepend(
      $("<div />", {
        id: "alert-box",
        class: "alert-box"
      })
    );
    this.container = $("#alert-box");
  }

  onAlert() {
    clearTimeout(this.clearTimer);
    this.clearTimer = window.setTimeout(() => {
      this.container.empty();
    }, 5000);
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  success(message) {
    this.container.append(
      alert({
        message,
        type: "success"
      })
    );
    this.onAlert();
  }

  error(message) {
    this.container.append(
      alert({
        message,
        type: "danger"
      })
    );
    this.onAlert();
  }

  info(message) {
    this.container.append(
      alert({
        message,
        type: "warning"
      })
    );
    this.onAlert();
  }

  message(message) {
    this.container.empty();
    this.container.append(
      alert({
        message,
        type: "primary"
      })
    );
    this.onAlert();
  }

  clearAll() {
    this.container.empty();
  }

}

export default new Alert();
