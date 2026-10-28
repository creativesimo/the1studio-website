# minyapps.com

The Miny website: one page for the three apps (NameThatFile, Image Resizer, Image Optimizer), plus the privacy policy and support pages both app stores require.

- Plain HTML and one stylesheet; no build step, no cookies, no analytics, no external fonts or scripts.
- `index.html`: apps, descriptions, screenshots, store buttons.
- `privacy.html`: privacy policy (the apps collect no data).
- `support.html`: help and contact.
- `assets/`: app icons (256 px) and screenshots, made from the apps' own icons and QA screenshots.

Store buttons say **Coming soon**. Clicking one opens a note (in `site.js`) that asks visitors to save the page and check back. Its **Save this page** button copies the link and shows the bookmark shortcut on computers, and opens the share sheet on phones (websites cannot add bookmarks themselves). When an app is approved, replace its `<button class="store" data-app=… data-store=…>` with an `<a class="store" href="…store page…">`. The support and contact email is wassimdesign@gmail.com for now; it is planned to become support@minyapps.com, forwarded to that Gmail.

Prices on the site: 7-day free trial, then $4.99 once, for each app (decided 27 October 2026).

Hosting: GitHub Pages from the public repo creativesimo/the1studio-website (branch main), live since 27 October 2026 at https://creativesimo.github.io/the1studio-website/. To update: copy this folder into a clone of that repo, commit and push.

Brand: on 28 October 2026 the brand changed from "the1studio" to **Miny** (wordmark `Min<span>y</span><span class="suffix">apps</span>`: "Miny" in ink with a blue y, "apps" in light grey so it reads as mini apps), because the1studio.com was owned by someone else. The owner bought **minyapps.com** at GoDaddy on 28 October 2026.

Domain setup (the `CNAME` file holds `minyapps.com`):
1. The repo's Pages settings use the custom domain minyapps.com, with Enforce HTTPS on.
2. GoDaddy DNS (GoDaddy's own nameservers): A records for @ pointing to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, and a CNAME for www pointing to creativesimo.github.io. GoDaddy's default parking records were removed.
