# Assets Quality Report

## Source

Manifest:

```txt
.cursor-output/figma/assets-manifest.json
```

HTML entry:

```txt
index.html
```

Vue usage (primary — images are imported in SFCs, not `index.html`):

```txt
src/sections/*.vue
src/components/layout/SiteHeader.vue
```

## Status

Completed

**Note:** This is a Vue + Vite project. Raster/SVG content images are referenced via ES module imports in section components. `index.html` only references `/favicon.svg`.

## Summary

| Metric                               |                      Count |
| ------------------------------------ | -------------------------: |
| Total asset files scanned            |                         44 |
| Raster images                        |                         34 |
| SVG assets                           |                         10 |
| Referenced in production Vue tree    |                         36 |
| Referenced in `index.html`           |         1 (`/favicon.svg`) |
| Missing files (broken refs)          |                          0 |
| Missing WebP→PNG fallbacks in markup | 3 usages (monstera leaves) |
| Heavy files (warnings)               |                         18 |
| Likely unused assets                 |                          5 |
| Missing design assets (not exported) |          3 carousel drinks |

## Referenced Assets

| Path                                                     | Type | Exists | Used In                              | Notes                                          |
| -------------------------------------------------------- | ---- | :----: | ------------------------------------ | ---------------------------------------------- |
| `public/favicon.svg`                                     | SVG  |   ✓    | `index.html`                         | 9.5 KB — acceptable                            |
| `src/assets/logos/velvet-pour-mark.png`                  | PNG  |   ✓    | `SiteHeader.vue`                     | 137 KB @ 300×300 for 32×32 display — heavy     |
| `src/assets/icons/icon-star.svg`                         | SVG  |   ✓    | `PhilosophySection.vue`              | 1.3 KB, decorative                             |
| `src/assets/icons/icon-check.svg`                        | SVG  |   ✓    | `PhilosophySection`, `TheArtSection` | 659 B                                          |
| `src/assets/icons/icon-arrow-right.svg`                  | SVG  |   ✓    | `CocktailCarouselSection.vue`        | 782 B                                          |
| `src/assets/icons/icon-social-instagram.svg`             | SVG  |   ✓    | `ContactSection.vue`                 | 3.4 KB                                         |
| `src/assets/icons/icon-social-x.svg`                     | SVG  |   ✓    | `ContactSection.vue`                 | 681 B                                          |
| `src/assets/icons/icon-social-facebook.svg`              | SVG  |   ✓    | `ContactSection.vue`                 | 500 B                                          |
| `src/assets/images/hero-cocktail-mojito.webp`            | WebP |   ✓    | `HeroSection.vue`                    | 39 KB @ 1900×1063                              |
| `src/assets/images/hero-cocktail-mojito.png`             | PNG  |   ✓    | `HeroSection.vue`                    | 1.27 MB fallback                               |
| `src/assets/images/decorative-monstera-leaf.webp`        | WebP |   ✓    | All sections                         | 289 KB @ 2000×2000                             |
| `src/assets/images/decorative-monstera-leaf.png`         | PNG  |   ✓    | `HeroSection.vue` only               | 2.51 MB — not used in Menu/Carousel/Contact    |
| `src/assets/images/noise-texture.webp`                   | WebP |   ✓    | All sections                         | 1.34 MB @ 1920×1080                            |
| `src/assets/images/noise-texture.png`                    | PNG  |   ✓    | All sections                         | 1.45 MB fallback                               |
| `src/assets/images/menu-cocktail-center.webp`            | WebP |   ✓    | `MenuSection.vue`                    | 55 KB                                          |
| `src/assets/images/menu-cocktail-center.png`             | PNG  |   ✓    | `MenuSection.vue`                    | 1.24 MB                                        |
| `src/assets/images/bento-bartender-pouring.webp`         | WebP |   ✓    | `PhilosophySection.vue`              | 252 KB                                         |
| `src/assets/images/bento-bartender-pouring.png`          | PNG  |   ✓    | `PhilosophySection.vue`              | 2.55 MB                                        |
| `src/assets/images/bento-guests-drinking.webp`           | WebP |   ✓    | `PhilosophySection.vue`              | **1.2 KB** @ 1024×586 — low quality            |
| `src/assets/images/bento-guests-drinking.png`            | PNG  |   ✓    | `PhilosophySection.vue`              | 2.5 KB — suspiciously small                    |
| `src/assets/images/bento-cocktail-garnish.webp`          | WebP |   ✓    | `PhilosophySection.vue`              | **1.2 KB** @ 1024×586 — low quality            |
| `src/assets/images/bento-cocktail-garnish.png`           | PNG  |   ✓    | `PhilosophySection.vue`              | 2.5 KB — suspiciously small                    |
| `src/assets/images/bento-cocktails-row.webp`             | WebP |   ✓    | `PhilosophySection.vue`              | 248 KB                                         |
| `src/assets/images/bento-cocktails-row.png`              | PNG  |   ✓    | `PhilosophySection.vue`              | 2.41 MB                                        |
| `src/assets/images/avatar-customer-1.webp`               | WebP |   ✓    | `PhilosophySection.vue`              | 3.2 KB @ 92×92                                 |
| `src/assets/images/avatar-customer-1.png`                | PNG  |   ✓    | `PhilosophySection.vue`              | 12.6 KB                                        |
| `src/assets/images/avatar-customer-2.webp`               | WebP |   ✓    | `PhilosophySection.vue`              | 2.7 KB                                         |
| `src/assets/images/avatar-customer-2.png`                | PNG  |   ✓    | `PhilosophySection.vue`              | 11.2 KB                                        |
| `src/assets/images/avatar-customer-3.webp`               | WebP |   ✓    | `PhilosophySection.vue`              | 2.6 KB                                         |
| `src/assets/images/avatar-customer-3.png`                | PNG  |   ✓    | `PhilosophySection.vue`              | 13.9 KB                                        |
| `src/assets/images/art-section-mask.png`                 | PNG  |   ✓    | `TheArtSection.vue`                  | 1.12 MB @ 1268×1268, `hidden` pending CSS mask |
| `src/assets/images/bartender-photo.webp`                 | WebP |   ✓    | `TheArtSection`, `ShowcaseSection`   | 231 KB @ 2000×1333                             |
| `src/assets/images/bartender-photo.png`                  | PNG  |   ✓    | `TheArtSection`, `ShowcaseSection`   | 2.91 MB                                        |
| `src/assets/images/floating-cocktail-aperol.webp`        | WebP |   ✓    | `ShowcaseSection.vue`                | 154 KB, decorative                             |
| `src/assets/images/floating-cocktail-aperol.png`         | PNG  |   ✓    | `ShowcaseSection.vue`                | 1.21 MB                                        |
| `src/assets/images/floating-cocktail-martini.webp`       | WebP |   ✓    | `ShowcaseSection.vue`                | 142 KB, decorative                             |
| `src/assets/images/floating-cocktail-martini.png`        | PNG  |   ✓    | `ShowcaseSection.vue`                | 1.22 MB                                        |
| `src/assets/images/carousel-drink-raspberry-mojito.webp` | WebP |   ✓    | `CocktailCarouselSection.vue`        | 53 KB                                          |
| `src/assets/images/carousel-drink-raspberry-mojito.png`  | PNG  |   ✓    | `CocktailCarouselSection.vue`        | 347 KB                                         |
| `src/assets/images/footer-cocktail-assortment.webp`      | WebP |   ✓    | `ContactSection.vue`                 | 291 KB, decorative                             |
| `src/assets/images/footer-cocktail-assortment.png`       | PNG  |   ✓    | `ContactSection.vue`                 | 2.23 MB                                        |

