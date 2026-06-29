// Script for filetree shortcode collapsing/expanding folders used in the theme
// ======================================================================
document.addEventListener("DOMContentLoaded", function () {
  const folders = document.querySelectorAll(".anortechwebui-filetree-folder");
  folders.forEach(function (folder) {
    folder.addEventListener("click", function () {
      Array.from(folder.children).forEach(function (el) {
        el.dataset.state = el.dataset.state === "open" ? "closed" : "open";
      });
      var newState = folder.nextElementSibling.dataset.state === "open" ? "closed" : "open";
      folder.nextElementSibling.dataset.state = newState;
      folder.setAttribute('aria-expanded', newState === 'open' ? 'true' : 'false');
    });
  });
});
