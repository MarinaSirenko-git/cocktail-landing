# Layout Review Against Figma

## Inputs

Figma target:

```txt
https://www.figma.com/design/MmNz1rHoj2PGzFqT6309PX/Cocktail-GSAP-Website--Copy-?node-id=42001-1163
Frame: Desktop (42001:1163) — 1440×6697
```

Implementation URL:

```txt
http://localhost:5173/
```

## Status

Completed

## Screenshots

| Source | File | Notes |
|--------|------|-------|
| Figma full page | `.cursor-output/figma/review-figma-desktop.png` | MCP capture, 441×2048 (scaled from 1440×6697) |
| Figma hero | `.cursor-output/figma/review-figma-hero.png` | Section 42001:1164 |
| Implementation desktop | `.cursor-output/figma/review-impl-desktop-1440.png` | 1440×900 viewport, full page |
| Implementation tablet | `.cursor-output/figma/review-impl-tablet-768.png` | 768×1024 viewport, full page |
| Implementation mobile | `.cursor-output/figma/review-impl-mobile-390.png` | 390×844 viewport, full page |

- Figma screenshot captured: **Yes**
- Implementation screenshot captured: **Yes**
- Viewports reviewed: **1440px, 768px, 390px**

## Summary

### Overall match

```txt
Medium
```

Structure and content are largely in place (7 sections, correct order, dark luxury theme, gold accents, monstera decorations). However, several **desktop layout compositions** differ materially from Figma — especially Hero, The ART mask, Philosophy bento imagery, Showcase scale, and Carousel tab styling. Typography and fonts are approximate (display/body stacks referenced but not loaded).

### Main mismatch areas

1. **Hero desktop composition** — Figma uses centered MOJITO + cocktail with copy in bottom corners; implementation uses a 2-column grid (copy left, image right).
2. **The ART circular mask composite** — Figma shows glass-distortion bartender shot; implementation uses plain `rounded-full` crop.
3. **Philosophy bento gallery** — two exported images appear broken/low-quality; Figma shows full photo grid.
4. **Carousel UI** — Figma uses underline text tabs and horizontal rules; implementation uses bordered pill buttons.
5. **Typography / fonts** — Figma relies on Modern Negra Demo + Mona Sans; implementation falls back to system/serif stacks.

## Critical Issues

| Section | Issue | Figma expectation | Current implementation | Recommended fix |
|---------|-------|-------------------|------------------------|-----------------|
| Hero | Desktop layout structure | Centered hero: oversized MOJITO behind cocktail; eyebrow + h1 bottom-left; body + text CTA bottom-right; scroll indicator on right | `lg:grid-cols-2` splits copy and image vertically centered in columns | Rebuild hero as absolute/stacked composition on `lg+`: center figure, anchor copy blocks to bottom corners per Figma audit |
| Hero | CTA treatment | “View cocktails” appears as text link (no filled pill in Figma hero) | White pill button (`bg-surface rounded-button`) | Match Figma: text link or minimal underline CTA; keep accessible focus styles |
| The ART | Masked visual | Circular glass-distortion composite using mask asset + bartender photo | `rounded-full` photo crop; mask PNG hidden/unused | Implement CSS `mask-image` composite with `art-section-mask.png`; position checklists left/right of figure |
| Philosophy | Bento image quality | Four clear photos in grid (guests, garnish, row, bartender) | `bento-guests-drinking` and `bento-cocktail-garnish` exports ~1–2 KB — likely broken in UI | Re-export from Figma; verify in browser before layout tweaks |
| Showcase | Section prominence | Full-width bartender pour photo dominates section before headline | Image inside `rounded-card` container with standard section padding — feels smaller/card-like | Use full-bleed or near full-bleed figure (`max-w-none` / breakout); reduce radius; match Figma 968px-wide photo scale |
| Carousel | Tab visual pattern | Text tabs with baseline rules; active tab underlined; minimal chrome | Bordered pill `role="tab"` buttons | Restyle tabs: text-only, bottom border/underline for active state; add divider lines per Figma |
| Typography | Display fonts | Modern Negra Demo for brand/display; Mona Sans for UI | Theme references fonts but webfonts not loaded — fallback appearance | Load licensed/substitute webfonts; map to `font-display` / `font-sans` |

## Medium Issues

