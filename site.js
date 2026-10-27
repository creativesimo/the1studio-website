// "Coming soon" store buttons: until an app is live in a store, its button opens this note.
// When an app is approved, replace its <button class="store"> with a link to the store page.
(function () {
  var dialog = document.getElementById("soon");
  if (!dialog || typeof dialog.showModal !== "function") return;
  var isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  document.getElementById("soon-keys").textContent = isMac ? "⌘ + D" : "Ctrl + D";
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
      document.getElementById("soon-mail").href = "mailto:wassimdesign@gmail.com?subject=" +
        encodeURIComponent("Tell me when " + app + " for " + (mac ? "Mac" : "Windows") + " is ready");
      dialog.showModal();
    });
  });
  // Clicking outside the note closes it.
  dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
})();
