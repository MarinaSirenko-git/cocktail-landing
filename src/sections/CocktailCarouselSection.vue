/**
 * Cocktail Carousel section
 *
 * GSAP behavior:
 * - Animates the active desktop slide content (`image`, `title`, `heading`, `copy`)
 *   whenever the active tab changes.
 * - Rebuilds a short reveal timeline per active slide and kills previous tweens/timelines
 *   to avoid animation overlap.
 *
 * Interaction model:
 * - Desktop: tab buttons + cyclic prev/next arrows.
 * - Mobile: horizontal snap track with scroll position syncing to active tab index.
 *
 * Optimizations and accessibility:
 * - Dynamic GSAP import (`loadCarouselGsapBundle`) keeps initial bundle smaller.
 * - Reduced-motion users skip desktop GSAP slide transitions.
 * - Animation work is scoped to the active desktop panel only.
 * - Timers/timelines are cleaned up on unmount.
 */
<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import iconArrow from '../assets/icons/icon-arrow-right.svg'
import drinkClassicMojitoPng from '../assets/images/carousel-drink-classic-mojito.png'
import drinkRaspberryMojitoPng from '../assets/images/carousel-drink-raspberry-mojito.png'
import drinkVioletBreezePng from '../assets/images/carousel-drink-violet-breeze.png'
import drinkCuracaoMojitoPng from '../assets/images/carousel-drink-curacao-mojito.png'
import monsteraWebp from '../assets/images/decorative-monstera-leaf.webp'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'
import { useMediaQuery } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

type CarouselSlide = {
  name: string
  title: string
  description: string
  image: string
  alt: string
}

const { t, tm } = useI18n()

const slides = computed<CarouselSlide[]>(() => {
  const localizedSlides = tm('carousel.slides') as Array<Omit<CarouselSlide, 'image'>>
  const images = [
    drinkClassicMojitoPng,
    drinkRaspberryMojitoPng,
    drinkVioletBreezePng,
    drinkCuracaoMojitoPng,
  ]

  return localizedSlides.map((slide, index) => ({
    ...slide,
    image: images[index] ?? drinkClassicMojitoPng,
  }))
})

const activeTabIndex = ref(1)
const sectionRef = ref<HTMLElement | null>(null)
const mobileTrackRef = ref<HTMLElement | null>(null)
const prefersReducedMotion = usePrefersReducedMotion()
const isDesktop = useMediaQuery('(min-width: 1024px)')
const isFirstSlide = computed(() => activeTabIndex.value === 0)
const isLastSlide = computed(() => activeTabIndex.value === slides.value.length - 1)

type CarouselGsapBundle = {
  gsap: typeof import('gsap').default
}

let carouselGsapBundle: CarouselGsapBundle | null = null
let carouselGsapBundlePromise: Promise<CarouselGsapBundle> | null = null

async function loadCarouselGsapBundle() {
  if (carouselGsapBundle) return carouselGsapBundle

  if (!carouselGsapBundlePromise) {
    carouselGsapBundlePromise = (async () => {
      const { default: gsap } = await import('gsap')
      return { gsap }
    })()
  }

  carouselGsapBundle = await carouselGsapBundlePromise
  return carouselGsapBundle
}

let scrollEndTimer: number | null = null
let desktopSlideTimeline: any = null

function isDesktopViewport() {
  return window.matchMedia('(min-width: 1024px)').matches
}

function animateDesktopActiveSlide() {
  if (!sectionRef.value || !isDesktopViewport() || prefersReducedMotion.value || !carouselGsapBundle) return
  const { gsap } = carouselGsapBundle

  const panel = sectionRef.value.querySelector<HTMLElement>('.js-desktop-active-panel')
  if (!panel) return

  const targets = [
    panel.querySelector<HTMLElement>('.js-desktop-slide-image'),
    panel.querySelector<HTMLElement>('.js-desktop-slide-title'),
    panel.querySelector<HTMLElement>('.js-desktop-slide-heading'),
    panel.querySelector<HTMLElement>('.js-desktop-slide-copy'),
  ].filter(Boolean) as HTMLElement[]

  if (!targets.length) return

  desktopSlideTimeline?.kill()
  gsap.killTweensOf(targets)

  const image = panel.querySelector<HTMLElement>('.js-desktop-slide-image')
  const title = panel.querySelector<HTMLElement>('.js-desktop-slide-title')
  const heading = panel.querySelector<HTMLElement>('.js-desktop-slide-heading')
  const copy = panel.querySelector<HTMLElement>('.js-desktop-slide-copy')

  desktopSlideTimeline = gsap.timeline({
    defaults: {
      ease: 'power1.inOut',
      overwrite: 'auto',
    },
  })

  if (image) {
    desktopSlideTimeline.fromTo(image, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 })
  }

  if (title) {
    desktopSlideTimeline.fromTo(
      title,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '<0.1',
    )
  }

  if (heading || copy) {
    desktopSlideTimeline.fromTo(
      [heading, copy].filter(Boolean),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 },
      '<0.05',
    )
  }
}

