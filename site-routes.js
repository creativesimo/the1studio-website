(function () {
  var desktopSections = ["#apps", "#desktop-apps", "#namethatfile", "#image-resizer", "#image-optimizer"];
  function routeLegacyUrl() {
    var path = location.pathname;
    if (path === "/home.html" || /^\/(lander|index\.php|home)\/?$/i.test(path)) {
      location.replace("/" + location.search + location.hash);
    } else if ((path === "/" || path === "/index.html") && desktopSections.includes(location.hash)) {
      location.replace("/desktop-apps.html" + location.search + location.hash);
    }
  }
  window.addEventListener("hashchange", routeLegacyUrl);
  routeLegacyUrl();
})();
