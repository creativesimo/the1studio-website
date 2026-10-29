# minyapps.com

The Minyapps website: a home page and individual pages for NameThatFile, Image Resizer and Image Optimizer, plus the privacy policy and support pages both app stores require.

- Plain HTML and one stylesheet; no build step or external fonts. Optional Google Analytics loads only after a visitor opts in; the apps themselves still have no analytics.
- `index.html`: apps, descriptions, screenshots, store buttons.
- `namethatfile.html`, `image-resizer.html`, `image-optimizer.html`: detailed product pages with truthful features, platform differences, FAQs and coming-soon store buttons.
- `privacy.html`: privacy policy (the apps collect no data).
- `support.html`: help and contact (the Contact link goes to its `#contact` box).
- `terms.html`: terms of use (store licences, 7-day trial, one-time price, refunds through Apple/Microsoft, consumer rights unaffected).
- `assets/`: app icons (256 px) and screenshots, made from the apps' own icons and QA screenshots.

Store buttons say **Coming soon**. Clicking one opens a note (in `site.js`) that asks visitors to save the page and check back. Its **Save this page** button copies the link and shows the bookmark shortcut on computers, and opens the share sheet on phones (websites cannot add bookmarks themselves). When an app is approved, replace its `<button class="store" data-app=… data-store=…>` with an `<a class="store" href="…store page…">`. The support and contact email is wassimdesign@gmail.com for now; it is planned to become support@minyapps.com, forwarded to that Gmail.

Prices on the site: 7-day free trial, then $4.99 once, for each app (decided 27 October 2026).

Hosting: GitHub Pages from the public repo creativesimo/the1studio-website (branch main), live since 27 October 2026 at https://creativesimo.github.io/the1studio-website/. To update: copy this folder into a clone of that repo, commit and push.

Brand: on 28 October 2026 the brand changed from "the1studio" to **Miny** (wordmark `Min<span>y</span><span class="suffix">apps</span>`: "Miny" in ink, "apps" in grey so it reads as mini apps), because the1studio.com was owned by someone else. The owner bought **minyapps.com** at GoDaddy on 28 October 2026.

Domain setup (the `CNAME` file holds `minyapps.com`):
1. The repo's Pages settings use the custom domain minyapps.com, with Enforce HTTPS on (certificate approved 28 October 2026, expires 26 January 2027, renewed by GitHub automatically). The certificate was only issued after the custom domain was removed and added again.
2. GoDaddy DNS (GoDaddy's own nameservers): A records for @ pointing to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, and a CNAME for www pointing to creativesimo.github.io. GoDaddy's default parking records were removed.

## SEO and status (29 October 2026)
- Each page has its own title and description, canonical, Open Graph and Twitter tags (`assets/share-card.png`), and favicons (`favicon.ico`, `assets/favicon-32.png`, `assets/apple-touch-icon.png`, `assets/minyapps-mark-512.png`).
- `index.html` carries JSON-LD (Organization, WebSite and 3 SoftwareApplication).
- `robots.txt` and `sitemap.xml` are in the site root (update `lastmod` when pages change). `404.html` sends old addresses such as `/lander` to the home page.
- The store buttons still say Coming soon. After approval, link them to the store pages (the IDs are in `MINYAPPS-STATUS.md` in the Codex workspace folder (the folder that holds the dated project folders)).
- Status of the whole family: `MINYAPPS-STATUS.md` in the Codex workspace folder (the folder that holds the dated project folders).

## Website analytics (29 October 2026)
- Google Analytics account: Minyapps. Property: Minyapps website. Web stream: Minyapps website (`G-GF8Z1SLR89`). Reporting uses Ireland time and EUR.
- `analytics-config.js` contains only the public measurement ID. `analytics.js` loads the Google tag after explicit analytics consent. Refusing sends no Google analytics requests; the footer’s Privacy settings button lets a visitor change their choice.
- Events cover page views, app demos/details, each app’s Mac/Windows store buttons, saving the page link and contact actions. Current store clicks are labeled `coming_soon`, not downloads or purchases.
- Optional account data sharing and automatic enhanced measurement were disabled. The website sends explicit, limited events and strips URL query strings and fragments from analytics page/referrer values. Advertising personalization and Google signals are disabled in the tag configuration.
- The privacy page explains website analytics separately from the offline apps. See `SEO-ANALYTICS.md` for reporting and verification details.

Google Search Console ownership was verified by HTML tag on 29 October 2026. The seven-URL sitemap was submitted successfully; Google reported **Success** and **7 discovered pages**. The verification tag must remain in the homepage. Live GA4 page-view and store-click collection was confirmed with HTTP 204 responses.

## Favicon and icons (29 October 2026)
- New Minyapps mark: a frosted white "M" on the apps' sky-to-blue gradient (#08c2fb → #0163fb), rounded like the app icons. Generator: `design/make_mark.py` (with the 1024 px master `design/minyapps-mark-1024.png`); the SVG is `favicon.svg`.
- Files: `favicon.ico` (16/32/48), `favicon.svg`, `favicon-48.png`, `assets/favicon-{16,32,48,96,192,512}.png`, `assets/apple-touch-icon.png` (180, square), `assets/maskable-512.png` (Android), `assets/minyapps-mark-512.png` (Organization logo in the JSON-LD) and `site.webmanifest`.
- Every page links them with root paths (`/favicon.ico`, `/favicon.svg?v=2`, 96 and 192 px PNGs, the Apple touch icon and the manifest). Google shows a favicon only when one is a multiple of 48 px and crawlable; after a change it can take days to weeks to appear in results. Request indexing of https://minyapps.com/ in Search Console to speed it up.
