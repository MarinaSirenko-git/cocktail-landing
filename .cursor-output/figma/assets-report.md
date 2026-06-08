# Figma Assets Export Report

## Target

Figma source: [Cocktail GSAP Website (Copy) — Hero (mobile)](https://www.figma.com/design/MmNz1rHoj2PGzFqT6309PX/Cocktail-GSAP-Website--Copy-?node-id=42001-1366)

**Export scope:** Desktop frame `42001:1163` (1440 × 6697 px) for full landing-page assets. The user URL points to mobile Hero `42001:1366`, which contains only a subset (logo, hero cocktail, monstera, noise).

## Export Status

**Completed** — 24 files exported to `src/assets/` (7 SVG, 1 logo PNG, 17 image PNG + 17 WebP siblings)

## Exported Assets

### SVG (6)

| File | Usage |
| --- | --- |
| `src/assets/icons/icon-star.svg` | Rating stars |
| `src/assets/icons/icon-check.svg` | Feature checklist |
| `src/assets/icons/icon-arrow-right.svg` | Carousel navigation |
| `src/assets/icons/icon-social-instagram.svg` | Footer social |
| `src/assets/icons/icon-social-x.svg` | Footer social |
| `src/assets/icons/icon-social-facebook.svg` | Footer social |

### Logo (1)

| File | Usage |
| --- | --- |
| `src/assets/logos/velvet-pour-mark.png` | Header logo mark (32×32 raster) |

### Raster Images (17 PNG + 17 WebP)

| WebP (preferred) | Section |
| --- | --- |
| `hero-cocktail-mojito.webp` | Hero |
| `decorative-monstera-leaf.webp` | Decorative (all sections) |
| `noise-texture.webp` | Grain overlay |
| `menu-cocktail-center.webp` | Menu |
| `bento-bartender-pouring.webp` | Philosophy bento |
| `bento-guests-drinking.webp` | Philosophy bento |
| `bento-cocktail-garnish.webp` | Philosophy bento |
| `bento-cocktails-row.webp` | Philosophy bento |
| `avatar-customer-1.webp` | Rating avatars |
| `avatar-customer-2.webp` | Rating avatars |
| `avatar-customer-3.webp` | Rating avatars |
| `art-section-mask.png` | The ART CSS mask (PNG only) |
| `bartender-photo.webp` | The ART + showcase |
| `floating-cocktail-aperol.webp` | Showcase decoration |
| `floating-cocktail-martini.webp` | Showcase decoration |
| `carousel-drink-raspberry-mojito.webp` | Carousel |
| `footer-cocktail-assortment.webp` | Contact/footer |

PNG originals are kept alongside each WebP for fallback editing.

## CSS-only Assets

These should be recreated with CSS and were **not** exported:

- Section radial gradient backgrounds
- Card gradients (`#313131` → `#0F0F0F`)
- White pill badge (“Best Cocktails”)
- Divider/underline lines (Line 11–16, scroll indicator)
- Header `backdrop-blur(20px)`
- Display text gradients (“MOJITO”, “The ART”)

## Manual Review Needed

1. **The ART mask composite** — use `art-section-mask.png` with `bartender-photo.webp` in CSS `mask-image`; verify visual match to Figma.
2. **Bento thumbnails** — `bento-guests-drinking` and `bento-cocktail-garnish` exported at ~2.4KB PNG; quality may be too low for production.
3. **Noise texture** — `noise-texture.webp` is ~1.3MB; consider CSS noise, tiling, or stronger compression.
4. **Hero/menu blend modes** — `mix-blend-lighten` on cocktail photos affects appearance; test on target browsers.

## Manual Export Required

- **Additional carousel drink images** for Classic Mojito, Violet Breeze, and Tipsy Tales tabs (only Raspberry Mojito visual exists in the design export).

## Accessibility Notes

### Meaningful Images

- Hero, menu, bento, carousel, and bartender photos need descriptive `alt` text (suggestions in manifest).
- Logo: `alt="Velvet Pour"`.
- Social icons: `aria-label` per platform.

### Decorative Images

- Monstera leaves, floating cocktails, footer assortment, noise overlay, avatars (when grouped with rating copy): use `alt=""` or `role="presentation"`.

## Output Folders

```txt
src/assets/images/   — 17 PNG + 17 WebP + mask PNG
src/assets/icons/    — 6 SVG
src/assets/logos/    — 1 PNG
```

## Manifest

Generated file:

```txt
.cursor-output/figma/assets-manifest.json
```

## Recommended Next Commands

1. `user-generate-section-map`
2. `user-generate-html-skeleton` (or Vue section components for this project)
