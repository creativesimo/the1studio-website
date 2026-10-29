# Search and website measurement

Updated 29 October 2026.

## Search setup

- Canonical site: https://minyapps.com/ . HTTP, www and the GitHub Pages project address redirect to this address.
- Seven public URLs in `sitemap.xml`: the home page, three app-detail pages, support, privacy and terms. `robots.txt` permits crawling and points to the sitemap. The custom 404 remains noindex and returns an HTTP 404 on GitHub Pages.
- Each public page has its own title, description, canonical and sharing metadata. Product pages contain descriptive copy, steps, platform limitations and FAQs. The home page links to them directly.
- JSON-LD describes the organization, website, software and breadcrumbs. It contains no invented ratings or reviews. Purchase offers are omitted until the apps are actually available in stores.
- The homepage’s Google site-verification meta tag must remain in place for Search Console ownership verification. It is a public verification token, not a login credential.
- Google Search Console property: `https://minyapps.com/` (URL-prefix verification; no DNS changes required).
- Verified and submitted on 29 October 2026: Search Console confirmed ownership through the HTML tag, accepted `sitemap.xml` with **Success**, and discovered **7 pages**. Submission does not guarantee indexing, a ranking or a completion date.

## Analytics setup

- Google Analytics account: **Minyapps**.
- Property and web stream: **Minyapps website**. Account ID `413882461`; property ID `561302444`.
- Dashboard: https://analytics.google.com/analytics/web/#/a413882461p561302444/reports/intelligenthome
- Web stream ID: `16225390825`.
- Measurement ID: `G-GF8Z1SLR89` (public).
- Reporting time zone: Ireland. Reporting currency: EUR.
- Optional account data sharing: off. Enhanced measurement: off. App measurement is not configured; this is the website only.
- Advertising consent stays denied. Google signals and advertising personalization are disabled in the website tag configuration.
- Explicit consent is required before the tag loads. No cookieless Google pings are sent before or without consent. Consent choice is kept locally for up to 180 days. Withdrawal disables measurement, deletes this site’s `_ga` cookies and reloads the page without the Google tag. Changes are also respected across open tabs.
- Analytics cookies are configured with a 180-day expiry, without refreshing their expiry on every page view. Event/user-data retention is separate from cookie expiry and is controlled in Google Analytics.
- Page and referrer values exclude query strings and fragments. Events contain predefined app names, platforms and action categories; never email addresses, user-entered text, private files or document contents.

| Event | Meaning | Parameters |
|---|---|---|
| `page_view` | A page visited after consent | `page_title`, `page_path` |
| `store_click` | An app’s Mac or Windows store button clicked | `app_name`, `store`, `availability`, `page_path` |
| `app_demo_click` | A home-page app demo link clicked | `app_name`, `page_path` |
| `app_details_click` | A link to an app’s detail page clicked | `app_name`, `page_path` |
| `save_page_click` | The save/share-page button clicked | `page_path` |
| `contact_click` | An email or copy-email action clicked | `contact_action`, `page_path` |

Store clicks currently have `availability=coming_soon`. These measure interest; they are not downloads, completed bookmarks, trial activations or sales. When approved store buttons become links, keep `data-app` and `data-store` so measurement continues.

## Reading the numbers

- Realtime shows recent consenting visitors and events.
- Pages and screens shows page views; traffic acquisition shows how measured visits arrived.
- Events shows counts for `store_click` and the other actions above. Two event-scoped custom dimensions were registered: **Minyapps app** (`app_name`) and **Store platform** (`store`), for breakdowns by product and Mac/Windows store. Newly registered fields can take time to become available in reports.
- Counts exclude people who decline analytics or block it, and cannot reconstruct visits before installation. Search Console measures Google Search impressions/clicks separately and can take time to populate.

## Verification

Local tests exercise consent, refusal persistence, opt-in after refusal, all six store buttons, app-detail navigation, contact actions, cookie cleanup on withdrawal, sanitized URLs, and mobile layout. Google requests are stubbed during those tests so synthetic traffic is not sent to the live property. Static checks cover titles, canonicals, one H1 per page, JSON-LD, sitemap URLs, anchors and local assets.

Live verification after publishing: the seven URLs/scripts checked matched the tested source. One explicitly approved consenting verification visit and one NameThatFile/Mac store-button click were sent to the production GA4 stream; Google collection responses were HTTP 204. Those actions are included in the initial statistics. Synthetic local consent tests used stubbed Google requests.
