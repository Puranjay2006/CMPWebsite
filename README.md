# Capital Media Partners

Website for Capital Media Partners Limited, a New Zealand marketing and advertising company promoting 300+ NZ businesses.

**Live site:** [capitalmediapartners.co.nz](https://capitalmediapartners.co.nz)

## Stack

No build step. No bundler. The site is plain HTML, CSS, and JavaScript served directly from cPanel/Apache.

| Layer | Technology |
|---|---|
| Markup | HTML5 semantic elements |
| Styling | CSS3 custom properties, Tailwind CSS via CDN |
| Icons | Font Awesome via CDN |
| JavaScript | Vanilla JS (ES6+), IIFE module pattern |
| Hosting | cPanel, Apache (.htaccess) |

## Project structure

```
index.html              # home page
about.html
contact.html
pages/
  services/             # individual service pages
  clients/              # client portfolio pages
js/
  components.js         # ComponentLoader (header/footer injection)
  booking-modal.js      # booking form modal
  easter-egg.js         # typed sequence easter egg
  cookie-consent.js     # GDPR cookie banner
css/
  styles.css            # global styles and CSS custom properties
sitemap.xml
robots.txt
```

## Component system

`js/components.js` defines a `ComponentLoader` class that injects the shared header and footer into every page. It detects the current URL depth to compute the correct base path for assets and links - this solves the relative-path problem across pages living at three different folder depths (root, `pages/`, and `pages/services/`).

## Notable details

- **Booking modal** - `js/booking-modal.js` is an IIFE that injects a modal into the document body and exposes `openBookingModal()` and `closeBookingModal()` as global functions, so any page can trigger the booking form with a single call
- **Easter egg** - `js/easter-egg.js` listens for the typed sequences "seen", "trusted", and "remembered" and stores found sequences in localStorage
- **SEO** - Open Graph tags, Twitter Card meta, Schema.org JSON-LD structured data, `sitemap.xml`, and `robots.txt`
- **Cookie consent** - GDPR-compliant banner with localStorage persistence

## Running locally

```bash
npx serve .
# or
python -m http.server
```

Open `http://localhost:3000` (or whatever port the server uses). The `ComponentLoader` class relies on `window.location` to detect URL depth, so it only works correctly when served over HTTP, not opened as a `file://` URL.
