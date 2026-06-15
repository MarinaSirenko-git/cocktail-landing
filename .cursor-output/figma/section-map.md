# Figma Section Map

## Target

Figma source: [Cocktail GSAP Website (Copy) — Desktop](https://www.figma.com/design/MmNz1rHoj2PGzFqT6309PX/Cocktail-GSAP-Website--Copy-?node-id=42001-1163)

- **Node:** `42001:1163` — `Desktop` (1440 × 6697 px)
- **Based on:** `figma-audit.md`, `design-tokens.json`, `assets-manifest.json`

## Generation Status

**Completed**

## Page Overview

| Property              | Value                                      |
| --------------------- | ------------------------------------------ |
| **Page name**         | Velvet Pour Landing                        |
| **Type**              | Single-page marketing landing              |
| **Vue entry**         | `src/App.vue` → `<main id="main-content">` |
| **Section directory** | `src/sections/`                            |
| **Only h1**           | Hero — “Sip the Spirit of Summer”          |

### Scroll anchor map

| Nav label | Section ID    |
| --------- | ------------- |
| Cocktails | `#menu`       |
| About Us  | `#philosophy` |
| The Art   | `#the-art`    |
| Contact   | `#contact`    |

## Detected Sections

### 1. Hero

- **BEM block:** `hero`
- **Vue component:** `HeroSection.vue`
- **HTML tag:** `<section id="hero">`
- **Heading:** `h1` — “Sip the Spirit of Summer” (`#hero-title`)
- **Main elements:** decorative MOJITO display, eyebrow, title, description, CTA link, cocktail figure, scroll indicator, noise overlay, 2× monstera leaves
- **Repeated items:** decorative leaves (2)
- **Related assets:** `hero-cocktail-mojito.webp`, `decorative-monstera-leaf.webp`, `noise-texture.webp`
- **Accessibility notes:** MOJITO is decorative (not a heading); CTA must be `<a href="#menu">`; one h1 only
- **Layout notes:** layered absolute composition; `mix-blend-lighten` on cocktail; GSAP parallax on leaves
- **Responsive notes:** mobile Hero frame `42001:1366` stacks nav; clamp display type 330px → 132px
- **Risks:** Figma header embedded here — reconcile with existing `SiteHeader.vue`

### 2. Menu

- **BEM block:** `menu`
- **Vue component:** `MenuSection.vue`
- **HTML tag:** `<section id="menu">`
- **Heading:** `h2` × 2 — column labels (“Most popular cocktails”, “Most loved mocktails”)
- **Main elements:** two columns, center cocktail figure, noise overlay
- **Repeated items:** `menu__item` × 8 (`ul > li` with name, meta, price)
- **Related assets:** `menu-cocktail-center.webp`, monstera, noise
- **Accessibility notes:** semantic lists; prices readable; meaningful alt on center image
- **Layout notes:** two-column flex/grid with overlapping center visual
- **Responsive notes:** stack columns on mobile
- **Risks:** Figma copy uses wine/beer names — normalize to cocktails

### 3. Philosophy and Bento Gallery

- **BEM block:** `philosophy`
- **Vue component:** `PhilosophySection.vue`
- **HTML tag:** `<section id="philosophy">`
- **Heading:** `h2` — “Where every detail matters—from muddle to garnish”
- **Main elements:** badge pill, intro, rating block, avatar stack, bento grid, feature checklist card
- **Repeated items:** checklist items (4), bento cards (4), star icons (5)
- **Related assets:** bento images × 4, avatars × 3, `icon-star.svg`, `icon-check.svg`
- **Accessibility notes:** rating text + decorative stars; meaningful bento alts
- **Layout notes:** CSS Grid bento with asymmetric card sizes
- **Responsive notes:** single-column bento on mobile
- **Risks:** two bento exports are very low resolution

### 4. The Art

- **BEM block:** `the-art`
- **Vue component:** `TheArtSection.vue`
- **HTML tag:** `<section id="the-art">`
- **Heading:** `h2` — “Sip-Worthy Perfection” (accessible title); “The ART” is decorative display
- **Main elements:** masked circular visual, dual checklist columns, noise overlay
- **Repeated items:** checklist items × 8
- **Related assets:** `art-section-mask.png`, `bartender-photo.webp`, `icon-check.svg`
- **Accessibility notes:** display wordmark `aria-hidden`; bartender alt required
- **Layout notes:** CSS `mask-image` composite
- **Responsive notes:** stack checklists below visual
- **Risks:** mask composition complexity; GSAP scroll performance

### 5. Bartender Showcase

- **BEM block:** `showcase`
- **Vue component:** `ShowcaseSection.vue`
- **HTML tag:** `<section id="showcase">`
- **Heading:** `h2` — “Made with Craft, Poured with Passion”
- **Main elements:** large bartender figure, subtitle, 2 floating cocktail cutouts
- **Repeated items:** floating cocktails (2, decorative)
- **Related assets:** `bartender-photo.webp`, floating aperol/martini webp
- **Accessibility notes:** bartender alt; floating drinks decorative
- **Layout notes:** centered rounded image; absolute floating assets
- **Responsive notes:** simplify/hide floats on mobile
- **Risks:** shares `bartender-photo` with The Art section

### 6. Featured Cocktails Carousel

- **BEM block:** `cocktail-carousel`
- **Vue component:** `CocktailCarouselSection.vue`
- **HTML tag:** `<section id="carousel">`
- **Heading:** `h2` — active recipe name (dynamic: “Raspberry Mojito” default)
- **Main elements:** tablist, drink figure, prev/next controls, recipe eyebrow, `h3` description title, body copy
- **Repeated items:** tabs × 4 (Classic Mojito, Raspberry Mojito, Violet Breeze, Tipsy Tales)
- **Related assets:** `carousel-drink-raspberry-mojito.webp`, `icon-arrow-right.svg`, monstera, noise
- **Accessibility notes:** WAI-ARIA tabs; keyboard nav; button aria-labels
- **Layout notes:** Vue state + GSAP transitions between slides
- **Responsive notes:** tabs primary on mobile; hide side labels
- **Risks:** only 1 drink image exported; copy mismatch (Margarita text)

### 7. Contact and Footer

- **BEM block:** `contact`
- **Vue component:** `ContactSection.vue`
- **HTML tag:** `<section id="contact">`
- **Heading:** `h2` — “Where to Find Us”
- **Main elements:** address, phone/email, hours, social nav, decorative cocktail assortment
- **Repeated items:** social links × 3, hours rows × 4
- **Related assets:** social SVGs × 3, `footer-cocktail-assortment.webp`, monstera
- **Accessibility notes:** `tel:` / `mailto:` links; social `aria-label`s
- **Layout notes:** centered 880px content column
- **Responsive notes:** stack blocks; reduce 90px title on mobile
- **Risks:** overlap with placeholder `SiteFooter.vue`; verify brand email

## Global Components

| Component        | Class / path                                           | Used in                              |
| ---------------- | ------------------------------------------------------ | ------------------------------------ |
| SiteHeader       | `site-header` / `src/components/layout/SiteHeader.vue` | Global nav (from Figma hero header)  |
| SiteFooter       | `site-footer` / `src/components/layout/SiteFooter.vue` | Placeholder — reconcile with contact |
| FeatureChecklist | `feature-checklist`                                    | philosophy, the-art                  |
| MenuItem         | `menu__item`                                           | menu                                 |
| RatingBlock      | `rating`                                               | philosophy                           |
| AvatarStack      | `avatars`                                              | philosophy                           |
| CocktailCarousel | `cocktail-carousel`                                    | carousel                             |
| SocialLinks      | `socials`                                              | contact                              |
| DecorativeLeaf   | `decorative-leaf`                                      | hero, menu, carousel, contact        |
| NoiseOverlay     | `noise-overlay`                                        | all dark sections                    |
| Badge            | `badge`                                                | philosophy                           |

## Asset Usage Map

| Section       | Primary assets                                                               |
| ------------- | ---------------------------------------------------------------------------- |
| hero          | hero-cocktail-mojito.webp, decorative-monstera-leaf.webp, noise-texture.webp |
| menu          | menu-cocktail-center.webp                                                    |
| philosophy    | bento-_.webp, avatar-_.webp, icon-star.svg, icon-check.svg                   |
| the-art       | art-section-mask.png, bartender-photo.webp, icon-check.svg                   |
| showcase      | bartender-photo.webp, floating-cocktail-\*.webp                              |
| carousel      | carousel-drink-raspberry-mojito.webp, icon-arrow-right.svg                   |
| contact       | footer-cocktail-assortment.webp, icon-social-\*.svg                          |
| global header | velvet-pour-mark.png                                                         |

## Accessibility Plan

1. **One `h1`** in hero only; section titles are `h2`; card/recipe titles are `h3`.
2. **Decorative display type** (MOJITO, The ART) — `aria-hidden="true"`.
3. **Navigation** — `SiteHeader` uses `<nav aria-label="Main">` with anchor links to section IDs.
4. **Carousel** — full tabs ARIA pattern with keyboard support.
5. **Social icons** — `aria-label` per platform; no icon-only links without labels.
6. **Rating** — visible “4.5/5” text; stars decorative.
7. **GSAP** — respect `prefers-reduced-motion`.

## Implementation Risks

- Desktop-only Figma — responsive strategy manual
- Existing `SiteHeader` / `SiteFooter` placeholders vs Figma structure
- Carousel interactivity + missing tab images
- Mask composite in The Art section
- Large noise texture asset — consider CSS alternative
- Content/copy inconsistencies in Figma

## Recommended Next Commands

For this **Vue 3** project, adapt the HTML pipeline to Vue sections:

1. Implement `HeroSection.vue` and update `SiteHeader.vue` (or run skeleton generation adapted for Vue)
2. `user-generate-bem-structure` — validate Tailwind/class naming per section
3. `user-generate-base-css` — map `design-tokens.css` into `src/styles/main.css` `@theme`

Legacy HTML command if preferred:

1. `user-generate-html-skeleton`
