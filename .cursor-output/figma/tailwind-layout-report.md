# Tailwind Layout Report

## Source

Vue skeleton report:

```txt
.cursor-output/figma/vue-tailwind-skeleton-report.md
```

Design tokens:

```txt
.cursor-output/figma/design-tokens.json
.cursor-output/figma/design-tokens.css
```

## Status

Completed

## Project Detection

- Vue detected: Yes (`vue` ^3.5.34)
- Tailwind detected: Yes (`tailwindcss` ^4.3.0, `@tailwindcss/vite` ^4.3.0, `@import "tailwindcss"` in `src/styles/main.css`)
- Vite detected: Yes (`vite` ^8.0.12)

## Theme Files

- main.css: Updated — imports Tailwind + `theme.css`, base body styles, skip-link moved to Tailwind utilities in `App.vue`
- theme.css: Created — semantic `@theme` tokens mapped from inferred Figma values

## Theme Tokens Added

### Colors

- `--color-background` (#000000)
- `--color-foreground` (#ffffff)
- `--color-muted` (#efefef)
- `--color-muted-subtle` (#898989)
- `--color-display` (#505050)
- `--color-surface` (#ffffff)
- `--color-surface-muted` (#313131)
- `--color-surface-dark` (#0f0f0f)
- `--color-accent` / `--color-primary` (#e7d393)
- `--color-accent-badge` (#b2b6f4)
- `--color-primary-foreground` (#000000)
- `--color-border` (white 12% opacity)

### Typography

- `--font-sans` — Mona Sans stack
- `--font-display` — Modern Negra Demo stack

### Spacing

- `--spacing-section` (6rem)
- `--spacing-container` (5rem)

### Radius

- `--radius-card` (1.25rem / 20px)
- `--radius-panel` (0.75rem / 12px)
- `--radius-button` (9999px)
- `--radius-pill` (3.125rem / 50px)

### Shadows

- None added — design uses gradients and noise overlay instead of box shadows

### Background Images

- `--background-image-section-radial` → `bg-section-radial`
- `--background-image-card-gradient` → `bg-card-gradient`
- `--background-image-display-text` → `bg-display-text` (MOJITO gradient text)

## Files Updated

| File                                       | Changes                                              |
| ------------------------------------------ | ---------------------------------------------------- |
| `src/styles/theme.css`                     | Created — full `@theme` token map                    |
| `src/styles/main.css`                      | Imports theme, base body styles                      |
| `src/App.vue`                              | Page wrapper, Tailwind skip link                     |
| `src/components/layout/SiteHeader.vue`     | Sticky header, nav, mobile menu button               |
| `src/components/layout/SiteFooter.vue`     | Border-top footer                                    |
| `src/sections/HeroSection.vue`             | Hero grid, display wordmark, CTA, decorative leaves  |
| `src/sections/MenuSection.vue`             | Three-column menu layout                             |
| `src/sections/PhilosophySection.vue`       | Badge, rating, bento grid, feature card              |
| `src/sections/TheArtSection.vue`           | Circular figure, checklist columns, display wordmark |
| `src/sections/ShowcaseSection.vue`         | Bartender image, floating cocktails                  |
| `src/sections/CocktailCarouselSection.vue` | Tab list, drink image, recipe panel                  |
| `src/sections/ContactSection.vue`          | Contact grid, social links, footer image             |

**Total files updated: 12**

## Sections Styled

1. Hero (`#hero`)
2. Menu (`#menu`)
3. Philosophy (`#philosophy`)
4. The Art (`#the-art`)
5. Showcase (`#showcase`)
6. Cocktail Carousel (`#carousel`)
7. Contact (`#contact`)

Plus layout: `SiteHeader`, `SiteFooter`, `App.vue` wrapper.

## Repeated Tailwind Patterns Found

Patterns to consider extracting in `user-extract-vue-reusable-components`:

1. **Section shell** — `relative overflow-hidden bg-section-radial py-16 md:py-24`
2. **Noise overlay** — `pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-30` + full-cover image
3. **Content container** — `relative z-10 mx-auto max-w-[1260px] px-5 lg:px-20`
4. **Section heading** — `font-display text-4xl font-normal leading-[0.9] tracking-tight text-foreground sm:text-5xl lg:text-[64px]`
5. **Accent label** — `font-display text-xl text-accent`
6. **Body copy** — `text-base leading-7 text-muted sm:text-lg lg:leading-8`
7. **Primary CTA** — `inline-flex items-center justify-center rounded-button bg-surface px-8 py-3 text-base font-semibold text-primary-foreground`
8. **Checklist row** — `flex items-center gap-2.5` + icon + `text-base leading-6 text-muted`
9. **Decorative monstera leaf** — `pointer-events-none absolute … z-0 hidden opacity-50 lg:block`
10. **Display wordmark** — large `font-display` centered absolute text (MOJITO / The ART)
11. **Bento card figure** — `overflow-hidden rounded-card` + `object-cover` image
12. **Feature gradient card** — `rounded-card bg-card-gradient p-8`
13. **Pill badge** — `rounded-pill bg-surface px-5 py-2 text-sm font-medium text-primary-foreground`
14. **Social icon link** — `inline-flex size-10 items-center justify-center rounded-full border border-border`

## Build Result

```
npm run build — PASSED (vue-tsc + vite build, 197ms)
```

Output: `dist/assets/index-YcySRsp3.css` (23.87 kB)

## Manual Review Needed

- **Fonts**: Modern Negra Demo and Mona Sans are referenced but not loaded — browser will fall back to system/serif stacks until webfonts are added
- **The ART mask**: Circular `rounded-full` used as first-pass substitute; `art-section-mask.png` composition still TODO
- **Hero MOJITO wordmark**: Responsive sizing approximated; desktop 330px / mobile 132px from tokens
- **Absolute decorative positioning**: Monstera leaves and floating cocktails use approximate offsets — may need fine-tuning against Figma
- **Menu section**: Visible column titles added (header kept `sr-only` for a11y IDs); verify heading hierarchy
- **Carousel**: Static tab state only; prev/next buttons hidden on mobile
- **Mobile nav**: Header menu button is visual only — no panel yet

## Warnings

- All color/typography tokens are **inferred** from Figma — not official Figma variables
- Figma copy issues preserved (wine names in cocktails, Margarita text on Raspberry Mojito)
- `noise-texture.webp` is ~1.3 MB — performance concern for production
- Some bento images are low resolution per assets quality report
- Custom max-width `1260px` and Figma-specific pixel sizes used where Tailwind defaults were insufficient

## Recommended Next Commands

1. `user-extract-vue-reusable-components`
2. `user-add-a11y-attributes`
3. `user-add-basic-seo`
