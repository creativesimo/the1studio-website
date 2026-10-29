// Optional website analytics only. No Google code or requests before opt-in.
(function () {
  "use strict";
  var id = window.MINYAPPS_ANALYTICS_ID || "";
  if (!/^G-[A-Z0-9]{6,}$/.test(id)) return;

  var key = "minyapps.analytics-consent.v1";
  var lifetime = 180 * 24 * 60 * 60 * 1000;
  var permitted = false;
  var started = false;
  var previousFocus;
  var apps = {
    "NameThatFile": "namethatfile.html",
    "Image Resizer": "image-resizer.html",
    "Image Optimizer": "image-optimizer.html"
  };

  function readChoice() {
    try {
      var choice = JSON.parse(localStorage.getItem(key));
      if (choice && (choice.value === "granted" || choice.value === "denied") &&
          typeof choice.expires === "number" && choice.expires > Date.now() &&
          choice.expires <= Date.now() + lifetime + 60000) return choice.value;
    } catch (_) { /* Storage can be unavailable; default to no analytics. */ }
    return null;
  }

  function saveChoice(value) {
    try { localStorage.setItem(key, JSON.stringify({ value: value, expires: Date.now() + lifetime })); }
    catch (_) { /* The choice still applies for this page if storage is blocked. */ }
  }

  function removeAnalyticsCookies() {
    document.cookie.split(";").forEach(function (cookie) {
      var name = cookie.split("=")[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      ["", "; domain=" + location.hostname, "; domain=." + location.hostname].forEach(function (domain) {
        document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax" + domain;
      });
    });
  }

  function cleanURL(value) {
    try {
      var url = new URL(value);
      return /^https?:$/.test(url.protocol) ? url.origin + url.pathname : "";
    } catch (_) { return ""; }
  }

  function startAnalytics() {
    permitted = true;
    window["ga-disable-" + id] = false;
    if (started) return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", {
      analytics_storage: "denied", ad_storage: "denied",
      ad_user_data: "denied", ad_personalization: "denied"
    });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", id, {
      send_page_view: false,
      page_location: location.origin + location.pathname,
      page_referrer: cleanURL(document.referrer),
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: "none",
      cookie_expires: lifetime / 1000,
      cookie_update: false,
      cookie_flags: "SameSite=Lax;Secure"
    });
    event("page_view", { page_title: document.title });
    var script = document.createElement("script");
    script.async = true;
    script.referrerPolicy = "strict-origin";
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(script);
  }

  function event(name, parameters) {
    if (!permitted || !window.gtag || window["ga-disable-" + id]) return;
    parameters = parameters || {};
    parameters.page_path = location.pathname;
    window.gtag("event", name, parameters);
  }

  var panel = document.createElement("section");
  panel.className = "analytics-consent";
  panel.hidden = true;
  panel.setAttribute("aria-labelledby", "analytics-consent-title");
  panel.innerHTML = '<div><h2 id="analytics-consent-title">Optional website analytics</h2>' +
    '<p>May we use Google Analytics to count visits and button clicks? It loads only if you allow it. ' +
    'You can change your choice in Privacy settings. <a href="/privacy.html#website-privacy">Privacy policy</a>.</p></div>' +
    '<div class="analytics-consent-actions"><button type="button" data-choice="denied">No thanks</button>' +
    '<button type="button" data-choice="granted">Allow analytics</button></div>';
  document.body.appendChild(panel);

  var settings = document.createElement("button");
  settings.type = "button";
  settings.className = "privacy-settings";
  settings.textContent = "Privacy settings";
  settings.setAttribute("aria-controls", "analytics-consent-title");
  settings.addEventListener("click", function () {
    previousFocus = document.activeElement;
    panel.hidden = false;
    panel.querySelector("button").focus();
  });
  var footerNav = document.querySelector("footer nav");
  if (footerNav) footerNav.appendChild(settings);

  panel.addEventListener("click", function (click) {
    var button = click.target.closest("button[data-choice]");
    if (!button) return;
    var value = button.dataset.choice;
    saveChoice(value);
    panel.hidden = true;
    if (previousFocus) previousFocus.focus();
    if (value === "granted") {
      startAnalytics();
    } else {
      permitted = false;
      window["ga-disable-" + id] = true;
      removeAnalyticsCookies();
      // A fresh document removes the already loaded Google tag after withdrawal.
      if (started) location.reload();
    }
  });

  document.addEventListener("click", function (click) {
    var target = click.target.closest("a, button");
    if (!target) return;
    var app = target.dataset.app;
    var store = target.dataset.store;
    if (Object.prototype.hasOwnProperty.call(apps, app) && (store === "mac" || store === "windows")) {
      event("store_click", {
        app_name: app, store: store,
        availability: target.tagName === "BUTTON" ? "coming_soon" : "available"
      });
      return;
    }
    if (target.id === "soon-bookmark") { event("save_page_click"); return; }
    if (target.matches("button[data-copy]")) { event("contact_click", { contact_action: "copy_email" }); return; }
    var href = target.getAttribute("href") || "";
    if (href.indexOf("mailto:") === 0) { event("contact_click", { contact_action: "email" }); return; }
    if (target.tagName !== "A") return;
    try {
      var url = new URL(href, location.href);
      if (url.origin !== location.origin) return;
      Object.keys(apps).some(function (name) {
        if (url.pathname === "/" + apps[name]) {
          event("app_details_click", { app_name: name });
          return true;
        }
        if (url.hash === "#" + apps[name].replace(".html", "")) {
          event("app_demo_click", { app_name: name });
          return true;
        }
        return false;
      });
    } catch (_) { /* No free-text link addresses are sent to analytics. */ }
  });

  // Another tab's privacy choice must also stop or start measurement here.
  window.addEventListener("storage", function (change) {
    if (change.key !== key && change.key !== null) return;
    var choice = readChoice();
    if (choice === "granted") { panel.hidden = true; startAnalytics(); }
    else {
      permitted = false;
      window["ga-disable-" + id] = true;
      removeAnalyticsCookies();
      if (started) location.reload();
      else panel.hidden = choice === "denied";
    }
  });

  var choice = readChoice();
  if (choice === "granted") startAnalytics();
  else { removeAnalyticsCookies(); panel.hidden = choice === "denied"; }
})();
