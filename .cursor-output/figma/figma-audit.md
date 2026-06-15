# Figma Audit Before Code

## Target

Figma source: [Cocktail GSAP Website (Copy)](https://www.figma.com/design/MmNz1rHoj2PGzFqT6309PX/Cocktail-GSAP-Website--Copy-?node-id=42001-1163)

- **File key:** `MmNz1rHoj2PGzFqT6309PX`
- **Node ID:** `42001:1163`
- **Frame name:** `Desktop`
- **Canvas size:** 1440 × 6697 px (single desktop frame)

## Audit Status

**Completed**

## Screenshot

Screenshot captured: **Yes**

- Rendered PNG: 441 × 2048 px (clamped from 1440 × 6697)
- Original frame size: 1440 × 6697 px
- Short-lived asset URL captured during audit (7-day MCP expiry)

## Detected Sections

1. **Hero** (`42001:1164`) — Header/navbar, oversized “MOJITO” display type, hero cocktail photo, tagline, CTA text, scroll indicator, decorative monstera leaves, noise overlay
2. **Menu / Drinks lists** (`42001:1187`) — Two-column price lists (“Most popular cocktails” / “Most loved mocktails”), central cocktail image, corner monstera leaves
3. **Philosophy + social proof + bento gallery** (`42001:1244`) — “Where every detail matters” heading, badge pill, rating block, avatar stack, bento image grid with feature checklist card
4. **The ART** (`42001:1297`) — Large background wordmark, masked circular cocktail/bartender composite, dual checklist columns, “Sip-Worthy Perfection” subheading
5. **Bartender showcase** (`42001:1330`) — Full-width bartender photo, floating cocktail cutouts, craft/passion headline
6. **Featured cocktails carousel** (`42002:26`) — Tab navigation, central drink image, side prev/next labels, recipe heading, descriptive copy
7. **Contact / footer** (`42001:1337`) — “Where to Find Us”, address, phone, email, hours, social icons, cocktail assortment image, monstera leaves

**Total top-level landing sections:** 7 content blocks + embedded header in hero

## Design Tokens

> **Note:** `get_variable_defs` returned an empty object `{}`. No official Figma variables were bound to this frame. Values below are **inferred from raw layer styles**, not confirmed design-system tokens.

### Colors

| Role            | Inferred value                     | Usage                                             |
| --------------- | ---------------------------------- | ------------------------------------------------- |
| Page background | `#000000` / radial gray gradients  | Section backgrounds                               |
| Primary text    | `#FFFFFF`, `#EFEFEF`               | Body copy, nav                                    |
| Accent gold     | `#E7D393`                          | Display headings, menu item titles                |
| Muted display   | `#898989`, `#505050`               | Large background typography (“MOJITO”, “The ART”) |
| Card gradient   | `#313131` → `#0F0F0F`              | Feature card, avatar pill                         |
| Badge accent    | `#B2B6F4`                          | “+12k” avatar chip                                |
| Nav blur header | `backdrop-blur(20px)` on dark hero | Sticky-style header treatment                     |

### Typography

| Style           | Inferred font       | Sizes observed                | Notes                                                                               |
| --------------- | ------------------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| Display / brand | `Modern Negra Demo` | 30px, 36px, 50px, 64px, 330px | Demo font name in Figma — verify licensing or substitute (e.g. high-contrast serif) |
| Body / UI       | `Mona Sans`         | 14px–24px                     | Medium/Bold/SemiBold weights used                                                   |
| Menu prices     | Mona Sans Medium    | 22px                          | Em dash prefix (`— $10`)                                                            |
| Section labels  | Mona Sans Medium    | 20px                          | Column headings                                                                     |

**Line heights observed:** 18px, 20px, 24px, 28px, 30px, 36px, 46px, 0.9 (display)

### Spacing

| Pattern                 | Value                                                            |
| ----------------------- | ---------------------------------------------------------------- |
| Page horizontal padding | 80px (left content), 90px (navbar container width 1260 centered) |
| Nav link gap            | 48px                                                             |
| Menu row gap            | 36px between items                                               |
| Checklist item gap      | 14px                                                             |
| Bento card radius       | 20px                                                             |
| Pill/badge radius       | 50px–60px                                                        |
| Section heights         | 837px–1104px (fixed desktop blocks)                              |

### Radius

- Cards/images: `20px`, inner images `10px`
- Check icon container: `12px`
- Avatar chips: circular (`10000px` in export = full round)
- Page frame wrapper: `30px` (design canvas only)

### Shadows / Effects

- **Noise texture overlay** on most sections (`mix-blend-overlay`, ~30% opacity) — repeated asset
- **mix-blend-lighten** on hero/menu cocktail photos
- **Radial gradient backgrounds** encoded as inline SVG in export
- **backdrop-blur(20px)** on header
- **Mask group** in “The ART” section (non-trivial to reproduce)
- Rotated/scaled monstera leaves at multiple angles

## Assets

### Export as SVG

- Logo mark (`image 13`, 32×32)
- Star rating icons (`fi_149763`)
- Check icons (`Check icon` component instance)
- Carousel arrow controls (`right` frames)
- Social icons (Instagram, X, Facebook frames)
- Decorative lines (`Line 11`–`Line 16`) — could be CSS borders instead
- Scroll indicator line (`Line 12`)

### Export as PNG / WebP

- Hero cocktail composite (`Screenshot 2025-05-08…`)
- Menu central cocktail (`Screenshot 2025-05-09 at 12.04.57 PM 2`)
- Monstera leaf (reused across sections — export once, reuse)
- Noise texture overlay (tileable grain)
- Bento gallery photos (`image 23`, `image`, `image 38`, etc.)
- Masked bartender/cocktail composite (“The ART” mask group)
- Bartender hero photo (`image` in showcase section)
- Floating cocktail cutouts (aperol spritz, martini glass)
- Carousel drink image (`Screenshot 2025-05-09 at 3.18.04 PM`)
- Footer cocktail assortment (`assortment-cocktails 2`)
- Customer avatars (3 profile images)

### CSS-only, do not export

- Section radial gradient backgrounds (rebuild with CSS `radial-gradient`)
- Dark card gradients (`#313131` → `#0F0F0F`)
- Pill badge backgrounds
- Horizontal/vertical divider lines (prefer CSS `border` or `::after`)
- “+12k” text chip (HTML + CSS)
- Tab underline active state (border-bottom)

## Layout Notes

- Entire page is a **single desktop frame** with stacked sections; no tablet/mobile frames found.
- Layout relies heavily on **absolute positioning** inside fixed-height section frames rather than consistent auto-layout.
- Hero and menu sections center cocktail imagery with large negative offsets and overflow clipping.
- Bento section uses a **manual grid** of fixed-size cards (330px, 580px, 480px, 780px widths) — will need explicit CSS Grid for fidelity.
- Carousel section places flanking labels and arrows with absolute coordinates around a center drink image.
- Header is embedded inside hero, not a separate global component frame.
- Several layers extend beyond section bounds (monstera leaves, oversized typography).

## Responsive Risks

- **No mobile or tablet frames** in the audited node — responsive behavior is undefined.
- Fixed section heights (900px–1104px) will not translate directly to fluid layouts.
- Two-column menu and carousel side labels will require breakpoint-specific stacking.
- 330px display typography (“MOJITO”, “The ART”) needs clamp/scaling strategy.
- Mask-group artwork and `mix-blend-*` effects may degrade on small screens or low-end GPUs.
- Absolute-positioned decorative leaves will need simplified or hidden treatment on mobile.

## Accessibility Risks

- **Heading hierarchy unclear in Figma** — multiple large display text layers; need one `<h1>` and logical `<h2>`/`<h3>` mapping in code.
- **Navigation items are plain text**, not annotated as links; need `<nav>` + anchor targets or skip-to-section behavior.
- **“View cocktails”** reads as CTA but is text only — needs `<a>` or `<button>` with accessible name.
- **Carousel tabs and arrows** need keyboard support, `aria-selected`, and focus states.
- **Social icons** are icon-only — require `aria-label` or visible text.
- **Star rating** is visual only — should include screen-reader text (e.g. “4.5 out of 5 stars”).
- **Customer avatars** are decorative group imagery; “+12k” needs text alternative in context.
- **Low contrast risk** on muted gray display text (`#505050`, `#898989`) against dark backgrounds for smaller sizes.
- **mix-blend / noise overlays** should not reduce text readability; verify contrast after implementation.
- Many images exported with **empty `alt` in reference code** — meaningful vs decorative alt text required.
- No `prefers-reduced-motion` consideration in design for planned GSAP parallax/scroll effects.

## Naming Issues

| Issue                   | Examples                                                                                |
| ----------------------- | --------------------------------------------------------------------------------------- |
| Generic frame names     | `Section` (used 5×), `Frame 870`, `Frame 871`, `Frame 858`                              |
| Typos                   | `poitns` instead of “points”                                                            |
| Screenshot-based names  | `Screenshot 2025-05-08 at 11.04.12 PM 1`                                                |
| Reused long stock names | `vibrant-green-monstera-deliciosa-leaf-isolated-transparent-background…` (numbered 1–3) |
| Ambiguous nav frames    | inner frames named `nav` used for menu rows and checklist rows                          |
| Misleading layer reuse  | checklist frame named `Frame 854` duplicated in multiple sections                       |

**Recommendation:** Map to semantic frontend section names (`hero`, `menu`, `philosophy`, `the-art`, `showcase`, `carousel`, `contact`) — do not copy Figma layer names into CSS.

## Component Opportunities

| Component             | Reuse potential                             |
| --------------------- | ------------------------------------------- |
| `SiteHeader` / Navbar | Logo + 4 nav links + blur background        |
| `MenuColumn`          | Title + list of `MenuItem` rows             |
| `MenuItem`            | Name, meta line, price                      |
| `FeatureChecklist`    | Icon + label rows (used in 3 sections)      |
| `RatingBlock`         | Stars + score + customer count              |
| `AvatarStack`         | Overlapping avatars + count chip            |
| `BentoCard`           | Image or gradient card with radius          |
| `SectionBadge`        | Pill label (“Best Cocktails”)               |
| `CocktailCarousel`    | Tabs + main visual + prev/next + copy panel |
| `ContactBlock`        | Title + detail lines                        |
| `SocialLinks`         | Icon row                                    |
| `DecorativeLeaf`      | Positioned parallax asset                   |

## Code Connect Opportunities

- No Code Connect mappings found in the current Vue codebase.
- Figma **component instances** detected: `Check icon` — good candidate for a shared `UiCheckIcon` Vue component.
- Navbar, carousel tabs, and social icons could be mapped later via Code Connect after components exist in `src/components/ui/`.

## Implementation Plan

Recommended next commands:

1. `user-extract-design-tokens` — formalize inferred colors, type scale, spacing, radii into Tailwind `@theme` tokens
2. `user-export-figma-assets` — export and optimize SVG/PNG/WebP assets (monstera, cocktails, avatars, icons)
3. `user-generate-section-map` — produce frontend section map with semantic IDs matching scroll anchors

Subsequent pipeline (after above):

4. `user-generate-html-skeleton` / Vue section components
5. GSAP scroll animations (parallax leaves, text reveals, carousel transitions) with `prefers-reduced-motion` fallbacks

## Warnings

1. **No Figma variables** — all tokens must be extracted/inferred; label official vs inferred during token export.
2. **Demo fonts** (`Modern Negra Demo`, `Mona Sans`) — confirm availability/licensing; plan webfont substitutes before build.
3. **Content inconsistencies** — menu lists use wine/beer names under “cocktails/mocktails”; carousel copy references Margarita while tab is “Raspberry Mojito”. Developer should normalize copy.
4. **Desktop only** — responsive strategy must be defined manually; design does not specify breakpoints.
5. **Heavy visual effects** — `mix-blend-mode`, masks, noise overlays, and parallax leaves will need performance-conscious GSAP/CSS implementation.
6. **MCP asset URLs expire in 7 days** — export assets to `src/assets/` promptly via `user-export-figma-assets`.
7. **Project name mismatch** — Figma brand is “Velvet Pour”; repo is `cocktail-landing`. Align branding during implementation.
8. **Single-page anchor nav expected** — nav items (`Cocktails`, `About Us`, `The Art`, `Contact`) likely map to section IDs, not separate routes.
