// {{- if site.Params.banner }}
(function () {
  const banner = document.querySelector(".anortechwebui-banner")
  document.documentElement.style.setProperty("--anortechwebui-banner-height", banner.clientHeight+"px");

  const closeBtn = banner.querySelector(".anortechwebui-banner-close-button");

  closeBtn.addEventListener("click", () => {
    document.documentElement.classList.add("anortechwebui-banner-hidden");
    document.documentElement.style.setProperty("--anortechwebui-banner-height", "0px");
    document.documentElement.dataset.anortechwebuiBanner = "hidden";

    localStorage.setItem('{{ site.Params.banner.key | default `banner-closed` }}', "0");
  });
})();
// {{- end -}}
