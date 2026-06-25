/** * Site header * * GSAP behavior: * - Adds a scroll-triggered backdrop transition (transparent ->
blurred tinted backdrop) * when the page is scrolled beyond the hero area. * - Uses ScrollToPlugin
for smooth in-page navigation to section anchors. * * Interaction behavior: * - Navigation links
intercept hash clicks and apply header offset compensation. * - Active smooth scroll tween is
cancelled before starting a new one. * * Optimizations and accessibility: * - Dynamic GSAP loading
(`gsap`, `ScrollTrigger`, `ScrollToPlugin`) reduces initial bundle cost. * - Skips animated
scrolling/backdrop effects when reduced-motion is enabled. * - Keeps `--header-height` CSS variable
in sync via resize listener + ResizeObserver. * - Cleans up observer, listeners, GSAP context, and
active tween on unmount. */
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import logoMarkPng from '../assets/logos/velvet-pour-mark.png'
import logoMarkWebp from '../assets/logos/velvet-pour-mark.webp'
import flagEn from '../assets/icons/flags/en.svg'
import flagRu from '../assets/icons/flags/ru.svg'
import flagTh from '../assets/icons/flags/th.svg'
import flagZhHans from '../assets/icons/flags/zh-hans.svg'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'
import { useI18n } from 'vue-i18n'

const LOCALE_STORAGE_KEY = 'locale'
const { t, locale, availableLocales } = useI18n()

const navItems = computed(() => [
  { label: t('nav.cocktails'), href: '#menu' },
  { label: t('nav.aboutUs'), href: '#philosophy' },
  { label: t('nav.theArt'), href: '#the-art' },
  { label: t('nav.contact'), href: '#contact' },
])

type LocaleOption = {
  value: string
  label: string
  flag: string
}

const localeOptions = computed<LocaleOption[]>(() =>
  [
    { value: 'en', label: t('common.localeName.en'), flag: flagEn },
    { value: 'ru', label: t('common.localeName.ru'), flag: flagRu },
    { value: 'th', label: t('common.localeName.th'), flag: flagTh },
    { value: 'zh-Hans', label: t('common.localeName.zhHans'), flag: flagZhHans },
  ].filter((option) => availableLocales.includes(option.value)),
)

const isLocaleMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)
const localeSwitcherRef = ref<HTMLElement | null>(null)
const mobileMenuRef = ref<HTMLElement | null>(null)
const currentLocaleOption = computed(
  () =>
    localeOptions.value.find((option) => option.value === locale.value) ?? localeOptions.value[0],
)

type HeaderGsapBundle = {
  gsap: typeof import('gsap').default
}

let headerGsapBundle: HeaderGsapBundle | null = null
let headerGsapBundlePromise: Promise<HeaderGsapBundle> | null = null

async function loadHeaderGsapBundle() {
  if (headerGsapBundle) return headerGsapBundle

  if (!headerGsapBundlePromise) {
    headerGsapBundlePromise = (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { ScrollToPlugin }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('gsap/ScrollToPlugin'),
      ])
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
      return { gsap }
    })()
  }

  headerGsapBundle = await headerGsapBundlePromise
  return headerGsapBundle
}

const headerBackdropRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const prefersReducedMotion = usePrefersReducedMotion()

let headerCtx: { revert: () => void } | undefined
let activeScrollTween: any = null
let headerResizeObserver: ResizeObserver | null = null

function syncHeaderHeightVar() {
  const height = headerRef.value?.getBoundingClientRect().height ?? 0
  document.documentElement.style.setProperty('--header-height', `${Math.round(height)}px`)
}

onMounted(async () => {
  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (savedLocale && availableLocales.includes(savedLocale)) {
    locale.value = savedLocale
  }

  syncHeaderHeightVar()
  window.addEventListener('resize', syncHeaderHeightVar)
  headerResizeObserver = new ResizeObserver(syncHeaderHeightVar)
  if (headerRef.value) headerResizeObserver.observe(headerRef.value)
  document.addEventListener('pointerdown', onDocumentPointerDown)
  document.addEventListener('keydown', onDocumentKeydown)

  if (!headerBackdropRef.value || prefersReducedMotion.value) return

  const { gsap } = await loadHeaderGsapBundle()

  headerCtx = gsap.context(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: 'header',
        start: 'bottom top',
        toggleActions: 'play none none reverse',
      },
    })

    navTween.fromTo(
      headerBackdropRef.value,
      {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
      },
      {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        duration: 1,
        ease: 'power1.inOut',
      },
    )
  })
})

