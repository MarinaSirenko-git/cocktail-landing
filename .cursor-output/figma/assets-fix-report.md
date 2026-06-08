# Assets Fix Report

## Source

Review report:

```txt
.cursor-output/figma/assets-quality-report.md
```

## Status

Completed (partial — bento low-quality images require Figma re-export)

## Fixes Applied

1. **Wired monstera `<picture>` fallbacks** in `MenuSection.vue`, `CocktailCarouselSection.vue`, `ContactSection.vue` (6 elements).
2. **Fixed carousel drink dimensions** — `401×592` → `401×268` to match intrinsic 1548×1034 aspect ratio.
3. **Fixed hero image dimensions** — `687×636` → `687×384` to match intrinsic 1900×1063 aspect ratio.
4. **Resized/recompressed raster assets** with ImageMagick + `cwebp` (quality 55–85).
5. **Moved unused assets** to `src/assets/source/unused/` and added `src/assets/source/` to `.gitignore`.
6. **Updated** `assets-manifest.json` warnings.

**Not applicable:** `recipes-featured-spread.webp` (different project template).

**Hero lazy-loading:** Already correct — no change needed.

## Vue Updates

### Picture Elements Added

| Component | Count | Asset |
|-----------|------:|-------|
| `MenuSection.vue` | 2 | `decorative-monstera-leaf` WebP + PNG |
| `CocktailCarouselSection.vue` | 2 | `decorative-monstera-leaf` WebP + PNG |
| `ContactSection.vue` | 2 | `decorative-monstera-leaf` WebP + PNG |

**Total `<picture>` elements added: 6**

### Hero Loading Fixes

None required — hero cocktail already uses `fetchpriority="high"` without `loading="lazy"`.

### Dimension Fixes

| File | Before | After |
|------|--------|-------|
| `CocktailCarouselSection.vue` (drink img) | 401×592 | 401×268 |
| `HeroSection.vue` (hero img) | 687×636 | 687×384 |

## Optimized Images

| File | Before | After | Action |
|------|-------:|------:|--------|
| `noise-texture.webp` | 1.34 MB | 386 KB | Resize 1440×810, palette reduce, cwebp q55 |
| `noise-texture.png` | 1.45 MB | 1.03 MB | Resize 1440×810, palette reduce |
| `decorative-monstera-leaf.webp` | 289 KB | 105 KB | Resize max 1200px, regenerate WebP |
| `decorative-monstera-leaf.png` | 2.51 MB | 1.11 MB | Resize max 1200px |
| `velvet-pour-mark.png` | 137 KB | 19 KB | Resize 96×96 |
| `hero-cocktail-mojito.webp` | 39 KB | 22 KB | PNG resize 1600w + regenerate |
| `hero-cocktail-mojito.png` | 1.27 MB | 739 KB | Resize max 1600px |
| `menu-cocktail-center.webp` | 55 KB | 31 KB | PNG resize 1600w + regenerate |
| `menu-cocktail-center.png` | 1.24 MB | 723 KB | Resize max 1600px |
| `bartender-photo.webp` | 231 KB | 128 KB | PNG resize 1600w + regenerate |
| `bartender-photo.png` | 2.91 MB | 1.84 MB | Resize max 1600px |
| `bento-bartender-pouring.webp` | 252 KB | 95 KB | PNG resize 1200w + regenerate |
| `bento-bartender-pouring.png` | 2.55 MB | 1.02 MB | Resize max 1200px |
| `bento-cocktails-row.webp` | 248 KB | 89 KB | PNG resize 1200w + regenerate |
| `bento-cocktails-row.png` | 2.41 MB | 920 KB | Resize max 1200px |
| `footer-cocktail-assortment.webp` | 291 KB | 123 KB | PNG resize 1200w + regenerate |
| `footer-cocktail-assortment.png` | 2.23 MB | 969 KB | Resize max 1200px |
| `floating-cocktail-aperol.webp` | 154 KB | 24 KB | PNG resize 600w + regenerate |
| `floating-cocktail-aperol.png` | 1.21 MB | 158 KB | Resize max 600px |
| `floating-cocktail-martini.webp` | 142 KB | 23 KB | PNG resize 600w + regenerate |
| `floating-cocktail-martini.png` | 1.22 MB | 165 KB | Resize max 600px |
| `carousel-drink-raspberry-mojito.webp` | 53 KB | 31 KB | PNG resize 1200w + regenerate |
| `carousel-drink-raspberry-mojito.png` | 347 KB | 185 KB | Resize max 1200px |
| `art-section-mask.png` | 1.12 MB | 479 KB | Resize max 800px |
| `art-section-mask.webp` | 192 KB | 89 KB | Generated from optimized PNG |
| `avatar-customer-*.png` | 11–14 KB | 11–13 KB | Strip metadata, regenerate WebP |