function scrollMobileTrackTo(index: number, behavior: ScrollBehavior = 'smooth') {
  const track = mobileTrackRef.value
  if (!track) return

  const targetSlide = track.querySelector<HTMLElement>(`[data-slide-index="${index}"]`)
  if (!targetSlide) return

  track.scrollTo({
    left: targetSlide.offsetLeft,
    behavior: prefersReducedMotion.value ? 'auto' : behavior,
  })
}

function setActiveSlide(index: number) {
  activeTabIndex.value = index
  scrollMobileTrackTo(index)
}

function goToPreviousSlide() {
  if (isDesktop.value) {
    const nextIndex = (activeTabIndex.value - 1 + slides.value.length) % slides.value.length
    setActiveSlide(nextIndex)
    return
  }

  if (isFirstSlide.value) return

  setActiveSlide(activeTabIndex.value - 1)
}

function goToNextSlide() {
  if (isDesktop.value) {
    const nextIndex = (activeTabIndex.value + 1) % slides.value.length
    setActiveSlide(nextIndex)
    return
  }

  if (isLastSlide.value) return

  setActiveSlide(activeTabIndex.value + 1)
}

function syncActiveTabToScrollPosition() {
  const track = mobileTrackRef.value
  if (!track) return

  const trackCenter = track.scrollLeft + track.clientWidth / 2
  const candidates = Array.from(track.querySelectorAll<HTMLElement>('[data-slide-index]'))

  if (!candidates.length) return

  const nearest = candidates.reduce(
    (best, element) => {
      const elementCenter = element.offsetLeft + element.clientWidth / 2
      const distance = Math.abs(elementCenter - trackCenter)
      if (distance < best.distance) {
        return { distance, index: Number(element.dataset.slideIndex ?? 0) }
      }
      return best
    },
    { distance: Number.POSITIVE_INFINITY, index: activeTabIndex.value },
  )

  if (nearest.index !== activeTabIndex.value) {
    activeTabIndex.value = nearest.index
  }
}

function onMobileTrackScroll() {
  if (scrollEndTimer !== null) {
    window.clearTimeout(scrollEndTimer)
  }

  scrollEndTimer = window.setTimeout(() => {
    syncActiveTabToScrollPosition()
  }, 80)
}

onMounted(async () => {
  await loadCarouselGsapBundle()
  await nextTick()
  scrollMobileTrackTo(activeTabIndex.value, 'auto')
  animateDesktopActiveSlide()
})

onUnmounted(() => {
  desktopSlideTimeline?.kill()
  desktopSlideTimeline = null

  if (scrollEndTimer !== null) {
    window.clearTimeout(scrollEndTimer)
    scrollEndTimer = null
  }
})

watch(activeTabIndex, async () => {
  await nextTick()
  animateDesktopActiveSlide()
})
</script>