watch(isMobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('keydown', onDocumentKeydown)
  window.removeEventListener('resize', syncHeaderHeightVar)
  headerResizeObserver?.disconnect()
  headerResizeObserver = null
  headerCtx?.revert()
  activeScrollTween?.kill()
  activeScrollTween = null
})

function scrollToSection(hash: string) {
  const target = document.querySelector(hash)
  if (!target) return

  const offsetY = document.querySelector('header')?.getBoundingClientRect().height ?? 0

  activeScrollTween?.kill()

  if (prefersReducedMotion.value) {
    const top = target.getBoundingClientRect().top + window.scrollY - offsetY
    window.scrollTo({ top, behavior: 'instant' })
    return
  }

  if (!headerGsapBundle) {
    const top = target.getBoundingClientRect().top + window.scrollY - offsetY
    window.scrollTo({ top, behavior: 'smooth' })
    return
  }

  activeScrollTween = headerGsapBundle.gsap.to(window, {
    duration: 0.9,
    ease: 'power2.inOut',
    scrollTo: { y: target, offsetY },
    onComplete: () => {
      activeScrollTween = null
    },
  })
}

function onNavClick(event: MouseEvent, href: string) {
  if (!href.startsWith('#')) return

  event.preventDefault()
  scrollToSection(href)
  isMobileMenuOpen.value = false
  isLocaleMenuOpen.value = false
}

function selectLocale(nextLocale: string) {
  if (!availableLocales.includes(nextLocale)) return
  locale.value = nextLocale
  window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
  isLocaleMenuOpen.value = false
}

function toggleLocaleMenu() {
  const nextState = !isLocaleMenuOpen.value
  isLocaleMenuOpen.value = nextState
  if (nextState) isMobileMenuOpen.value = false
}

function toggleMobileMenu() {
  const nextState = !isMobileMenuOpen.value
  isMobileMenuOpen.value = nextState
  if (nextState) isLocaleMenuOpen.value = false
}

function onDocumentPointerDown(event: PointerEvent) {
  const header = headerRef.value
  const switcher = localeSwitcherRef.value
  const target = event.target as Node | null
  if (!target) return

  if (switcher && !switcher.contains(target)) {
    isLocaleMenuOpen.value = false
  }

  if (
    header &&
    !header.contains(target) &&
    !(mobileMenuRef.value && mobileMenuRef.value.contains(target))
  ) {
    isMobileMenuOpen.value = false
  }
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isLocaleMenuOpen.value = false
    isMobileMenuOpen.value = false
  }
}
</script>