**Oversized images optimized: 24 files**

## Fallbacks Wired

| WebP | Fallback | Vue Updated |
|------|----------|:-----------:|
| `decorative-monstera-leaf.webp` | `decorative-monstera-leaf.png` | ✓ (Menu, Carousel, Contact) |

**Fallback pairs newly wired in markup: 1 asset × 3 sections**

## Oversized Images

PNG fallbacks remain the largest deploy artifacts (700 KB–1.8 MB each) because `<picture>` requires them for non-WebP browsers. WebP delivery paths are now significantly smaller.

Largest remaining built WebP: `noise-texture.webp` (386 KB).

## Source Masters

Moved to `src/assets/source/unused/` (gitignored):

| File | Size | Reason |
|------|-----:|--------|
| `art-section-mask.webp` | 192 KB | Duplicate — PNG used in Vue |
| `vue.svg` | 496 B | Vite starter, unused |
| `vite.svg` | 8.7 KB | Vite starter, unused |
| `hero.png` | 13 KB | Vite starter, unused |
| `icons.svg` | 5 KB | Unused public asset |

**Heavy source masters found on disk (pre-fix): ~35 MB PNG fallbacks** — resized in place, not deleted.

## Files Changed

```txt
src/sections/MenuSection.vue
src/sections/CocktailCarouselSection.vue
src/sections/ContactSection.vue
src/sections/HeroSection.vue
src/assets/images/* (24 raster files optimized)
src/assets/logos/velvet-pour-mark.png
src/assets/source/unused/* (moved)
.gitignore
.cursor-output/figma/assets-manifest.json
```

`index.html` — not changed (no image references).

## Files Not Changed

- `bento-guests-drinking.webp` / `.png` — corrupt/low-quality export; requires Figma re-export
- `bento-cocktail-garnish.webp` / `.png` — same
- Missing carousel drink images (Classic Mojito, Violet Breeze, Tipsy Tales)
- `HelloWorld.vue` — still references moved starter assets (component not mounted)

## Build Result

```
npm run build — PASSED
```

Notable dist WebP sizes after fix: hero 22 KB, noise 386 KB, logo 19 KB (was 137 KB in prior build).

## Manual Review Needed

1. **Re-export from Figma:** `bento-guests-drinking`, `bento-cocktail-garnish`
2. **Export missing carousel drink images** for inactive tabs
3. **noise-texture** — consider CSS `filter` noise if 386 KB is still too heavy
4. **PNG fallbacks** — optional WebP-only strategy for evergreen browsers (drops fallback weight)
5. **The ART mask** — implement CSS mask using optimized `art-section-mask.png`
6. **HelloWorld.vue** — update imports or remove if starter demo is no longer needed

## Warnings

- PNG fallbacks still bundle into `dist/` when imported in Vue `<picture>` blocks
- Noise overlay uses palette-reduced PNG — verify visual quality at 30% opacity on device
- `src/assets/source/` is gitignored — moved files won't be in repo unless policy changes
- Did not install new npm optimization packages (used system `magick` + `cwebp`)

## Recommended Next Commands

1. `user-review-assets-quality`
2. `user-run-web-perf-audit`
3. `user-export-figma-assets` (re-export low-quality bento images)
