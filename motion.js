// Gentle motion on every page: content below the fold rises into place as it scrolls into view, and the big
// pictures move a little slower than the page (parallax). The page reads the same without it, and nothing
// moves for people who ask their device for reduced motion. Page-to-page fades are in styles.css.
(function () {
  if (!window.matchMedia || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window) || !("requestAnimationFrame" in window)) return;
  var all = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  // 1. Rise in. Only things that start below the screen are hidden, so nothing flickers on load.
  var reveal = all([
    ".apps a", ".promise", ".phone-apps > *", ".app > *",
    ".product-screenshot", ".product-copy > *", ".related-apps",
    ".tt-section > :not(.tt-features)", ".tt-feature", ".tt-end"
  ].join(","));
  var fold = window.innerHeight;
  var waiting = reveal.filter(function (el) { return el.getBoundingClientRect().top > fold * 0.95; });
  waiting.forEach(function (el) { el.classList.add("rv"); });
  var shown = new IntersectionObserver(function (entries) {
    var batch = entries.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; });
    batch.forEach(function (el, i) {
      shown.unobserve(el);
      el.style.setProperty("--rv-delay", Math.min(i, 4) * 0.08 + "s");
      el.classList.add("in");
      // Once settled, hand the element back to its own hover transitions.
      var tidy = function () { el.classList.remove("rv", "in"); el.style.removeProperty("--rv-delay"); };
      setTimeout(tidy, 1100 + Math.min(i, 4) * 80);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  waiting.forEach(function (el) { shown.observe(el); });

  // 2. Parallax on the large pictures: they drift up to ~36px against the scroll.
  var layers = all(".tt-demo, .app .demo, .product-screenshot, .tt-tour");
  if (!layers.length) return;
  var narrow = matchMedia("(max-width: 700px)");
  var visible = new Set();
  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); });
    queue();
  }, { rootMargin: "20% 0px" });
  layers.forEach(function (el) { el.dataset.py = "0"; seen.observe(el); });

  var pending = false;
  function queue() { if (!pending) { pending = true; requestAnimationFrame(update); } }
  function update() {
    pending = false;
    var mid = window.innerHeight / 2, k = narrow.matches ? 0.035 : 0.07, cap = narrow.matches ? 18 : 36;
    visible.forEach(function (el) {
      var shift = parseFloat(el.dataset.py) || 0;
      var r = el.getBoundingClientRect();
      var offset = r.top - shift + r.height / 2 - mid;        // where it would be without the shift
      var next = Math.max(-cap, Math.min(cap, -offset * k));
      if (Math.abs(next - shift) < 0.1) return;
      el.dataset.py = next.toFixed(2);
      el.style.translate = "0 " + next.toFixed(2) + "px";
    });
  }
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue, { passive: true });
  queue();
})();