<template>
  <header ref="headerRef" class="sticky top-0 z-50 relative">
    <div
      ref="headerBackdropRef"
      class="pointer-events-none absolute inset-0 -z-10"
      aria-hidden="true"
    />
    <div
      class="container relative flex md:flex-col justify-between md:items-start gap-4 py-5 md:flex-row md:items-center md:gap-8"
    >
      <a
        href="/"
        class="flex-center gap-1 font-display text-[30px] leading-10 text-foreground focus-ring md:shrink-0"
      >
        <picture>
          <source :srcset="logoMarkWebp" type="image/webp" />
          <img
            :src="logoMarkPng"
            alt=""
            width="32"
            height="32"
            decoding="async"
            class="size-8"
            aria-hidden="true"
          />
        </picture>
        <span class="mt-[4px] leading-[25px]">{{ t('nav.brand') }}</span>
      </a>

      <div class="flex items-center gap-2 self-end md:ml-auto md:gap-3 md:self-auto">
        <nav :aria-label="t('nav.mainNavigation')" class="mt-1 hidden md:mt-0 md:ml-8 md:block">
          <ul
            class="flex items-center justify-start gap-4 text-sm font-medium text-muted md:gap-12 md:text-base"
          >
            <li v-for="item in navItems" :key="item.href">
              <a
                :href="item.href"
                class="focus-ring transition-opacity hover:opacity-80 text-nowrap"
                @click="onNavClick($event, item.href)"
              >
                {{ item.label }}
              </a>
            </li>
            <li>
              <div ref="localeSwitcherRef" class="relative">
                <button
                  type="button"
                  class="focus-ring flex items-center justify-center rounded-panel border border-white/20 bg-black/40 p-1.5 transition-colors hover:border-white/40"
                  :aria-label="t('common.language')"
                  aria-haspopup="listbox"
                  :aria-expanded="isLocaleMenuOpen"
                  @click="toggleLocaleMenu"
                >
                  <img
                    v-if="currentLocaleOption"
                    :src="currentLocaleOption.flag"
                    :alt="currentLocaleOption.label"
                    width="20"
                    height="20"
                    class="size-5 rounded-full"
                  />
                </button>

                <ul
                  v-if="isLocaleMenuOpen"
                  role="listbox"
                  class="absolute right-0 z-50 mt-2 w-40 rounded-panel border border-white/20 bg-black/90 p-1 shadow-lg backdrop-blur"
                >
                  <li
                    v-for="option in localeOptions"
                    :key="option.value"
                    role="option"
                    :aria-selected="option.value === locale"
                  >
                    <button
                      type="button"
                      class="focus-ring flex w-full items-center gap-2 rounded-panel px-2 py-1.5 text-left text-xs text-foreground hover:bg-white/10 md:text-sm"
                      @click="selectLocale(option.value)"
                    >
                      <img
                        :src="option.flag"
                        :alt="option.label"
                        width="20"
                        height="20"
                        class="size-5 rounded-full"
                      />
                      <span>{{ option.label }}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>


        <button
          type="button"
          class="focus-ring relative z-[60] flex size-8 items-center justify-center rounded-panel border border-white/20 bg-black/40 md:hidden"
          :aria-label="isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          aria-controls="mobile-nav-menu"
          :aria-expanded="isMobileMenuOpen"
          @click="toggleMobileMenu"
        >
          <span class="sr-only">{{ isMobileMenuOpen ? 'Close menu' : 'Open menu' }}</span>
          <span class="relative h-3.5 w-4" aria-hidden="true">
            <span
              class="absolute left-0 top-0 h-0.5 w-4 bg-foreground transition-transform duration-200"
              :class="isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''"
            />
            <span
              class="absolute left-0 top-[7px] h-0.5 w-4 bg-foreground transition-opacity duration-200"
              :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"
            />
            <span
              class="absolute left-0 top-[14px] h-0.5 w-4 bg-foreground transition-transform duration-200"
              :class="isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''"
            />
          </span>
        </button>
      </div>

    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isMobileMenuOpen"
          id="mobile-nav-menu"
          ref="mobileMenuRef"
          class="fixed inset-0 z-40 flex flex-col bg-black/95 backdrop-blur-md md:hidden"
          role="dialog"
          aria-modal="true"
          :aria-label="t('nav.mainNavigation')"
          @click.self="isMobileMenuOpen = false"
        >
          <nav
            class="container flex min-h-0 flex-1 flex-col pt-[var(--header-height)]"
            :aria-label="t('nav.mainNavigation')"
          >
            <ul class="flex flex-1 flex-col justify-center gap-1 py-8">
              <li v-for="item in navItems" :key="`mobile-${item.href}`">
                <a
                  :href="item.href"
                  class="focus-ring block border-b border-white/10 py-4 font-display text-[clamp(1.75rem,1.5rem+1.25vw,2.5rem)] leading-tight text-foreground transition-opacity hover:opacity-80"
                  @click="onNavClick($event, item.href)"
                >
                  {{ item.label }}
                </a>
              </li>
            </ul>

            <div class="shrink-0 border-t border-white/10 py-6">
              <p class="mb-3 text-xs font-medium uppercase tracking-wider text-muted-subtle">
                {{ t('common.language') }}
              </p>
              <ul class="flex flex-wrap gap-2">
                <li v-for="option in localeOptions" :key="`mobile-locale-${option.value}`">
                  <button
                    type="button"
                    class="focus-ring flex items-center gap-2 rounded-panel border px-3 py-2 text-sm transition-colors"
                    :class="
                      option.value === locale
                        ? 'border-white/40 bg-white/10 text-foreground'
                        : 'border-white/10 text-muted hover:border-white/30 hover:bg-white/5'
                    "
                    :aria-pressed="option.value === locale"
                    @click="selectLocale(option.value)"
                  >
                    <img
                      :src="option.flag"
                      :alt="option.label"
                      width="20"
                      height="20"
                      class="size-5 rounded-full"
                    />
                    <span>{{ option.label }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
