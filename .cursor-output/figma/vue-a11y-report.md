# Vue Accessibility Report

## Source

Reviewed files:

```txt
src/App.vue
src/components/layout/SiteHeader.vue
src/components/layout/SiteFooter.vue
src/components/HelloWorld.vue (unused starter — not in render tree)
src/sections/HeroSection.vue
src/sections/MenuSection.vue
src/sections/PhilosophySection.vue
src/sections/TheArtSection.vue
src/sections/ShowcaseSection.vue
src/sections/CocktailCarouselSection.vue
src/sections/ContactSection.vue
```

## Status

Completed

## Project Detection

- Vue detected: Yes (`vue` ^3.5.34)
- Vue Router detected: No
- Tailwind detected: Yes (`tailwindcss` ^4.3.0, `sr-only` utilities available)

## Fixes Applied

| File                          | Fix                                                                                                                                                                                                                        |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SiteHeader.vue`              | Implemented mobile menu with `isMenuOpen` state; dynamic `:aria-expanded`; `id="mobile-menu"` panel; dynamic open/close `aria-label`; nav closes on link click; removed redundant logo `aria-label` (visible text present) |
| `MenuSection.vue`             | Removed duplicate `sr-only` h2 headings; moved `id` attributes to visible column h2 elements                                                                                                                               |
| `CocktailCarouselSection.vue` | Added all 4 `tabpanel` elements matching `aria-controls`; added `tabindex` roving pattern for tabs; removed redundant `aria-label` on prev/next buttons (visible text provides name)                                       |
| `HeroSection.vue`             | Wrapped scroll arrow in `<span aria-hidden="true">`                                                                                                                                                                        |
| `ContactSection.vue`          | Wrapped store address in semantic `<address>`; added `target="_blank"` + `rel="noopener noreferrer"` on external social links                                                                                              |
| `PhilosophySection.vue`       | Added `role="group"` to rating block; marked decorative star icons `aria-hidden`                                                                                                                                           |

**Total fixes: 11 across 6 files**

## App Layout

- Skip link → `#main-content` ✓
- `<main id="main-content">` ✓
- `SiteHeader` before main, `SiteFooter` after main ✓
- Single-page layout (no `RouterView`) ✓
- `html lang="en"` in `index.html` ✓

## Heading Structure

| Level | Elements                                                                    |
| ----- | --------------------------------------------------------------------------- |
| h1    | `hero-title` — one per page ✓                                               |
| h2    | Menu columns (×2), Philosophy, The Art, Showcase, Carousel recipe, Contact  |
| h3    | Menu items, Philosophy feature card, Contact subsections, Carousel subtitle |

**Notes:**

- Menu section intentionally has two h2 column headings (not a hierarchy skip).
- The Art section h2 appears after figure and lists in DOM order — reported for manual review.
- Showcase (`#showcase`) has h2 but is not linked from main nav.

## Sections and Labels

| Section    | id           | aria-labelledby         | Heading id exists |
| ---------- | ------------ | ----------------------- | ----------------- |
| Hero       | `hero`       | `hero-title`            | ✓                 |
| Menu       | `menu`       | `menu-title-left`       | ✓                 |
| Philosophy | `philosophy` | `philosophy-title`      | ✓                 |
| The Art    | `the-art`    | `the-art-subtitle`      | ✓                 |
| Showcase   | `showcase`   | `showcase-title`        | ✓                 |
| Carousel   | `carousel`   | `carousel-recipe-title` | ✓                 |
| Contact    | `contact`    | `contact-title`         | ✓                 |

Sub-regions:

- Menu columns use `aria-labelledby` on column wrappers ✓
- Philosophy feature card uses `aria-labelledby="philosophy-feature-title"` ✓

## Navigation

- Desktop nav: `<nav aria-label="Main navigation">` with `ul > li > a` ✓
- Mobile nav: `<nav id="mobile-menu" aria-label="Mobile navigation">` ✓
- Anchor links: `#menu`, `#philosophy`, `#the-art`, `#contact` ✓
- Logo link uses visible text “Velvet Pour” ✓

## RouterLink / Links