| Section | Issue | Figma expectation | Current implementation | Recommended fix |
|---------|-------|-------------------|------------------------|-----------------|
| Hero | MOJITO layering | MOJITO behind cocktail, cocktail uses `mix-blend-lighten`, ice cube above glass | MOJITO centered in section; cocktail in right column — layering differs | Position MOJITO absolute center; single cocktail stack in center on desktop |
| Hero | Section height | ~927px fixed desktop hero block | `lg:min-h-[927px]` present but grid layout changes proportions | After layout restructure, enforce min-height and vertical anchor points |
| Menu | Column + image layout | Lists flank central cocktail; cocktail large and centered between columns | Three-column grid at `lg` — directionally correct | Tighten column widths, increase center image scale, match 36px row gaps (`space-y-9` ≈ 36px — close) |
| Menu | Column label typography | Gold labels ~20px/30px line-height | `text-xl` / `lg:text-[20px]` — close | Verify font family once webfonts loaded |
| Philosophy | Bento grid composition | Feature card sits in grid between images with specific spans | `md:grid-cols-12` with spans — structurally similar | Fine-tune col spans and card placement after images fixed |
| Philosophy | Avatar chip | Overlapping avatars with +12k badge adjacent to rating | Rating block separate from `aria-hidden` avatar row below | Move avatar stack adjacent to rating (single visual group) per Figma |
| The ART | Checklist placement | Lists flank masked circle left/right | Lists below figure in stacked layout on mobile; side-by-side only at `lg` | On desktop, position lists absolute left/right of circle per Figma |
| The ART | Heading position | “Sip-Worthy Perfection” below image + lists | Same order — OK on structure | Ensure heading spacing matches Figma vertical rhythm |
| Showcase | Floating cocktails | Decorative aperol/martini cutouts overlap scene edges | Present but `hidden lg:block` with approximate offsets | Tune absolute positions/sizes against Figma screenshot |
| Carousel | Side prev/next labels | Text labels with arrow icons and horizontal rules | Buttons with text visible at `lg` — missing divider lines | Add decorative rules; align typography to Figma |
| Carousel | Drink image | Tall raspberry mojito in coupe/martini style per design | Exported drink image may differ from Figma active tab visual | Confirm asset match; re-export if needed |
| Contact | Layout | Copy left, cocktail assortment overlapping bottom-right | Two-column grid — generally correct | Increase overlap/absolute positioning of footer cocktail image; tune column spacing |
| Contact | Social icons | Circular outlined icons in row | Similar treatment — close | Minor size/spacing alignment |
| Header | Container padding | 1260px content width, ~90px horizontal padding | `max-w-[1260px] lg:px-[90px]` — matches audit | OK — verify after hero restructure |
| Mobile | Hero stacking | Mobile Figma frame (42001:1366) centers copy and scales display type | Centered copy + image stack — reasonable | Compare against mobile Figma frame in follow-up (not fully diffed here) |

## Low Priority Polish

| Section | Issue | Recommended fix |
|---------|-------|-----------------|
| Hero | Scroll indicator | Replace `↓` text with Figma line/arrow icon styling |
| Hero | Monstera leaf rotation/scale | Tune absolute positions and rotation to match Figma parallax intent |
| Menu | Monstera framing | Adjust crop overlap at section edges |
| Philosophy | “Best Cocktails” badge | Slightly increase pill padding to match 20px horizontal Figma spec |
| Philosophy | Star rating | Figma shows 4.5 with visual half-star treatment — verify |
| Cards | Radius | Figma uses 20px card radius — `rounded-card` (1.25rem) is close |
| Cards | Feature card shadow | Figma card gradient without heavy shadow — OK |
| Footer | Border | Thin top border present — matches |
| Global | Noise overlay | 30% opacity grain — present; verify intensity |
| Global | GSAP motion | Figma implies scroll/parallax — not implemented (expected) |
| Nav | Link casing | Figma nav appears title case; implementation matches |
| Showcase | Not in nav | Figma nav excludes showcase — matches implementation |

## Section-by-section Review

### Header

- **Match:** Logo + wordmark, four anchor links, sticky dark header with blur.
- **Gap:** Desktop nav styling close; mobile uses Menu button (Figma mobile stacks nav — acceptable).
- **Severity:** Low–Medium (mobile menu styling unpolished vs Figma mobile frame).

### Hero

- **Match:** MOJITO display type, gold eyebrow, h1 text, body copy, monstera leaves, noise overlay, mix-blend on cocktail.
- **Gap:** **Critical** — desktop layout is 2-column rather than Figma’s centered composition with bottom-anchored copy blocks.
- **Gap:** CTA is pill button vs text link.

### Menu

- **Match:** Two columns + center cocktail, gold column titles, price em-dash pattern, decorative leaves.
- **Gap:** Medium — center image scale and vertical rhythm; content still uses Figma placeholder wine/beer names (content issue).

### Philosophy

- **Match:** Badge, h2, body, rating, bento grid concept, feature card with checklist.
- **Gap:** **Critical** broken bento images; avatar stack placement Medium.

### The ART

- **Match:** Background wordmark, dual checklists, closing h2.
- **Gap:** **Critical** mask composite missing; checklist flanking layout Medium.

