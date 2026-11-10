// "Copy" buttons (the support page's email address): copying works even without a mail app.
// The address isn't written on the page, so older browsers fall back to a hidden text box.
document.querySelectorAll("button[data-copy]").forEach(function (button) {
  var original = button.textContent;
  var oldWay = function (text) {
    var box = document.createElement("textarea");
    box.value = text; box.setAttribute("readonly", ""); box.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(box); box.select();
    var ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
    box.remove(); return ok;
  };
  button.addEventListener("click", function () {
    var text = button.dataset.copy;
    var done = function (label) { button.textContent = label; setTimeout(function () { button.textContent = original; }, 2500); };
    var fallback = function () { done(oldWay(text) ? "Copied!" : "Use Email us instead"); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { done("Copied!"); }, fallback);
    else fallback();
  });
});

// "Coming soon" store buttons: until an app is live in a store, its button opens this note.
// When an app is approved, replace its <button class="store"> with a link to the store page.
(function () {
  var dialog = document.getElementById("soon");
  if (!dialog || typeof dialog.showModal !== "function") return;
  var isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  var keys = isMac ? "⌘ + D" : "Ctrl + D";
  document.getElementById("soon-keys").textContent = keys;
  // Phones and tablets have no bookmark shortcut, so there the button opens the share sheet.
  var touch = window.matchMedia("(pointer: coarse)").matches;
  var share = touch && typeof navigator.share === "function";
  if (touch) document.getElementById("soon-how").textContent =
    share ? "Tap the button below to save or share it." : "Use your browser’s menu to bookmark it.";
  var label = document.getElementById("soon-bookmark-label");

  // Websites can't add bookmarks themselves, so "Save this page" shares the link on phones,
  // and otherwise copies it (on computers, with the bookmark shortcut).
  document.getElementById("soon-bookmark").addEventListener("click", function () {
    var url = location.href.split("#")[0];
    if (share) { navigator.share({ title: document.title, url: url }).catch(function () {}); return; }
    var copied = touch ? "Link copied!" : "Link copied! Press " + keys + " to bookmark";
    var hint = function () { label.textContent = touch ? "Use your browser’s menu to bookmark" : "Now press " + keys + " to bookmark"; };
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { label.textContent = copied; }, hint);
    else hint();
  });
  var icons = { "NameThatFile": "namethatfile", "Image Resizer": "image-resizer", "Image Optimizer": "image-optimizer" };

  document.querySelectorAll("button.store[data-app]").forEach(function (button) {
    button.addEventListener("click", function () {
      var app = button.dataset.app;
      var mac = button.dataset.store === "mac";
      var store = mac ? "the Mac App Store" : "the Microsoft Store";
      var maker = mac ? "Apple" : "Microsoft";
      document.getElementById("soon-img").src = "assets/" + icons[app] + "-icon.png";
      document.getElementById("soon-title").textContent = app + " is almost here!";
      document.getElementById("soon-text").textContent =
        "We’re finishing the last steps with " + maker + " so you can get " + app + " for " + (mac ? "Mac" : "Windows") +
        " from " + store + ". It’s coming very soon, and this button will take you straight to the download.";
      label.textContent = "Save this page";
      dialog.showModal();
    });
  });
  // Clicking outside the note closes it.
  dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
})();
