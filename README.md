# Velvet Pour

[EN](#en) | [RU](#ru)

---

<a id="en"></a>

## Velvet Pour — Responsive Landing Page

Front-end portfolio case study. Engineering JSMastery mockups at **1440px** and **440px** into a Vue 3 landing that holds up across every screen in between — with fluid scaling, hand-tuned per-section reflow, GSAP motion, four-locale i18n, and a performance-focused asset pipeline deployed on Cloudflare Workers.

**Stack:** Vue 3 · TypeScript · Vite · Tailwind CSS · GSAP · vue-i18n · Cloudflare Workers Static Assets  
**Lighthouse (desktop):** Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100  
**Lighthouse (mobile):** Performance 97 · Accessibility 100 · Best Practices 100 · SEO 100

🔗 **Live demo:** [https://cocktail-landing.marina-sirenko1-80f.workers.dev](https://cocktail-landing.marina-sirenko1-80f.workers.dev)  
🎨 **Design:** mockup provided by [JavaScript Mastery](https://jsmastery.com) community · front-end implementation by me

### Context

The mockup was provided by the [JavaScript Mastery](https://jsmastery.com) community for **Velvet Pour**, a cocktail-bar landing page — two anchor frames at **1440px** (desktop) and **440px** (mobile). Only the hero had a dedicated mobile composition; every other section and everything between those two widths needed deliberate adaptation.

I owned every responsive decision: breakpoints, reflow order, what scales with `clamp()`, what hides, how decorative elements and GSAP scenes translate to smaller viewports.

### The challenge

Two fixed artboards at 1440px and 440px encode proportions and hierarchy, not a complete responsive spec for every viewport in between. Translated literally, sections overflow on a laptop or tablet and break on narrower phones. The work was bridging those anchors into a system that scales by content and ratio while keeping the dark luxury character — without per-device hacks or layout breaks between breakpoints.

Beyond layout, the mockup shipped a **heavy media footprint**: hero background video, tiled grain texture across multiple sections, carousel drink photography, bento imagery, CSS-masked bartender photo, decorative monstera leaves, and brand marks — many assets in multiple formats after optimization. Typography added another layer: **six self-hosted font families** (Modern Negra Demo, Mona Sans, DM Serif Text, plus locale-specific display serifs for RU / ZH / TH) with weight variants and `font-display: swap`, all wired into a four-locale i18n system where display type must switch cleanly per language.

Each section also needed its own **GSAP motion language**, not a single reusable fade-in:

| Section | Animation types |
| --- | --- |
| **Header** | Scroll-triggered backdrop blur transition; smooth anchor scrolling via ScrollToPlugin |
| **Hero** | SplitText character stagger on load; subtitle line reveal; scroll-scrubbed parallax on decorative leaves and CTA arrow; pinned, scroll-scrubbed background video (`currentTime` sync) |
| **Menu** | Scroll-scrubbed parallax on side decorative leaves |
| **Philosophy** | SplitText word reveal; one-time scroll-triggered stagger on bento grid cards |
| **The Art** | Pinned scroll-scrubbed scene; CSS mask scale reveal on bartender photo; choreographed title fade and copy entrance |
| **Carousel** | Per-slide stagger reveal (image, title, heading, copy) on tab change |
| **Contact / Footer** | SplitText title reveal; staggered contact block entrance; subtle decorative leaf parallax |

That combination — rich visuals, multiple font files, and scroll-linked animation on nearly every section — creates real pressure on **Lighthouse**: large image payloads, render-blocking fonts, and main-thread work from GSAP and video. The engineering goal was not just to ship the motion design, but to **bring metrics to a high bar anyway** — dynamic GSAP code-splitting per section, deferred hero video mount, WebP + `srcset` delivery, compressed tiled noise and carousel assets, `prefers-reduced-motion` guards, and edge static hosting — so Performance, Accessibility, Best Practices, and SEO could still reach **100 on desktop** despite the visual density of the page.

### What I built

- **Full responsive system, 360 → 1920+.** Tailwind CSS with desktop-first breakpoints (`lg` / `md`) and `clamp()`-based fluid typography, spacing, and decorative sizing so the layout reads consistently at any width.
- **Six composed sections** in a single-page flow: Hero, Menu, Philosophy, The Art, Featured Cocktails carousel, and Contact footer — semantic landmarks, skip link, and anchor navigation with header offset compensation.
- **Per-section reflow strategies** where naive stacking would break the design:
  - **Hero:** layered parallax leaves, scroll-scrubbed background video with poster fallback, SplitText subtitle animation, and a mobile composition aligned to the **440px** mockup.
  - **Philosophy:** bento-style grid that softens from asymmetric desktop capsules into readable stacked cards on mobile.
  - **The Art:** CSS mask composite for the bartender photo, scroll-triggered title reveal, and oversized display type that scales fluidly without clipping.
  - **Carousel:** underline tab pattern on desktop; horizontal scroll-snap track on mobile with arrow controls and localized `aria-label`s.
  - **Header:** sticky blurred backdrop on scroll, full-screen mobile navigation overlay with body scroll lock, and inline locale switcher on both breakpoints.
- **Internationalization (EN / RU / ZH-Hans / TH)** via vue-i18n — copy, SEO meta tags, and self-hosted locale display fonts (Cormorant Garamond, Noto Serif SC, Noto Serif Thai) with early `lang` initialization to avoid flash of wrong typography.
- **GSAP animation layer** with dynamic imports per section (`SplitText`, `ScrollTrigger`, `ScrollToPlugin`) to keep the initial bundle lean; all motion respects `prefers-reduced-motion`.
- **Performance & delivery:** WebP + `srcset` for carousel drinks and logo, optimized tiled noise texture (`image-set` with lossless WebP + PNG fallback), compressed art-section mask, lazy/deferred hero video mount, SEO essentials, edge deployment on Cloudflare Workers Static Assets.

### Engineering approach

The mockups defined two anchor sizes — 1440px and 440px; every responsive and interaction decision for the range in between was mine to make and justify — adaptation treated as a design problem, not a mechanical resize.

Verified across viewport widths and physical devices during development (phones, tablets, laptops, ultrawide). GSAP timelines are scoped per section with cleanup on unmount to avoid duplicate ScrollTriggers when switching locales or resizing.

AI-assisted automation in Cursor handled repetitive scaffolding and config; layout, motion tuning, i18n behavior, accessibility fixes, image optimization, and deployment decisions stayed manual.

<!-- TODO: add responsive showcase screenshots, e.g. ![Responsive hero](docs/responsive-hero.png) -->

### Results

#### Lighthouse — desktop

Audited on [production URL](https://cocktail-landing.marina-sirenko1-80f.workers.dev/) (Chrome, simulated desktop).

| Category | Score |
| --- | --- |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

| Metric | Value |
| --- | --- |
| First Contentful Paint | 0.6 s |
| Largest Contentful Paint | 0.6 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 0.8 s |

#### Lighthouse — mobile

Audited on [production URL](https://cocktail-landing.marina-sirenko1-80f.workers.dev/) (Chrome, simulated mobile).

| Category | Score |
| --- | --- |
| Performance | 97 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

| Metric | Value |
| --- | --- |
| First Contentful Paint | 2.0 s |
| Largest Contentful Paint | 2.0 s |
| Total Blocking Time | 40 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 3.4 s |

#### Engineering outcomes

| Outcome | Detail |
| --- | --- |
| Image delivery | ~1.7 MB Lighthouse-identified savings addressed — tiled noise (1.5 MB → ~114 KB WebP tile), carousel WebP srcsets, logo and mask recompression |
| Accessibility | Semantic structure, skip link, localized carousel control labels, reduced-motion guards |
| i18n | Four locales with live meta tag updates and locale-aware display fonts |
| Delivery | Static Vite build on Cloudflare Workers edge with observability enabled |

Renders correctly across the tested device matrix on a structured, maintainable Vue 3 + TypeScript codebase.

### Tech stack

| Area | Tools |
| --- | --- |
| Framework | Vue 3, TypeScript, Composition API |
| Build | Vite, vue-tsc |
| Styling | Tailwind CSS v4, project theme tokens, `clamp()` fluid scaling |
| Animation | GSAP (SplitText, ScrollTrigger, ScrollToPlugin), dynamic imports |
| i18n | vue-i18n, self-hosted locale fonts |
| Utilities | VueUse (`useMediaQuery`, etc.) |
| Hosting | Cloudflare Workers Static Assets (Wrangler) |

### Getting started

**Prerequisites:** Node.js 20+, npm, and a Cloudflare account for deployment.

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:5173)
npm run dev

# Type-check + production build
npm run build

# Preview production build locally
npm run preview
```

### Deployment

This project is deployed to **Cloudflare Workers Static Assets**.

**Production URL:** [https://cocktail-landing.marina-sirenko1-80f.workers.dev](https://cocktail-landing.marina-sirenko1-80f.workers.dev)

#### First-time setup

1. Install dependencies: `npm install`
2. Authenticate Wrangler: `npx wrangler login`
3. Ensure `wrangler.jsonc` exists in the project root (already configured for `./dist`).

#### Deploy to production

```bash
npm run deploy
```

This runs `vue-tsc`, builds to `dist/`, and uploads static assets via Wrangler.

#### Local Cloudflare preview

Simulate the Workers environment locally before deploying:

```bash
npm run dev:cf
```

#### Routing

SPA fallback is **not** enabled — this is a single-page landing with hash anchor navigation, not a client-side router. Direct visits to `/` serve `index.html` as expected.

#### Performance audit

After deployment, re-run Lighthouse on the live URL to verify scores. Baselines above were captured after image optimization and accessibility fixes.

### Credits

- **Design:** mockup provided by the [JavaScript Mastery](https://jsmastery.com) community.
- **Front-end:** responsive engineering, GSAP motion, i18n, optimization, accessibility, and deployment by me.
- Brand name **Velvet Pour** and placeholder content belong to the original mockup.

### AI-assisted workflow

This project uses an AI-assisted development workflow in Cursor for scaffolding and repeatable setup. See [AGENT.md](./AGENT.md) for details.

---

<a id="ru"></a>

## Velvet Pour — адаптивный лендинг

Портфолио-кейс по front-end разработке. Превращение макетов JSMastery на **1440px** и **440px** в Vue 3-лендинг, который уверенно работает на всех промежуточных ширинах — с fluid-масштабированием, ручной адаптацией каждой секции, GSAP-анимациями, i18n на четырёх языках и performance-ориентированной доставкой ассетов через Cloudflare Workers.

**Стек:** Vue 3 · TypeScript · Vite · Tailwind CSS · GSAP · vue-i18n · Cloudflare Workers Static Assets  
**Lighthouse (desktop):** Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100  
**Lighthouse (mobile):** Performance 97 · Accessibility 100 · Best Practices 100 · SEO 100

🔗 **Live demo:** [https://cocktail-landing.marina-sirenko1-80f.workers.dev](https://cocktail-landing.marina-sirenko1-80f.workers.dev)  
🎨 **Дизайн:** макет предоставлен коммьюнити [JavaScript Mastery](https://jsmastery.com) · front-end реализация — моя

### Контекст

Макет для лендинга коктейль-бара **Velvet Pour** предоставила коммьюнити [JavaScript Mastery](https://jsmastery.com) — два якорных фрейма: **1440px** (desktop) и **440px** (mobile). Отдельная mobile-композиция была только у hero; все остальные секции и всё пространство между этими ширинами пришлось адаптировать самостоятельно.

Все responsive-решения — breakpoints, порядок reflow, что масштабируется через `clamp()`, что скрывается, как декоративные элементы и GSAP-сцены ведут себя на узких экранах — были на моей стороне.

### Задача

Два фиксированных artboard'а на 1440px и 440px задают пропорции и иерархию, но не полный responsive-spec для каждого промежуточного viewport. При буквальном переносе секции ломаются на ноутбуке и планшете, а на узких телефонах — переполняются. Задача — связать эти якоря в систему, которая масштабируется по контенту и соотношению сторон, сохраняя тёмный luxury-характер дизайна — без костылей под конкретные устройства и без поломок между breakpoints.

Помимо вёрстки, макет нёс **тяжёлый медиа-футпринт**: фоновое hero-видео, тайловая grain-текстура в нескольких секциях, фото коктейлей в карусели, bento-изображения, фото бармена через CSS-mask, декоративные листья monstera и брендовые марки — многие ассеты в нескольких форматах уже после оптимизации. Типографика добавила ещё один слой: **шесть self-hosted font families** (Modern Negra Demo, Mona Sans, DM Serif Text, плюс locale-specific display serif для RU / ZH / TH) с начертаниями и `font-display: swap`, встроенные в i18n на четыре языка, где display-шрифт должен переключаться без артефактов.

Каждая секция требовала **собственного GSAP motion language**, а не одного универсального fade-in:

| Секция | Типы анимаций |
| --- | --- |
| **Header** | Scroll-triggered переход backdrop blur; плавный anchor scroll через ScrollToPlugin |
| **Hero** | SplitText stagger по символам при загрузке; reveal подзаголовка по строкам; scroll-scrubbed parallax на декоративных листьях и стрелке CTA; pinned scroll-scrubbed фоновое видео (синхронизация `currentTime`) |
| **Menu** | Scroll-scrubbed parallax на боковых декоративных листьях |
| **Philosophy** | SplitText reveal по словам; одноразовый scroll-triggered stagger на карточках bento-сетки |
| **The Art** | Pinned scroll-scrubbed сцена; CSS mask scale reveal на фото бармена; choreographed fade заголовка и появление текста |
| **Carousel** | Stagger reveal на смене слайда (изображение, название, заголовок, описание) |
| **Contact / Footer** | SplitText reveal заголовка; staggered появление контактного блока; лёгкий parallax декоративных листьев |

Эта комбинация — насыщенная графика, множество font-файлов и scroll-linked анимация почти в каждой секции — создаёт реальное давление на **Lighthouse**: тяжёлые изображения, render-blocking шрифты и main-thread нагрузка от GSAP и видео. Инженерная цель была не просто реализовать motion design, а **достичь высоких метрик несмотря на это** — dynamic GSAP code-splitting по секциям, отложенный mount hero-видео, WebP + `srcset`, сжатые tiled noise и carousel-ассеты, guards для `prefers-reduced-motion` и edge static hosting — чтобы Performance, Accessibility, Best Practices и SEO могли достичь **100 на desktop** при визуальной плотности страницы.

### Что реализовано

- **Полная responsive-система, 360 → 1920+.** Tailwind CSS с desktop-first breakpoints (`lg` / `md`) и fluid typography, spacing и декоративными размерами на `clamp()` — layout читается одинаково на любой ширине.
- **Шесть секций** в single-page flow: Hero, Menu, Philosophy, The Art, карусель Featured Cocktails и Contact footer — semantic landmarks, skip link и anchor-навигация с компенсацией высоты header.
- **Per-section reflow**, где наивный stack ломает дизайн:
  - **Hero:** слои parallax-листьев, scroll-scrubbed фоновое видео с poster fallback, SplitText-анимация подзаголовка, mobile-композиция по mockup **440px**.
  - **Philosophy:** bento-сетка, которая на mobile превращается из асимметричных desktop-капсул в читаемые stacked cards.
  - **The Art:** CSS mask composite для фото бармена, scroll-triggered reveal заголовка и oversized display type с fluid-масштабированием без обрезки.
  - **Carousel:** underline tabs на desktop; horizontal scroll-snap track на mobile со стрелками и локализованными `aria-label`.
  - **Header:** sticky blurred backdrop при скролле, full-screen mobile navigation overlay с body scroll lock и inline locale switcher на обоих breakpoints.
- **Internationalization (EN / RU / ZH-Hans / TH)** через vue-i18n — тексты, SEO meta tags и self-hosted locale display fonts (Cormorant Garamond, Noto Serif SC, Noto Serif Thai) с ранней инициализацией `lang`, чтобы избежать flash неправильной типографики.
- **GSAP animation layer** с dynamic imports по секциям (`SplitText`, `ScrollTrigger`, `ScrollToPlugin`) для lean initial bundle; все анимации учитывают `prefers-reduced-motion`.
- **Performance & delivery:** WebP + `srcset` для carousel drinks и logo, оптимизированная tiled noise texture (`image-set` с lossless WebP + PNG fallback), сжатая art-section mask, lazy/deferred mount hero-видео, SEO essentials, edge deployment на Cloudflare Workers Static Assets.

### Инженерный подход

Mockup'ы задавали два якорных размера — 1440px и 440px; каждое responsive- и interaction-решение для диапазона между ними принимала и обосновывала я — адаптация как design problem, а не механический resize.

Проверка на разных viewport и физических устройствах в процессе разработки (телефоны, планшеты, ноутбуки, ultrawide). GSAP timelines scoped по секциям с cleanup on unmount, чтобы избежать duplicate ScrollTriggers при смене locale или resize.

AI-assisted automation в Cursor взяла на себя repetitive scaffolding и config; layout, motion tuning, i18n behavior, accessibility fixes, image optimization и deployment decisions оставались ручными.

<!-- TODO: добавить responsive showcase screenshots, e.g. ![Responsive hero](docs/responsive-hero.png) -->

### Результаты

#### Lighthouse — desktop

Аудит на [production URL](https://cocktail-landing.marina-sirenko1-80f.workers.dev/) (Chrome, simulated desktop).

| Категория | Score |
| --- | --- |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

| Метрика | Значение |
| --- | --- |
| First Contentful Paint | 0.6 s |
| Largest Contentful Paint | 0.6 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 0.8 s |

#### Lighthouse — mobile

Аудит на [production URL](https://cocktail-landing.marina-sirenko1-80f.workers.dev/) (Chrome, simulated mobile).

| Категория | Score |
| --- | --- |
| Performance | 97 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

| Метрика | Значение |
| --- | --- |
| First Contentful Paint | 2.0 s |
| Largest Contentful Paint | 2.0 s |
| Total Blocking Time | 40 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 3.4 s |

#### Инженерные итоги

| Итог | Детали |
| --- | --- |
| Image delivery | ~1.7 MB экономии, выявленной Lighthouse — tiled noise (1.5 MB → ~114 KB WebP tile), carousel WebP srcsets, recompression logo и mask |
| Accessibility | Semantic structure, skip link, локализованные aria-label для carousel controls, reduced-motion guards |
| i18n | Четыре locale с live meta tag updates и locale-aware display fonts |
| Delivery | Static Vite build на Cloudflare Workers edge с observability |

Страница корректно рендерится на протестированной device matrix на структурированной, поддерживаемой кодовой базе Vue 3 + TypeScript.

### Tech stack

| Область | Инструменты |
| --- | --- |
| Framework | Vue 3, TypeScript, Composition API |
| Build | Vite, vue-tsc |
| Styling | Tailwind CSS v4, project theme tokens, `clamp()` fluid scaling |
| Animation | GSAP (SplitText, ScrollTrigger, ScrollToPlugin), dynamic imports |
| i18n | vue-i18n, self-hosted locale fonts |
| Utilities | VueUse (`useMediaQuery`, etc.) |
| Hosting | Cloudflare Workers Static Assets (Wrangler) |

### Запуск проекта

**Требования:** Node.js 20+, npm и аккаунт Cloudflare для деплоя.

```bash
# Установка зависимостей
npm install

# Локальный dev-сервер (http://localhost:5173)
npm run dev

# Type-check + production build
npm run build

# Локальный preview production-сборки
npm run preview
```

### Деплой

Проект развёрнут на **Cloudflare Workers Static Assets**.

**Production URL:** [https://cocktail-landing.marina-sirenko1-80f.workers.dev](https://cocktail-landing.marina-sirenko1-80f.workers.dev)

#### Первоначальная настройка

1. Установить зависимости: `npm install`
2. Авторизоваться в Wrangler: `npx wrangler login`
3. Убедиться, что `wrangler.jsonc` есть в корне проекта (уже настроен на `./dist`).

#### Деплой в production

```bash
npm run deploy
```

Команда запускает `vue-tsc`, собирает проект в `dist/` и загружает static assets через Wrangler.

#### Локальный Cloudflare preview

Эмуляция Workers-окружения локально перед деплоем:

```bash
npm run dev:cf
```

#### Routing

SPA fallback **не включён** — это single-page лендинг с hash anchor navigation, без client-side router. Прямой заход на `/` отдаёт `index.html` как ожидается.

#### Performance audit

После деплоя перезапустите Lighthouse на live URL для проверки метрик. Baseline выше зафиксированы после image optimization и accessibility fixes.

### Credits

- **Design:** mockup предоставлен коммьюнити [JavaScript Mastery](https://jsmastery.com).
- **Front-end:** responsive engineering, GSAP motion, i18n, optimization, accessibility и deployment — моя работа.
- Название бренда **Velvet Pour** и placeholder-контент принадлежат оригинальному mockup.

### AI-assisted workflow

Проект использует AI-assisted development workflow в Cursor для scaffolding и repeatable setup. Подробнее — в [AGENT.md](./AGENT.md).
