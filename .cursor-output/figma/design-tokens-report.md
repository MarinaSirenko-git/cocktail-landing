# Design Tokens Report

## Target

Figma source: [Cocktail GSAP Website (Copy) — Hero (mobile)](https://www.figma.com/design/MmNz1rHoj2PGzFqT6309PX/Cocktail-GSAP-Website--Copy-?node-id=42001-1366)

- **File key:** `MmNz1rHoj2PGzFqT6309PX`
- **Primary node:** `42001:1366` — `Hero` (440 × 783 px)
- **Supplemental node:** `42001:1163` — `Desktop` (1440 × 6697 px) from [figma-audit.md](./figma-audit.md)

The user-provided URL targets the **mobile Hero** frame. Site-wide tokens (menu, bento, carousel, footer) were inferred from the audited **Desktop** frame because the mobile node only contains the hero/header.

## Extraction Status

**Completed**

## Source Quality

| Source                | Result                                              |
| --------------------- | --------------------------------------------------- |
| Figma variables found | **No** — `get_variable_defs` returned `{}`          |
| Text styles found     | **No** — not exposed as Figma variables             |
| Inferred values used  | **Yes** — all tokens are inferred from layer styles |

## Colors

### Official Figma Variables

None detected.

### Inferred Colors

14 color tokens extracted, including:

- Background: `#000000` with radial gray gradient stops
- Text: `#FFFFFF`, `#EFEFEF`, `#898989`, `#505050`
- Accent: `#E7D393` (gold), `#B2B6F4` (badge)
- Surfaces: `#FFFFFF`, `#313131` → `#0F0F0F` gradients

### Manual Review Needed

- Radial backgrounds should be rebuilt in CSS (not flat `--color-bg` alone)
- Display text uses gradient clip (`white` → `#898989`)
- Blend modes on hero image and noise overlay affect perceived color

## Typography

### Official Text Styles

None detected as Figma variables.

### Inferred Typography

24 typography tokens extracted:

| Role       | Desktop                 | Mobile (Hero node)       |
| ---------- | ----------------------- | ------------------------ |
| Display XL | 330px / tracking -6.6px | 132px / tracking -2.64px |
| Brand      | 30px / 40px lh          | 30px / 40px lh           |
| Nav        | 16px / 24px lh          | 14px / 20px lh           |
| Body       | 16–18px                 | 16px centered in hero    |

**Font families (from Figma):**

- Display: `Modern Negra Demo`
- Body/UI: `Mona Sans` (Medium, SemiBold, Bold)

### Manual Review Needed

- Both font families appear as demo/third-party names — confirm licensing or choose substitutes (e.g. Cormorant Garamond + DM Sans)
- Desktop display sizes (330px) require `clamp()` for responsive use
- No mobile typography defined outside the Hero frame

## Spacing

### Official Variables

None.

### Inferred Spacing

16 spacing tokens from repeated layout values:

- Page padding: `80px` desktop, `~18px` mobile hero
- Nav gap: `48px`
- Content stacks: `12px`, `14px`, `24px`, `36px`
- Card padding: `32px`

### Manual Review Needed

- Section heights are fixed in Figma (927px, 1104px, etc.) — use fluid spacing in code, not fixed pixel section heights

## Radius

7 radius tokens:

- Cards/images: `20px` (outer), `10px` (inner)
- Check icons: `12px`
- Pills: `50px`, `60px`
- Avatars: full round

## Shadows / Effects

6 effect tokens (no traditional box shadows):

- Noise overlay: `opacity 0.3`, `mix-blend-mode: overlay`
- Header: `backdrop-filter: blur(20px)`
- Hero image: `mix-blend-mode: lighten`
- CTA text: `opacity 0.8`

**Manual review:** Mask groups and blend modes cannot be expressed as simple CSS variables alone.

## Layout Tokens

10 layout tokens:

- Container: `1260px` nav width inside `1440px` artboard
- Header: `90px` desktop / `130px` mobile (stacked nav)
- Artboard references: `440px` mobile, `1440px` desktop

**No official responsive breakpoints** — only separate artboards, not a breakpoint system.

## CSS Output

Generated file:

```txt
.cursor-output/figma/design-tokens.css
```

Ready to merge into `src/styles/main.css` `@theme` block during a future styling pass. **Not applied automatically** per command rules.

## JSON Output

Generated file:

```txt
.cursor-output/figma/design-tokens.json
```

Machine-readable token map with `official` vs `inferred` separation.

## Warnings

1. **All tokens are inferred** — do not treat them as official Figma design-system variables.
2. **Partial extraction scope** — primary node is mobile Hero only; desktop values come from supplemental audit.
3. **Font licensing** — `Modern Negra Demo` and `Mona Sans` need verification before `@font-face` import.
4. **Gradients and blend modes** — commented in CSS file; require hand-authored implementation.
5. **Existing project tokens** — `src/styles/main.css` still has placeholder `--font-main` and `--color-brand: #111111`; reconcile when integrating.

## Recommended Next Commands

1. `user-export-figma-assets` — export monstera leaves, cocktail photos, icons, noise texture
2. `user-generate-section-map` — map Desktop sections to Vue `src/sections/` components
