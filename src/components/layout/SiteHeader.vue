<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import logoMark from '../../assets/logos/velvet-pour-mark.png'
import { usePrefersReducedMotion } from '../../composables/usePrefersReducedMotion'

const navItems = [
  { label: 'Cocktails', href: '#menu' },
  { label: 'About Us', href: '#philosophy' },
  { label: 'The Art', href: '#the-art' },
  { label: 'Contact', href: '#contact' },
]

// register plugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// create reactive variables
const headerBackdropRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const isMenuOpen = ref(false)
const prefersReducedMotion = usePrefersReducedMotion()

// create variable to store the animation context
let headerCtx: gsap.Context | undefined
// create variable to control active animated scroll to kill prev scroll
let activeScrollTween: gsap.core.Tween | null = null
let headerResizeObserver: ResizeObserver | null = null

function syncHeaderHeightVar() {
  const height = headerRef.value?.getBoundingClientRect().height ?? 0
  document.documentElement.style.setProperty('--header-height', `${Math.round(height)}px`)
}

onMounted(() => {
  syncHeaderHeightVar()
  window.addEventListener('resize', syncHeaderHeightVar)
  headerResizeObserver = new ResizeObserver(syncHeaderHeightVar)
  if (headerRef.value) headerResizeObserver.observe(headerRef.value)

  // check if header doesn`t exist or user reduce motion
  if (!headerBackdropRef.value || prefersReducedMotion.value) return

  // Animate the translucent header backdrop once user scrolls past hero.
  headerCtx = gsap.context(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: 'header',
        start: 'bottom top',
        toggleActions: 'play none none reverse',
      },
    })

    // use fromTo to control back/forvard state striktly
    navTween.fromTo(
      headerBackdropRef.value,
      {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
      },
      {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        duration: 1,
        ease: 'power1.inOut',
      },
    )
  })
})

// clean all animations
onUnmounted(() => {
  window.removeEventListener('resize', syncHeaderHeightVar)
  headerResizeObserver?.disconnect()
  headerResizeObserver = null
  headerCtx?.revert()
  activeScrollTween?.kill()
  activeScrollTween = null
})

function scrollToSection(hash: string, onComplete?: () => void) {
  // find target section by id
  const target = document.querySelector(hash)
  if (!target) return

  // find height of header
  const offsetY = document.querySelector('header')?.getBoundingClientRect().height ?? 0

  // if active scroll exist kill the process
  activeScrollTween?.kill()

  // Skip animated scroll when user requests reduced motion.
  if (prefersReducedMotion.value) {
    const top = target.getBoundingClientRect().top + window.scrollY - offsetY
    window.scrollTo({ top, behavior: 'instant' })
    onComplete?.()
    return
  }

  // setup animations rules
  activeScrollTween = gsap.to(window, {
    duration: 0.9,
    ease: 'power2.inOut',
    scrollTo: { y: target, offsetY },
    onComplete: () => {
      activeScrollTween = null
      onComplete?.()
    },
  })
}

// call fn by click or enter
function onNavClick(event: MouseEvent, href: string) {
  if (!href.startsWith('#')) return

  event.preventDefault()
  scrollToSection(href, () => {
    isMenuOpen.value = false
  })
}
</script>

<template>
  <header ref="headerRef" class="sticky top-0 z-50 relative">
    <div
      ref="headerBackdropRef"
      class="pointer-events-none absolute inset-0 -z-10"
      aria-hidden="true"
    />
    <div class="container relative flex-between py-7">
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

      <nav aria-label="Main navigation" class="hidden md:block">
        <ul class="flex items-center gap-12 text-base font-medium text-muted">
          <li v-for="item in navItems" :key="item.href">
            <a
              :href="item.href"
              class="focus-ring transition-opacity hover:opacity-80"
              @click="onNavClick($event, item.href)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        class="flex-center focus-ring rounded-button border border-border px-4 py-2 text-sm font-medium text-foreground md:hidden"
        @click="isMenuOpen = !isMenuOpen"
      >
        {{ isMenuOpen ? 'Close' : 'Menu' }}
      </button>
    </div>

    <nav
      id="mobile-menu"
      aria-label="Mobile navigation"
      :hidden="!isMenuOpen"
      class="border-t border-border px-5 py-4 md:hidden"
    >
      <ul class="flex flex-col gap-4 text-base font-medium text-muted">
        <li v-for="item in navItems" :key="item.href">
          <a
            :href="item.href"
            class="block focus-ring transition-opacity hover:opacity-80"
            @click="onNavClick($event, item.href)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
