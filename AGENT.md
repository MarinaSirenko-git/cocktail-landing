# AI-assisted Development Workflow

This project was built using an AI-assisted frontend workflow in Cursor.

The goal was not to replace manual development, but to reduce repetitive work during landing page production. AI handled scaffolding and configuration; the developer retains ownership of design, content, accessibility, performance, and final acceptance.

## Tools Used

| Tool | Role in this project |
| --- | --- |
| **Cursor** | AI-assisted editing and custom command execution |
| **Custom Cursor commands** | Repeatable setup steps with explicit safety rules |
| **Vite** | Dev server and production bundling |
| **Vue 3 / TypeScript** | Component-based landing page foundation |
| **Tailwind CSS** | Utility-first styling with project theme tokens |
| **GSAP** | Animation library (installed; sections not animated yet) |
| **Cloudflare Pages** | Recommended static hosting target (not configured yet) |
| **Git / GitHub** | Version control (not initialized in the repo yet) |

## Custom Commands Used

Only commands that were run for this project are listed here.

| Command | Purpose | Status |
| --- | --- | --- |
| `user-create-landing-starter-vue` | Scaffold Vite + Vue 3 + TypeScript, install GSAP, create folder structure and layout components | Completed |
| `user-setup-styles-tailwind` | Install Tailwind CSS, update Vite config, configure `main.css` | Completed |
| `user-setup-project-readme` | Generate project README from detected stack and scripts | Completed |
| `user-setup-agent-doc` | Document this AI-assisted workflow | Completed |

### Related commands not used here

| Command | Notes |
| --- | --- |
| `user-create-landing-starter-html` | Vanilla HTML starter; Vue was chosen instead |
| `user-setup-styles-css` | Plain CSS / BEM architecture; Tailwind was chosen instead |

## What Was Automated

- Vite + Vue 3 + TypeScript project scaffolding in the current directory
- Dependency installation (`vue`, `gsap`, `tailwindcss`, `@tailwindcss/vite`)
- Base folder structure (`assets`, `components`, `sections`, `composables`, `styles`)
- Layout components (`SiteHeader`, `SiteFooter`) and semantic `App.vue` shell
- Tailwind CSS integration in `vite.config.ts` and `src/styles/main.css`
- Brand theme tokens (`--font-main`, `--color-brand`) in CSS
- Skip-link accessibility styles in the global stylesheet
- README generation from `package.json` and project layout
- Production build verification via `npm run build`

## What Was Manually Reviewed

The developer should review and approve:

- Choice of **Vue 3** over vanilla HTML for this landing page
- Choice of **Tailwind CSS** over a layered plain CSS architecture
- Starter layout copy and branding (e.g. site name in `SiteHeader`)
- README accuracy before sharing the repository publicly
- This `AGENT.md` document for portfolio transparency

Work not yet done and therefore not reviewed as complete:

- Landing section content and visual design
- GSAP animations and `prefers-reduced-motion` behavior
- Responsive layout across breakpoints
- Image optimization and lazy-loading strategy
- Accessibility audit beyond the starter skip link and landmarks
- Performance audit on a deployed URL
- Cloudflare Pages connection and production deployment

## Developer Decisions

| Decision | Rationale |
| --- | --- |
| Vue 3 + TypeScript | Component structure for reusable sections and layout |
| Tailwind CSS | Faster styling iteration for a marketing landing page |
| GSAP from the start | Motion and scroll animations planned for section reveals |
| Cloudflare Pages (planned) | Static `dist` output maps cleanly to edge hosting |
| Minimal starter scope | Sections, content, and polish deferred to later work |

## Quality Checks

| Check | Status |
| --- | --- |
| `npm run build` | Passed after starter and Tailwind setup |
| TypeScript (`vue-tsc`) | Passed as part of build |
| Semantic HTML landmarks | Present in starter (`header`, `main`, `footer`) |
| Skip link | Present in `App.vue` |
| Responsive layout | Not implemented yet |
| GSAP animations | Dependency installed; not implemented yet |
| Accessibility audit | Not run yet |
| Performance audit | Not run yet |
| Git repository | Not initialized yet |
| Deployment | Documented in README; not deployed yet |

## Notes

AI was used as a development assistant for repeatable project setup tasks. Final implementation decisions, review, and acceptance remain with the developer.

When new commands are run (sections, deploy, audits, Git workflow), update the **Status** tables in this file so it stays accurate.