## Picture Elements

| Component / Image        | Modern Source | Fallback | Status | Notes                                                                             |
| ------------------------ | ------------- | -------- | ------ | --------------------------------------------------------------------------------- |
| Hero cocktail            | WebP          | PNG      | ✓      | `type="image/webp"`, alt, dimensions, `fetchpriority="high"`, no `loading="lazy"` |
| Hero monstera (×2)       | WebP          | PNG      | ✓      | Decorative, `loading="lazy"`                                                      |
| Menu cocktail            | WebP          | PNG      | ✓      |                                                                                   |
| Menu monstera (×2)       | WebP only     | —        | ⚠      | PNG exists on disk but not used in `<picture>`                                    |
| Philosophy avatars (×3)  | WebP          | PNG      | ✓      |                                                                                   |
| Philosophy bento (×4)    | WebP          | PNG      | ✓      |                                                                                   |
| Philosophy noise         | WebP          | PNG      | ✓      |                                                                                   |
| The Art bartender        | WebP          | PNG      | ✓      |                                                                                   |
| The Art noise            | WebP          | PNG      | ✓      |                                                                                   |
| Showcase bartender       | WebP          | PNG      | ✓      |                                                                                   |
| Showcase floating (×2)   | WebP          | PNG      | ✓      |                                                                                   |
| Showcase noise           | WebP          | PNG      | ✓      |                                                                                   |
| Carousel drink           | WebP          | PNG      | ✓      |                                                                                   |
| Carousel monstera (×2)   | WebP only     | —        | ⚠      | No PNG fallback in markup                                                         |
| Carousel noise           | WebP          | PNG      | ✓      |                                                                                   |
| Contact footer cocktails | WebP          | PNG      | ✓      |                                                                                   |
| Contact monstera (×2)    | WebP only     | —        | ⚠      | No PNG fallback in markup                                                         |
| Contact noise            | WebP          | PNG      | ✓      |                                                                                   |

