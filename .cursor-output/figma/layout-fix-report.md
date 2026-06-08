# Layout Fix Report

## Source

Review report:

```txt
.cursor-output/figma/layout-review-report.md
```

## Status

Completed

## Project Type

- Vue: Yes
- Tailwind: Yes (v4)
- Plain CSS: No

## Fixes Applied

| Severity | Section | Issue | File | Change Applied |
|---|---|---|---|---|
| Critical | Hero | Desktop layout structure | `src/sections/HeroSection.vue` | Replaced `lg:grid-cols-2` with stacked absolute composition: centered cocktail figure, copy bottom-left, body+CTA bottom-right |
| Critical | Hero | CTA treatment | `src/sections/HeroSection.vue` | Replaced white pill button with underlined text link + focus ring |
| Critical | The ART | Masked visual | `src/sections/TheArtSection.vue` | Applied CSS `mask-image` via inline style using `art-section-mask.png` on bartender photo |
| Critical | Showcase | Section prominence | `src/sections/ShowcaseSection.vue` | Removed `rounded-card`; full-width figure with `max-w-[968px]` |
| Critical | Carousel | Tab visual pattern | `src/sections/CocktailCarouselSection.vue` | Text tabs with bottom border; active tab `border-accent`; removed pill styling |
| Critical | Typography | Display fonts | `index.html`, `src/styles/theme.css` | Loaded Google Font substitutes (Cormorant Garamond + DM Sans) and mapped to theme tokens |
| Medium | Hero | MOJITO layering / height | `src/sections/HeroSection.vue` | Centered figure absolute at `lg:top-[45%]`; `lg:min-h-[927px]` on inner container |
| Medium | Menu | Column + image layout | `src/sections/MenuSection.vue` | Tightened grid columns; increased center image presence with `lg:-mt-4` |
| Medium | Philosophy | Avatar chip placement | `src/sections/PhilosophySection.vue` | Merged avatar stack into rating group as single visual row |
| Medium | The ART | Checklist placement | `src/sections/TheArtSection.vue` | Desktop lists absolutely positioned left/right of masked figure; mobile stacked lists preserved |
| Medium | Showcase | Floating cocktails | `src/sections/ShowcaseSection.vue` | Tuned absolute positions (`top-[18%]`, `bottom-[20%]`, responsive sizes) |
| Medium | Carousel | Side prev/next labels | `src/sections/CocktailCarouselSection.vue` | Added horizontal rule dividers (`h-px w-16 bg-border`) beside arrow controls |
| Medium | Contact | Layout overlap | `src/sections/ContactSection.vue` | Cocktail figure `lg:absolute` bottom-right with translate overlap; added `lg:min-h` and extra bottom padding |
| Low | Hero | Scroll indicator | `src/sections/HeroSection.vue` | Moved to right edge at `lg`; replaced `↓` with vertical line styling |
| Low | Philosophy | Badge padding | `src/sections/PhilosophySection.vue` | Increased badge vertical padding to `py-2.5` |

## Theme Token Changes

| Token | Before | After | Reason |
|---|---|---|---|
| `--font-sans` | `"Mona Sans", system-ui, ...` | `"DM Sans", "Mona Sans", system-ui, ...` | Load webfont substitute for Mona Sans |
| `--font-display` | `"Modern Negra Demo", ui-serif, ...` | `"Cormorant Garamond", "Modern Negra Demo", ui-serif, ...` | Load webfont substitute for Modern Negra Demo |

## Tailwind Class Changes

| File | Before | After | Reason |
|---|---|---|---|
| `HeroSection.vue` | `lg:grid-cols-2` grid layout | Absolute positioning on `lg+` | Match Figma centered hero composition |
| `HeroSection.vue` | `rounded-button bg-surface px-8 py-3` CTA | `underline decoration-accent` text link | Match Figma text CTA |
| `ShowcaseSection.vue` | `rounded-card` on figure | `max-w-none` / `max-w-[968px]` | Full-bleed photo scale |
| `CocktailCarouselSection.vue` | `rounded-button border` pill tabs | `border-b-2` text tabs | Match Figma underline tab pattern |
| `ContactSection.vue` | Static grid figure | `lg:absolute lg:bottom-0 lg:right-20 lg:translate-y-8` | Overlap cocktail assortment |
| `MenuSection.vue` | `lg:gap-12` | `lg:gap-10`, `lg:-mt-4` on figure | Tighter column rhythm |

## CSS Changes

| File | Change | Reason |
|---|---|---|
| `index.html` | Added Google Fonts preconnect + stylesheet links | Enable display/body font substitutes |
| `TheArtSection.vue` | Inline `maskImage` / `WebkitMaskImage` style object | Circular glass-distortion mask composite |

## Issues Not Fixed

| Severity | Section | Issue | Reason |
|---|---|---|---|
| Critical | Philosophy | Broken bento images (`bento-guests-drinking`, `bento-cocktail-garnish`) | Requires re-export from Figma via `user-export-figma-assets`; not a layout-class fix |
| Critical | Typography | Exact Modern Negra Demo + Mona Sans | Licensed fonts unavailable; substitutes used instead |
| Medium | Carousel | Drink image asset mismatch | Asset verification/re-export out of scope for layout command |
| Medium | Carousel | Missing inactive tab drink images | Requires asset export |
| Medium | Mobile | Hero vs Figma mobile frame `42001:1366` | Not fully diffed in source review; needs follow-up comparison |
| Low | Global | GSAP scroll/parallax motion | Out of scope |
| Low | Philosophy | Half-star rating visual | Minor polish; not applied |
| Low | Global | Noise overlay intensity | Subjective; left unchanged |

## Build Result

```txt
npm run build — PASSED (exit 0)
vue-tsc -b && vite build completed in ~2.3s
```

## Manual Review Needed

1. Hero desktop composition at 1440px — verify bottom-corner copy alignment and cocktail centering.
2. The ART mask composite — confirm glass-distortion visual matches Figma intent.
3. Philosophy bento grid after image re-export.
4. Contact section overlap on tablet breakpoints (absolute figure only at `lg+`).
5. Font substitute approval vs licensed Figma fonts.
6. Mobile hero comparison against Figma frame `42001:1366`.

## Warnings

- Google Fonts substitutes are approximations, not licensed Figma fonts.
- Contact cocktail figure uses absolute positioning at `lg+` which may affect narrow desktop widths.
- The ART mask relies on PNG asset size (~478 KB); performance unchanged from prior state.
- Broken bento images will still appear broken until re-exported.

## Recommended Next Commands

1. `user-review-layout-against-figma`
2. `user-export-figma-assets` (re-export broken bento images)
3. `user-run-web-perf-audit`
