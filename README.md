# the1studio.com

The studio website: one page for the three apps (NameThatFile, Image Resizer, Image Optimizer), plus the privacy policy and support pages both app stores require.

- Plain HTML and one stylesheet; no build step, no cookies, no analytics, no external fonts or scripts.
- `index.html`: apps, descriptions, screenshots, store buttons.
- `privacy.html`: privacy policy (the apps collect no data).
- `support.html`: help and contact.
- `assets/`: app icons (256 px) and screenshots, made from the apps' own icons and QA screenshots.

Store buttons say **Coming soon** until each app is approved. Then replace each disabled `<a class="store" aria-disabled="true">` with a link to the store page. The support and contact email is wassimdesign@gmail.com for now; it is planned to become support@the1studio.com, forwarded to that Gmail.

Prices on the site: 7-day free trial, then $4.99 once, for each app (decided 27 October 2026).

Planned hosting: GitHub Pages, with the GoDaddy domain pointed at it. Not published yet.
