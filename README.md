# Cocktail Landing

A Vue 3 landing page starter for building a cocktail-themed marketing site with semantic structure, Tailwind styling, and GSAP-ready animation hooks.

**Demo:** [cocktail-landing.marina-sirenko1-80f.workers.dev](https://cocktail-landing.marina-sirenko1-80f.workers.dev)

## Stack

- Vue 3 / TypeScript
- Vite
- GSAP
- Tailwind CSS
- Cloudflare Workers Static Assets

## Features

- Semantic HTML structure (`header`, `main`, `footer`)
- Accessible base structure with skip link and landmark regions
- Layout components (`SiteHeader`, `SiteFooter`) using the Composition API
- Tailwind CSS with project-level theme tokens
- GSAP installed and ready for motion and scroll animations
- Production build verified (`vue-tsc` + Vite)

## Project Structure

```txt
src/
  assets/
    images/
    icons/
    fonts/
  components/
    layout/
      SiteHeader.vue
      SiteFooter.vue
    ui/
  composables/
  sections/
  styles/
    main.css
  App.vue
  main.ts
```

Landing sections belong in `src/sections/` and are composed inside `App.vue`.

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` by default.

## Build

```bash
npm run build
```

Runs TypeScript checks and outputs a static site to `dist/`.

## Preview

```bash
npm run preview
```

Serves the production build locally for a final check before deployment.

## Deployment

This project is deployed to Cloudflare Workers Static Assets.

### Production URL

[View deployed site](https://cocktail-landing.marina-sirenko1-80f.workers.dev)

### Deploy command

```bash
npm run deploy
```

### Local Cloudflare preview

```bash
npm run dev:cf
```

### Routing

SPA fallback is not enabled. This is expected for simple static landing pages or projects without a client-side router.

### Performance audit

After deployment, run:

```txt
user-run-web-perf-audit https://cocktail-landing.marina-sirenko1-80f.workers.dev
```

## Accessibility Notes

- Semantic page structure with header, main, and footer landmarks
- Skip link to main content (`#main-content`)
- Navigation uses `aria-label` for screen readers
- Use a proper heading hierarchy as sections are added
- Respect `prefers-reduced-motion` when implementing GSAP animations

## Performance Notes

- Static Vite build for fast delivery on edge hosting
- Place images under `src/assets/images/` and optimize before adding to the page
- Prefer lazy-loaded images for below-the-fold content
- Run `npm run build` before deployment to catch TypeScript and build errors early

## AI-assisted workflow

This project uses an AI-assisted development workflow.

See [AGENT.md](./AGENT.md) for details.

## Credits

Add design or reference credits here when the landing page is based on external work.
