# Titan Applications

The single-page site for my company [titan-applications.com](https://titan-applications.com).

A lightweight site built with **Vite + TypeScript** and an "early-2000s desktop" theme (the look is retro; the code is modern).

Hosted on Github pages.

## Develop

```bash
npm install
npm run dev
```

## Build & check

```bash
npm run build
npm run preview
npm run typecheck
```

## How it is structured

| File              | Purpose                                                           |
| ----------------- | ----------------------------------------------------------------- |
| `src/dom.ts`      | Tiny, fully-typed hyperscript helper (`h`) used to build the DOM. |
| `src/content.ts`  | Typed, data-driven site content (`satisfies SiteContent`).        |
| `src/sections.ts` | Pure functions that turn content into each page section.          |
| `src/extras.ts`   | Retro extras: live clock + persisted visitor counter.             |
| `src/main.ts`     | Assembles the app and wires up scroll-spy navigation.             |
| `src/style.css`   | The theme (CSS custom properties, fluid type, grid/flex).         |

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages. The custom domain is kept in `public/CNAME`, which
Vite copies into the build output verbatim.

> One-time setup: in the repository **Settings → Pages**, set **Source** to
> **GitHub Actions**.
