<div align="center">

# Capital Media Partners — Website

**The official website for [Capital Media Partners Limited](https://capitalmediapartners.co.nz/)**

*A New Zealand-based media, marketing, and business advisory company serving 300+ NZ businesses*

[![Live Site](https://img.shields.io/badge/Live%20Site-capitalmediapartners.co.nz-0ea5e9?style=for-the-badge&logo=globe)](https://capitalmediapartners.co.nz/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

</div>

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 6 |
| 3D / WebGL | Three.js · `@react-three/fiber` · `@react-three/drei` |
| Animation | GSAP 3 · Framer Motion 10 |
| Styling | CSS Modules / Tailwind CSS |

## Project Structure

```
├── App.tsx                  # Root app — routing + layout
├── index.tsx                # Entry point
├── index.html               # HTML shell
├── assets.ts                # Centralised asset references
├── metadata.json            # Site metadata (SEO, OG tags)
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json
│
├── components/
│   ├── HomePage.tsx         # Landing / hero page
│   ├── AboutPage.tsx        # Company about page
│   ├── ContactPage.tsx      # Contact form + details
│   ├── CustomCursor.tsx     # Custom animated cursor
│   ├── Magnetic.tsx         # Magnetic hover effect
│   ├── NotFoundPage.tsx     # 404 page
│   ├── PrivacyPolicyPage.tsx
│   ├── TermsConditionsPage.tsx
│   ├── SearchOverlay.tsx    # Full-screen search UI
│   ├── ScrollToTop.tsx      # Scroll restoration helper
│   ├── ThreeCanvas.tsx      # Three.js WebGL canvas wrapper
│   └── services/
│       ├── BusinessAdvisoryPage.tsx
│       ├── InsuranceAdvisoryPage.tsx
│       ├── MarketingPrintMediaPage.tsx
│       └── TechnologyAIPage.tsx
│
├── contexts/
│   └── CursorContext.tsx    # Global cursor state
│
└── utils/
    └── searchData.ts        # Search index / data
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Capital Media Partners |
| `/contact` | Contact |
| `/services/business-advisory` | Business Advisory |
| `/services/insurance-advisory` | Insurance Advisory |
| `/services/marketing-print-media` | Marketing & Print Media |
| `/services/technology-ai` | Technology & AI |
| `/privacy-policy` | Privacy Policy |
| `/terms-conditions` | Terms & Conditions |

## Key Features

- **Immersive 3D hero** — Three.js WebGL canvas with animated scene
- **Custom cursor** — Magnetic hover interactions across all CTAs
- **GSAP scroll animations** — Parallax and reveal effects throughout
- **Framer Motion transitions** — Page-level and component-level animations
- **Cookie consent** — GDPR-compliant banner with accept/decline
- **Booking modal** — Integrated appointment booking flow
- **Excel import/export** — Python-backed data tooling (`/tools`)
- **Full-text search overlay** — Keyboard-navigable site search
- **Fully responsive** — Optimised for mobile, tablet, and desktop

## Deployment

The site is live at **[capitalmediapartners.co.nz](https://capitalmediapartners.co.nz/)**.

To deploy a production build:

```bash
npm run build   # outputs to /dist
```

Upload the `/dist` folder contents to your web server's `public_html` directory.

## Contributing

1. Create a new branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m "feat: description"`
3. Push and open a pull request against `main`

## License

Proprietary — © 2025 Capital Media Partners Limited. All rights reserved.

---

*Built by [Puranjay Gambhir](https://github.com/Puranjay2006)*