**AVIF:** Not used anywhere (optional future enhancement).

**Pattern:** All content `<picture>` blocks use WebP → PNG order with `type="image/webp"` on source. No `alt` on `<source>` — correct.

## Fallback Pairs

| Modern Image                           | Fallback Image                        | Status | Notes                                                |
| -------------------------------------- | ------------------------------------- | ------ | ---------------------------------------------------- |
| `hero-cocktail-mojito.webp`            | `hero-cocktail-mojito.png`            | ✓      | Used in `<picture>`                                  |
| `decorative-monstera-leaf.webp`        | `decorative-monstera-leaf.png`        | ⚠      | PNG exists; only Hero uses `<picture>` fallback      |
| `noise-texture.webp`                   | `noise-texture.png`                   | ✓      | Both very large                                      |
| `menu-cocktail-center.webp`            | `menu-cocktail-center.png`            | ✓      |                                                      |
| `bento-bartender-pouring.webp`         | `bento-bartender-pouring.png`         | ✓      |                                                      |
| `bento-guests-drinking.webp`           | `bento-guests-drinking.png`           | ✓      | Pair exists; both extremely small — quality issue    |
| `bento-cocktail-garnish.webp`          | `bento-cocktail-garnish.png`          | ✓      | Pair exists; both extremely small — quality issue    |
| `bento-cocktails-row.webp`             | `bento-cocktails-row.png`             | ✓      |                                                      |
| `avatar-customer-*.webp`               | `avatar-customer-*.png`               | ✓      | ×3                                                   |
| `bartender-photo.webp`                 | `bartender-photo.png`                 | ✓      |                                                      |
| `floating-cocktail-aperol.webp`        | `floating-cocktail-aperol.png`        | ✓      |                                                      |
| `floating-cocktail-martini.webp`       | `floating-cocktail-martini.png`       | ✓      |                                                      |
| `carousel-drink-raspberry-mojito.webp` | `carousel-drink-raspberry-mojito.png` | ✓      |                                                      |
| `footer-cocktail-assortment.webp`      | `footer-cocktail-assortment.png`      | ✓      |                                                      |
| `art-section-mask.webp`                | `art-section-mask.png`                | ⚠      | WebP on disk (192 KB) but only PNG referenced in Vue |

## Hero Image Check

**Asset:** `hero-cocktail-mojito.webp` / `.png`

| Rule                                                    | Status                      |
| ------------------------------------------------------- | --------------------------- |
| Identified as hero (above fold, `fetchpriority="high"`) | ✓                           |
| No `loading="lazy"`                                     | ✓                           |
| `width` and `height` present                            | ✓ (687×636 — display sizes) |
| Meaningful `alt`                                        | ✓                           |
| `<picture>` with WebP + PNG                             | ✓                           |