<template>
  <section
    id="carousel"
    ref="sectionRef"
    aria-labelledby="carousel-recipe-title"
    class="flex flex-col justify-center relative overflow-hidden bg-section-radial min-h-[calc(100dvh-var(--header-height,0px))] pt-[clamp(40px,23.8px+4.32vw,86px)] pb-[90px]"
  >
    <div>
      <div class="relative z-10 container">
        <div
          role="tablist"
          :aria-label="t('carousel.ariaFeaturedCocktails')"
          class="mb-12 flex flex-wrap justify-center gap-[40px] lg:gap-x-[85px]"
        >
          <button
            v-for="(slide, index) in slides"
            :key="slide.name"
            type="button"
            role="tab"
            :aria-selected="index === activeTabIndex"
            :tabindex="index === activeTabIndex ? 0 : -1"
            :id="`carousel-tab-${index}`"
            :aria-controls="`carousel-panel-${index}`"
            class="cursor-pointer border-b pb-2 font-display text-[clamp(20px,15.77px+1.127vw,32px)] leading-none font-medium focus-ring lg:pb-1"
            :class="index === activeTabIndex ? 'text-foreground' : 'opacity-40 hover:opacity-100'"
            @click="setActiveSlide(index)"
          >
            {{ slide.name }}
          </button>
        </div>

        <div
          class="pointer-events-none absolute inset-x-0 top-[250px] z-20 flex items-center justify-between lg:top-1/2 lg:-translate-y-1/2"
        >
          <button
            type="button"
            class="pointer-events-auto flex flex-col items-start justify-end gap-2 text-left text-muted transition-colors hover:text-foreground focus-ring lg:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-muted"
            :disabled="!isDesktop && isFirstSlide"
            :aria-disabled="!isDesktop && isFirstSlide"
            @click="goToPreviousSlide"
          >
            <p
              class="hidden max-w-[100px] font-display text-[32px] leading-none text-foreground lg:block"
            >
              {{ slides[(activeTabIndex - 1 + slides.length) % slides.length]?.name }}
            </p>
            <img
              :src="iconArrow"
              alt=""
              width="38"
              height="38"
              decoding="async"
              aria-hidden="true"
              class="shrink-0 rotate-180 lg:size-[38px]"
            />
          </button>

          <button
            type="button"
            class="pointer-events-auto flex flex-col items-end gap-2 text-muted transition-colors hover:text-foreground focus-ring lg:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-muted"
            :disabled="!isDesktop && isLastSlide"
            :aria-disabled="!isDesktop && isLastSlide"
            @click="goToNextSlide"
          >
            <p
              class="hidden max-w-[100px] text-end font-display text-[32px] leading-none text-foreground lg:block"
            >
              {{ slides[(activeTabIndex + 1) % slides.length]?.name }}
            </p>
            <img
              :src="iconArrow"
              alt=""
              width="38"
              height="38"
              decoding="async"
              aria-hidden="true"
              class="shrink-0 lg:size-[38px]"
            />
          </button>
        </div>

        <div
          ref="mobileTrackRef"
          class="flex snap-x snap-mandatory overflow-x-auto scroll-smooth lg:hidden"
          @scroll="onMobileTrackScroll"
        >
          <article
            v-for="(slide, index) in slides"
            :key="`mobile-slide-${slide.name}`"
            :data-slide-index="index"
            class="min-w-full snap-start px-1"
          >
            <div class="grid grid-cols-1 items-end gap-4">
              <div class="order-2">
                <p class="text-sm text-foreground">{{ t('common.recipesFor') }}</p>
                <h2
                  class="mt-2 font-display text-[clamp(1.875rem,1.44rem+1.88vw,3.125rem)] text-accent"
                >
                  {{ slide.name }}
                </h2>
              </div>
              <div class="order-1">
                <figure class="mx-auto h-[306px] overflow-hidden">
                  <img
                    :src="slide.image"
                    :alt="slide.alt"
                    width="401"
                    height="592"
                    decoding="async"
                    loading="lazy"
                    class="h-full w-full object-contain object-center"
                  />
                </figure>
              </div>
              <div class="order-3">
                <h3
                  class="font-dm-serif leading-[1.15] font-normal text-[clamp(2.25rem,1.99rem+1.13vw,3rem)] text-foreground"
                >
                  {{ slide.title }}
                </h3>
                <p class="mt-4 text-base lg:text-md">{{ slide.description }}</p>
              </div>
            </div>
          </article>
        </div>

        <div
          v-for="(slide, index) in slides"
          :key="`panel-${slide.name}`"
          role="tabpanel"
          :id="`carousel-panel-${index}`"
          :aria-labelledby="`carousel-tab-${index}`"
          :hidden="index !== activeTabIndex"
          class="hidden lg:block"
        >
          <div
            v-if="index === activeTabIndex"
            class="js-desktop-active-panel grid grid-cols-1 items-end gap-4 lg:gap-8 lg:grid-cols-[repeat(3,minmax(0,440px))] lg:justify-between"
          >
            <div class="js-desktop-slide-title order-2 lg:order-1 lg:mb-7 lg:max-w-[201px] lg:pl-20">
              <p class="text-sm text-foreground">{{ t('common.recipesFor') }}</p>
              <h2
                id="carousel-recipe-title"
                class="mt-2 leading-none font-display text-[clamp(1.875rem,1.44rem+1.88vw,3.125rem)] text-accent"
              >
                {{ slide.name }}
              </h2>
            </div>
            <div class="order-1 lg:order-2">
              <figure class="mx-auto h-[306px] lg:h-[592px] lg:w-[401px]">
                <img
                  :src="slide.image"
                  :alt="slide.alt"
                  width="401"
                  height="592"
                  decoding="async"
                  loading="lazy"
                  class="js-desktop-slide-image h-full w-full object-contain lg:object-cover lg:object-center"
                />
              </figure>
            </div>
            <div class="order-3 lg:mb-7 lg:max-w-[400px]">
              <h3
                class="js-desktop-slide-heading font-dm-serif leading-[1.15] font-normal text-[clamp(2.25rem,1.99rem+1.13vw,3rem)] text-foreground"
              >
                {{ slide.title }}
              </h3>
              <p class="js-desktop-slide-copy mt-4 text-base lg:text-md">{{ slide.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <picture
        class="pointer-events-none absolute left-[clamp(-240px,-16vw,-40px)] bottom-[clamp(-270px,-18vw,-70px)] z-0 rotate-[20deg] scale-x-[-1]"
      >
        <source :srcset="monsteraWebp" type="image/webp" />
        <img
          :src="monsteraWebp"
          alt=""
          width="456"
          height="456"
          decoding="async"
          loading="lazy"
          aria-hidden="true"
          class="size-[clamp(117px,-2px+31.8vw,456px)] max-w-none"
        />
      </picture>
      <picture
        class="pointer-events-none absolute right-[clamp(-270px,2px-18.9vw,-69px)] top-[clamp(-165px,1px-11.5vw,-42px)] z-0 rotate-[20deg] scale-y-[-1]"
      >
        <source :srcset="monsteraWebp" type="image/webp" />
        <img
          :src="monsteraWebp"
          alt=""
          width="456"
          height="456"
          decoding="async"
          loading="lazy"
          aria-hidden="true"
          class="size-[clamp(117px,-2px+31.8vw,456px)] max-w-none"
        />
      </picture>
    </div>
  </section>
</template>