- No Vue Router — all navigation uses native `<a href="#...">` ✓
- No `href="#"` fake links found ✓
- `tel:` and `mailto:` links in Contact section ✓
- External social links now open in new tab with `rel="noopener noreferrer"` ✓

## Buttons

- All UI buttons use `type="button"` ✓
- Carousel tabs use `role="tab"` with `aria-selected` ✓
- Prev/next carousel buttons use visible text labels ✓
- Mobile menu toggle is a real `<button>` ✓

## Mobile Menu

- Burger/menu button with dynamic `:aria-expanded` ✓
- `aria-controls="mobile-menu"` ✓
- Panel `id="mobile-menu"` exists ✓
- Panel uses `:hidden="!isMenuOpen"` ✓
- Panel contains real anchor links ✓
- Menu closes when a link is clicked ✓

**Not implemented (manual review):** focus trap, escape-to-close, focus return to toggle button.

## Images

| Category                   | Status                                                         |
| -------------------------- | -------------------------------------------------------------- |
| Hero LCP image             | Descriptive alt, `fetchpriority="high"`, no `loading="lazy"` ✓ |
| Content images             | Descriptive alt where meaningful ✓                             |
| Decorative images          | `alt=""` + `aria-hidden="true"` ✓                              |
| Icons in checklists/social | `alt=""` + `aria-hidden="true"` ✓                              |
| width/height               | Present on reviewed images ✓                                   |
| decoding="async"           | Present on reviewed images ✓                                   |

No alt text invented for unclear images.

## Picture Elements

- All `<picture>` blocks include WebP `<source>` + fallback `<img>` ✓
- `alt` on `<img>` only (not on `<source>`) ✓
- `type="image/webp"` on sources ✓

## Forms

No forms present on the landing page.

## FAQ / Accordion

No FAQ or accordion components present.

## Hidden Content

- Skip link uses `sr-only focus:not-sr-only` ✓
- Decorative wordmarks use `aria-hidden="true"` ✓
- Noise overlays use `aria-hidden="true"` on non-focusable wrappers ✓
- Philosophy avatar chip stack marked `aria-hidden="true"` (decorative) ✓
- No `aria-hidden` on parents containing focusable children ✓

## ARIA References

| Reference                             | Target                                  | Status                     |
| ------------------------------------- | --------------------------------------- | -------------------------- |
| `aria-labelledby` on sections         | Matching heading ids                    | ✓ All valid                |
| `aria-controls` on carousel tabs      | `carousel-panel-0` … `carousel-panel-3` | ✓ Fixed — all panels exist |
| `aria-labelledby` on tabpanels        | `carousel-tab-{n}`                      | ✓                          |
| `aria-controls` on mobile menu button | `mobile-menu`                           | ✓                          |
| `aria-label` on social links          | Icon-only links                         | ✓                          |

**ARIA references checked: 18**

## Duplicate IDs

No duplicate ids found in the rendered page tree.

`HelloWorld.vue` contains ids (`center`, `docs`, `social`) but is not mounted in `App.vue`.

## Build Result

```
npm run build — PASSED (vue-tsc + vite build, 187ms)
```

## Manual Review Needed

1. **The Art heading order** — h2 “Sip-Worthy Perfection” follows figure and lists in DOM; consider moving heading earlier if reading order should match visual hierarchy.
2. **Carousel interactivity** — tabs and prev/next buttons are static; keyboard activation and panel switching not implemented.
3. **Mobile menu focus management** — no focus trap or escape-key close.
4. **Showcase section** — not in header nav; confirm whether it should be discoverable.
5. **Social link URLs** — placeholder external URLs (`instagram.com`, `x.com`, `facebook.com`).
6. **Philosophy rating** — half-star representation not reflected (5 full stars shown for 4.5/5).
7. **Font loading** — display fonts referenced but not loaded; may affect readability.

## Warnings

- Carousel inactive tabpanels contain `sr-only` placeholder text until content is wired.
- Menu section `aria-labelledby` references only the left column heading; right column is a separate labelled region.
- `index.html` title is still generic (`cocktail-landing`) — address in SEO command.
- `HelloWorld.vue` remains in repo as unused Vite starter code.

## Recommended Next Commands

1. `user-add-vue-basic-seo`
2. `user-review-assets-quality`
3. `user-run-web-perf-audit`