**Warning:** Markup dimensions (687×636, ratio ~1.08) do not match intrinsic image (1900×1063, ratio ~1.79). May cause minor CLS unless CSS constrains aspect ratio.

## Lazy Loading Check

| Image                     | `loading="lazy"`   | Appropriate       |
| ------------------------- | ------------------ | ----------------- |
| Hero cocktail             | No                 | ✓ (LCP candidate) |
| Below-fold section images | Yes                | ✓                 |
| Decorative monstera       | Yes                | ✓                 |
| Noise overlays            | Yes                | ✓                 |
| Header logo               | No (default eager) | ✓                 |

All non-hero content images use `decoding="async"`.

## Dimensions Check

| Path                              | Real Size | Markup Size       | Status | Notes                                           |
| --------------------------------- | --------- | ----------------- | ------ | ----------------------------------------------- |
| `hero-cocktail-mojito`            | 1900×1063 | 687×636           | ⚠      | Aspect ratio mismatch                           |
| `menu-cocktail-center`            | 1913×1043 | 720×643           | ⚠      | Display vs intrinsic differ                     |
| `carousel-drink-raspberry-mojito` | 1548×1034 | 401×592           | ⚠      | Markup taller than intrinsic — likely incorrect |
| `bartender-photo`                 | 2000×1333 | 626×626 / 968×661 | ⚠      | Different crops per section                     |
| `bento-guests-drinking`           | 1024×586  | 580×285           | ⚠      | File size suggests placeholder-quality export   |
| `bento-cocktail-garnish`          | 1024×586  | 480×285           | ⚠      | Same                                            |
| `avatar-customer-*`               | 92×92     | 44×44             | ✓      | Intentionally smaller display                   |
| `velvet-pour-mark`                | 300×300   | 32×32             | ⚠      | Oversized source for display                    |

## Heavy Files

| Path                             |    Size | Threshold     | Recommendation                                                         |
| -------------------------------- | ------: | ------------- | ---------------------------------------------------------------------- |
| `noise-texture.webp`             | 1.34 MB | 500 KB        | Replace with CSS grain, tiled texture, or stronger compression         |
| `noise-texture.png`              | 1.45 MB | 500 KB        | PNG fallback rarely needed for decorative overlay — consider WebP-only |
| `decorative-monstera-leaf.png`   | 2.51 MB | 500 KB        | Optimize PNG or rely on WebP `<picture>` everywhere                    |
| `bartender-photo.png`            | 2.91 MB | 500 KB        | PNG fallback; WebP (231 KB) is primary delivery path                   |
| `bento-bartender-pouring.png`    | 2.55 MB | 500 KB        | Optimize fallback                                                      |
| `bento-cocktails-row.png`        | 2.41 MB | 500 KB        | Optimize fallback                                                      |
| `footer-cocktail-assortment.png` | 2.23 MB | 500 KB        | Optimize fallback                                                      |
| `floating-cocktail-aperol.png`   | 1.21 MB | 500 KB        | Decorative — WebP sufficient                                           |
| `floating-cocktail-martini.png`  | 1.22 MB | 500 KB        | Decorative                                                             |
| `menu-cocktail-center.png`       | 1.24 MB | 500 KB        | Optimize fallback                                                      |
| `hero-cocktail-mojito.png`       | 1.27 MB | 1 MB (hero)   | Acceptable as fallback; WebP is 39 KB                                  |
| `art-section-mask.png`           | 1.12 MB | 500 KB        | Mask asset — consider SVG/CSS mask                                     |
| `velvet-pour-mark.png`           |  137 KB | 100 KB (logo) | Re-export smaller or convert to SVG                                    |
| `bento-guests-drinking.webp`     |  1.2 KB | —             | Too small — re-export from Figma                                       |
| `bento-cocktail-garnish.webp`    |  1.2 KB | —             | Too small — re-export from Figma                                       |

**Production bundle note:** Vite emits hashed assets. Built JS/CSS references WebP/PNG pairs correctly for imported `<picture>` blocks. Large PNG fallbacks still ship if imported.

## SVG Review

