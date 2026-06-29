document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".anortechwebui-alert[data-alert-fold]").forEach(function (alert) {
    const button = alert.querySelector(".anortechwebui-alert-toggle");
    const content = alert.querySelector(".anortechwebui-alert-content");
    if (!button || !content) {
      return;
    }

    const sync = function (open) {
      alert.dataset.alertFold = open ? "+" : "-";
      button.setAttribute("aria-expanded", open ? "true" : "false");
      content.setAttribute("aria-hidden", open ? "false" : "true");
      content.toggleAttribute("inert", !open);
    };

    sync(alert.dataset.alertFold === "+");

    button.addEventListener("click", function () {
      sync(alert.dataset.alertFold !== "+");
    });
  });
});
