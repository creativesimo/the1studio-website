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