| File                   |   Size | Status | Notes                              |
| ---------------------- | -----: | ------ | ---------------------------------- |
| `icon-star.svg`        | 1.3 KB | ✓      | Decorative with rating text        |
| `icon-check.svg`       |  659 B | ✓      | Decorative with label text         |
| `icon-arrow-right.svg` |  782 B | ✓      | Inside buttons with visible labels |
| `icon-social-*.svg`    | < 4 KB | ✓      | Parent links have `aria-label`     |
| `public/favicon.svg`   | 9.5 KB | ✓      |                                    |
| `public/icons.svg`     |   5 KB | ⚠      | Unused                             |
| `src/assets/vue.svg`   |  496 B | ⚠      | Starter file, unused in app        |
| `src/assets/vite.svg`  | 8.7 KB | ⚠      | Starter file, unused in app        |

No SVG exceeds 50 KB icon threshold.

## Unused Assets

| Path                                      |   Size | Notes                               |
| ----------------------------------------- | -----: | ----------------------------------- |
| `src/assets/vue.svg`                      |  496 B | Vite starter; only `HelloWorld.vue` |
| `src/assets/vite.svg`                     | 8.7 KB | Vite starter; only `HelloWorld.vue` |
| `src/assets/hero.png`                     |  13 KB | Vite starter; only `HelloWorld.vue` |
| `src/assets/images/art-section-mask.webp` | 192 KB | PNG version used instead            |
| `public/icons.svg`                        |   5 KB | Not referenced                      |

`HelloWorld.vue` is not mounted in `App.vue` — starter assets are effectively dead code.

## Broken References

**Production Vue tree:** None. All imports resolve to existing files.

**`index.html`:** `/favicon.svg` exists in `public/`.

**Starter component:** `HelloWorld.vue` → `hero.png`, `vue.svg`, `vite.svg` all exist.

## Missing Assets (Design)

From manifest `manualExportRequired`:

| Asset                      | Usage        |
| -------------------------- | ------------ |
| Classic Mojito drink image | Carousel tab |
| Violet Breeze drink image  | Carousel tab |
| Tipsy Tales drink image    | Carousel tab |

Only `carousel-drink-raspberry-mojito` is exported.

## Manual Review Needed

1. **Re-export bento-guests-drinking and bento-cocktail-garnish** from Figma — current files appear corrupted or over-compressed (~1–2 KB).
2. **noise-texture** — evaluate CSS `filter` noise or smaller tiled asset instead of 1.3 MB full-bleed image repeated in every section.
3. **art-section-mask** — implement CSS mask composite (PNG is imported but `hidden`); decide whether WebP duplicate is needed.
4. **Carousel drink markup dimensions** — 401×592 does not match 1548×1034 source; update width/height to correct aspect ratio.
5. **Monstera WebP-only usages** — add `<picture>` PNG fallback in Menu, Carousel, Contact for older browsers (PNG exists).
6. **Logo** — 137 KB PNG at 300×300 for 32 px display; optimize or vectorize.
7. **Social preview** — no `public/og-image.jpg` for SEO (see vue-seo-report).

## Recommended Fixes

### High Priority

1. Re-export `bento-guests-drinking` and `bento-cocktail-garnish` at proper quality.
2. Reduce or replace `noise-texture.webp` (largest repeated network cost across 7 sections).
3. Fix `carousel-drink-raspberry-mojito` width/height attributes to match intrinsic aspect ratio.

### Medium Priority

1. Add `<picture>` PNG fallback for decorative monstera in `MenuSection`, `CocktailCarouselSection`, `ContactSection`.
2. Run `user-optimize-assets` on PNG fallbacks (many exceed 1 MB).
3. Export missing carousel drink images for Classic Mojito, Violet Breeze, Tipsy Tales.
4. Optimize `velvet-pour-mark.png` or replace with SVG logo.

### Low Priority

1. Remove or archive unused starter files (`vue.svg`, `vite.svg`, `hero.png`, `HelloWorld.vue`).
2. Delete or use `art-section-mask.webp` duplicate.
3. Remove unused `public/icons.svg`.
4. Consider AVIF sources ahead of WebP in `<picture>` stacks.

## Recommended Next Commands

1. `user-optimize-assets`
2. `user-run-web-perf-audit`
3. `user-export-figma-assets` (re-export low-quality bento images + missing carousel drinks)