### Showcase

- **Match:** Bartender image, floating cocktails, headline + subcopy.
- **Gap:** Medium — image not full-bleed; floating drink positions approximate.

### Carousel

- **Match:** Tabs, center drink, side labels, recipe copy block.
- **Gap:** Medium–Critical tab styling; drink asset verification.

### Contact / Footer

- **Match:** “Where to Find Us”, address/hours/contact/socials, cocktail assortment, copyright footer.
- **Gap:** Medium — image overlap and grid density.

## Tailwind Fix Plan

Suggested changes only — **do not apply in this command**.

```txt
Hero (lg+):
- Replace lg:grid-cols-2 hero content with relative min-h-[927px] container.
- Absolute center: display MOJITO + figure stack.
- Absolute bottom-left: eyebrow + h1.
- Absolute bottom-right: body + text CTA.
- Keep mix-blend-lighten on hero img.

The ART:
- Use aspect-square figure with mask utilities or custom mask class.
- lg:absolute positioning for left/right ul columns flanking figure.
- Increase wordmark text-display opacity/size tuning.

Philosophy:
- After image re-export, keep md:grid-cols-12 but adjust spans to match Figma proportions.
- Move avatar stack into rating flex group (remove aria-hidden wrapper duplication).

Showcase:
- Remove rounded-card on main figure; use w-full max-w-[968px] mx-auto or breakout.
- Refine floating cocktail absolute offsets (left-8, right-8, etc.).

Carousel:
- Replace pill tab classes with text tabs: border-b border-border, active:border-accent.
- Add horizontal rules near prev/next controls.

Contact:
- Position footer cocktail figure with lg:absolute bottom-0 right-0 overlap.
- sm:grid-cols-2 contact grid — OK; tune gap-8 → gap-10 if needed.

Global:
- Section padding py-16 md:py-24 — increase to match fixed Figma section heights where needed.
- Container: keep max-w-[1260px] px-5 lg:px-20 (80px) — close to Figma 80–90px.
```

## Theme Token Fix Plan

```txt
src/styles/theme.css
- Load @font-face for Modern Negra Demo substitute + Mona Sans (or approved alternatives).
- Consider --text-display-xl-size token usage in Hero/The ART wordmarks.
- Verify --color-accent (#e7d393) against screenshot — appears close.
- --color-display (#505050) for The ART wordmark — verify contrast.
- Optional: --spacing-section increase from 6rem to ~7–8rem for taller Figma sections.
- Optional: add --radius-card: 20px (already 1.25rem) — OK.
```

## Assets / Image Fix Plan

```txt
- Re-export bento-guests-drinking and bento-cocktail-garnish from Figma (Critical).
- Implement art-section-mask.png as CSS mask on bartender photo (Critical).
- Verify carousel-drink-raspberry-mojito matches Figma active tab visual.
- Export missing carousel drink images for inactive tabs (Classic Mojito, Violet Breeze, Tipsy Tales).
- Showcase bartender-photo: use wider crop at full section width.
- Confirm hero-cocktail-mojito includes ice cube stacking as in Figma (may be same asset).
```

## Responsive Notes

- **Desktop (1440px):** Primary comparison completed against Figma Desktop frame.
- **Tablet (768px):** Implementation stacks sensibly; no Figma tablet frame — issues reported as implementation risks only (menu columns stack, hero remains centered — OK).
- **Mobile (390px):** No pixel diff against Figma in this pass; mobile Figma frame `42001:1366` exists for follow-up. Implementation shows hamburger menu, stacked hero, stacked menu — directionally reasonable.
- **Risk:** Hero 2-column only at `lg`; below `lg` centered stack diverges less from mobile Figma than desktop does from desktop Figma.

## Manual Review Needed

1. Side-by-side Hero at 1440px after layout restructure (highest priority).
2. The ART mask composite visual QA once CSS mask is implemented.
3. Philosophy bento grid after image re-export.
4. Compare mobile implementation against Figma frame `42001:1366`.
5. Font licensing/substitution for Modern Negra Demo and Mona Sans.
6. GSAP scroll animations (out of scope for layout pass but affect perceived match).

## Warnings

- Figma variables were empty in audit — all comparisons use inferred tokens.
- Figma full-page screenshot is height-clamped; fine section detail uses per-section MCP captures.
- Implementation long-screenshot compresses vertical detail — section screenshots used for Hero comparison.
- Menu/carousel copy in Figma source contains placeholder wine names and mismatched recipe text — content parity not evaluated here.
- Review did not modify any project source files.

## Recommended Next Commands

1. `user-fix-layout-against-figma`
2. `user-export-figma-assets` (re-export broken bento images)
3. `user-run-web-perf-audit`
