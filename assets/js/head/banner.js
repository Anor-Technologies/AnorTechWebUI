// The section must not be in the banner.js (body) file because it can create a quick flash.

// {{- if site.Params.banner }}
if (localStorage.getItem('{{ site.Params.banner.key | default `banner-closed` }}')) {
  document.documentElement.style.setProperty("--anortechwebui-banner-height", "0px");
  document.documentElement.classList.add("anortechwebui-banner-hidden");
  document.documentElement.dataset.anortechwebuiBanner = "hidden";
} else {
  document.documentElement.dataset.anortechwebuiBanner = "visible";
}
// {{- end }}
