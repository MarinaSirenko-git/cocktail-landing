# Vue Tailwind Skeleton Report

## Source

Generated from:

```txt
.cursor-output/figma/section-map.json
.cursor-output/figma/assets-manifest.json
```

## Status

**Completed**

## Project Detection

| Item | Result |
| --- | --- |
| Vue detected | Yes (`vue` 3.5, `src/App.vue`) |
| Tailwind detected | Yes (`tailwindcss`, `@import "tailwindcss"` in `main.css`) |
| Vue Router detected | No |

## Regeneration Mode

`safe-replace-generated-components`

- Replaced generated layout placeholders (`SiteHeader`, `SiteFooter`)
- Composed all section components into `App.vue`
- Preserved `class="skip-link"` on skip link (existing global a11y CSS in `main.css`)

## Files Created

```txt
src/sections/HeroSection.vue
src/sections/MenuSection.vue
src/sections/PhilosophySection.vue
src/sections/TheArtSection.vue
src/sections/ShowcaseSection.vue
src/sections/CocktailCarouselSection.vue
src/sections/ContactSection.vue
```

## Files Updated

```txt
src/App.vue
src/components/layout/SiteHeader.vue
src/components/layout/SiteFooter.vue
```

## App Structure

- **Direct sections in App.vue:** Yes (7 sections in `<main id="main-content">`)
- **RouterView:** No
- **HomePage:** Not created (no vue-router)
- **Additional pages:** None

## Generated Components

| Component | Path |
| --- | --- |
| SiteHeader | `src/components/layout/SiteHeader.vue` |
| SiteFooter | `src/components/layout/SiteFooter.vue` |

## Generated Sections

| Section | File | `id` |
| --- | --- | --- |
| Hero | `HeroSection.vue` | `hero` |
| Menu | `MenuSection.vue` | `menu` |
| Philosophy | `PhilosophySection.vue` | `philosophy` |
| The Art | `TheArtSection.vue` | `the-art` |
| Showcase | `ShowcaseSection.vue` | `showcase` |
| Carousel | `CocktailCarouselSection.vue` | `carousel` |
| Contact | `ContactSection.vue` | `contact` |

## Asset Usage

**24 unique asset imports** connected across sections (WebP + PNG pairs, SVG icons, logo PNG).

All paths sourced from `assets-manifest.json` — no invented paths.

## Picture / Image Fallback Notes

- **Picture elements:** 22 (WebP source + PNG/JPG fallback)
- **Direct SVG/img:** 7 icon/logo references
- **Missing PNG fallbacks:** 0 for exported raster pairs
- **Monstera decorative leaves in Menu/Carousel/Contact:** WebP only in some instances (PNG sibling exists in manifest — can add `<picture>` in styling pass)

## Accessibility Applied

- One `h1` on page: “Sip the Spirit of Summer”
- Section `aria-labelledby` with matching heading `id`s
- Decorative MOJITO / The ART display: `aria-hidden="true"`
- Skip link preserved before layout
- `main id="main-content"`
- Hero image: `fetchpriority="high"`, no lazy load
- Non-critical images: `loading="lazy"`
- Social links: `aria-label` per platform
- Carousel: `role="tablist"`, `role="tab"`, `role="tabpanel"` skeleton (static, no JS yet)
- `tel:` and `mailto:` links in contact section
- Decorative images: `alt=""` + `aria-hidden="true"`

## Routes

None — single-page landing without `vue-router`.

## Manual Review Needed

1. **Carousel tab switching** — buttons are static; GSAP/JS not implemented
2. **Mobile menu** — toggle button placeholder only
3. **The ART mask** — `art-section-mask.png` hidden; CSS mask composition TODO
4. **Menu copy** — Figma wine/beer names retained; normalize to cocktails
5. **Carousel copy** — Margarita description under Raspberry Mojito tab
6. **Social URLs** — placeholder `https://` links
7. **Contact email** — `hello@jsmcocktail.com` from Figma; verify brand
8. **Bento low-res assets** — `bento-guests-drinking`, `bento-cocktail-garnish`

## Warnings

- **No Tailwind classes added** — page will render unstyled until `user-apply-tailwind-layout`
- **No GSAP animations** — structure only
- **SiteFooter** is minimal copyright; rich contact content lives in `ContactSection`
- **Build verified:** `npm run build` passes

## Recommended Next Commands

1. `user-apply-tailwind-layout`
2. `user-add-a11y-attributes` (refine carousel keyboard behavior)
3. `user-add-basic-seo`
