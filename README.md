# MoMo Admin — Tailwind CSS Dashboard

**Live demo:** _Add your deployed URL here after deployment._

A responsive fictional mobile-money admin dashboard built with **Tailwind CSS v4, Vite, HTML, and vanilla JavaScript**. All dashboard figures and customer records are illustrative sample data. This project is not connected to a real payment provider.

## Features

- Responsive sidebar with mobile drawer navigation and six menu links
- Top bar with search, notifications, and administrator profile
- Four responsive statistics cards
- Horizontally scrollable transactions table with six sample records
- Paid, Pending, and Failed status badges
- Status filter and transaction search
- Recent activity and transaction-channel breakdown panels
- Customer form with browser validation and demo feedback
- Export visible transaction records as CSV
- Custom emerald brand palette and DM Sans font
- Reusable Tailwind component classes defined with `@apply`
- Hover, focus, and transition states for controls and table rows

## Tech stack

- HTML
- Tailwind CSS v4
- Vite
- Vanilla JavaScript

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed in your terminal.

To build and preview the production version:

```bash
npm run build
npm run preview
```

The production-ready files are generated in `dist/`.

## Responsive checks

Test the page at these viewport widths:

- 375px — mobile
- 768px — tablet
- 1024px — laptop / large breakpoint
- 1440px — desktop

In Chrome or Edge, open DevTools with `F12`, then click the device toolbar icon or press `Ctrl+Shift+M`. Enter the viewport widths above and inspect the layout. Capture screenshots into `screenshots/` if your instructor requires them.

## Tailwind setup notes

Tailwind is installed as a project dependency and compiled by the official Vite plugin. The `@theme` block in `src/style.css` defines the custom brand palette and font. The `@layer components` block contains reusable classes such as `.btn-primary`, `.btn-secondary`, `.panel`, `.stat-card`, `.field-input`, and `.badge`.

## Plain CSS vs Tailwind workflow note

The original landing page built with plain CSS should be saved in `original-css/`. The Tailwind rebuild should be kept as the main Vite app. In the plain-CSS version, styling is mostly written as named selectors and custom declarations in a CSS file. In the Tailwind version, most layout and responsive styling is expressed directly in utility classes in the HTML, while shared patterns are extracted into component classes using `@apply`. Tailwind's build process scans the source and produces the CSS needed for the deployed site. This reduces the need to invent and maintain many one-off CSS selectors, but the markup can become utility-heavy, so consistent component patterns are important.

## Suggested Git workflow

Use meaningful commits and feature branches. Example plan:

1. `chore: scaffold Vite project`
2. `chore: install Tailwind CSS Vite plugin`
3. `feat: configure brand theme and component utilities`
4. `feat: add dashboard shell and responsive sidebar`
5. `feat: add top bar and profile controls`
6. `feat: build responsive statistics cards`
7. `feat: add transactions table and status badges`
8. `feat: add activity and channel panels`
9. `feat: add customer form validation`
10. `feat: add transaction search and CSV export`
11. `docs: document setup and responsive testing`
12. `deploy: prepare static production build`

For a real collaborative-style workflow, create branches and merge them through Pull Requests rather than making every commit directly on `main`. Do not claim Pull Requests were opened unless you actually create them on GitHub.

## Deployment

Build the project with `npm run build`. Deploy the generated `dist/` directory to Netlify or Vercel. The included `base: './'` in `vite.config.js` also makes relative asset paths suitable for many static hosting configurations. After deployment, replace the placeholder live demo line at the top of this README with the actual URL.

## Project structure

```text
week3-tailwind-dashboard/
├── index.html
├── src/
│   ├── main.js
│   └── style.css
├── original-css/
│   └── README.md
├── screenshots/
├── package.json
├── vite.config.js
└── README.md
```

## Important limitations

This is a front-end demo. Search, status filtering, CSV export, and form validation run in the browser. Customer form submissions are not saved to a database and no real payments are initiated.
