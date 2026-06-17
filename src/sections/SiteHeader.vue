/**
 * Site header
 *
 * GSAP behavior:
 * - Adds a scroll-triggered backdrop transition (transparent -> blurred tinted backdrop)
 *   when the page is scrolled beyond the hero area.
 * - Uses ScrollToPlugin for smooth in-page navigation to section anchors.
 *
 * Interaction behavior:
 * - Navigation links intercept hash clicks and apply header offset compensation.
 * - Active smooth scroll tween is cancelled before starting a new one.
 *
 * Optimizations and accessibility:
 * - Dynamic GSAP loading (`gsap`, `ScrollTrigger`, `ScrollToPlugin`) reduces initial bundle cost.
 * - Skips animated scrolling/backdrop effects when reduced-motion is enabled.
 * - Keeps `--header-height` CSS variable in sync via resize listener + ResizeObserver.
 * - Cleans up observer, listeners, GSAP context, and active tween on unmount.
 */
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import logoMark from '../assets/logos/velvet-pour-mark.png'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'

const navItems = [
  { label: 'Cocktails', href: '#menu' },
  { label: 'About Us', href: '#philosophy' },
  { label: 'The Art', href: '#the-art' },
  { label: 'Contact', href: '#contact' },
]

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
  syncHeaderHeightVar()
  window.addEventListener('resize', syncHeaderHeightVar)
  headerResizeObserver = new ResizeObserver(syncHeaderHeightVar)
  if (headerRef.value) headerResizeObserver.observe(headerRef.value)

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

onUnmounted(() => {
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
      class="container relative flex flex-col items-center gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-0"
    >
      <a
        href="/"
        class="flex-center gap-1 font-display text-[30px] leading-10 text-foreground focus-ring"
      >
        <img
          :src="logoMark"
          alt=""
          width="32"
          height="32"
          decoding="async"
          class="size-8"
          aria-hidden="true"
        />
        <span class="mt-[4px] leading-[25px]">Velvet Pour</span>
      </a>

      <nav aria-label="Main navigation" class="w-full md:w-auto">
        <ul
          class="flex items-center justify-center gap-4 text-sm font-medium text-muted md:gap-12 md:text-base"
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
        </ul>
      </nav>
    </div>
  </header>
</template>
