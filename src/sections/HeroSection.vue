/**
 * Hero section
 *
 * GSAP behavior:
 * - Splits and animates the hero heading/subtitle text on mount.
 * - Runs a scroll-linked parallax timeline for leaves and CTA arrow.
 * - Drives hero video progress with ScrollTrigger + scrubbed `currentTime` updates.
 *
 * Interaction model:
 * - Defers video mount with idle scheduling to reduce initial main-thread pressure.
 * - Keeps poster visible until video is ready, then cross-fades to video.
 * - Supports smooth anchor scrolling to the menu section via ScrollToPlugin.
 *
 * Optimizations and accessibility:
 * - Dynamic GSAP loading (`gsap`, `SplitText`, `ScrollTrigger`, `ScrollToPlugin`)
 *   keeps initial bundle smaller.
 * - Guards all animation setup when reduced-motion is enabled.
 * - Uses scoped GSAP context and cleanup on unmount to avoid duplicate triggers.
 */
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import iconArrowDown from '../assets/icons/arrow-down.svg'
import monsteraWebp from '../assets/images/decorative-monstera-leaf.webp'
import heroVideo from '../assets/video/output.mp4'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'

const heroPosterWebp = '/images/hero-poster.webp'
const { t } = useI18n()

type GsapBundle = {
  gsap: typeof import('gsap').default
  SplitText: typeof import('gsap/SplitText').SplitText
}

let gsapBundle: GsapBundle | null = null
let gsapBundlePromise: Promise<GsapBundle> | null = null

async function loadGsapBundle() {
  if (gsapBundle) return gsapBundle

  if (!gsapBundlePromise) {
    gsapBundlePromise = (async () => {
      const [{ default: gsap }, { SplitText }, { ScrollTrigger }, { ScrollToPlugin }] = await Promise.all([
        import('gsap'),
        import('gsap/SplitText'),
        import('gsap/ScrollTrigger'),
        import('gsap/ScrollToPlugin'),
      ])

      gsap.registerPlugin(SplitText, ScrollTrigger, ScrollToPlugin)

      return { gsap, SplitText }
    })()
  }

  gsapBundle = await gsapBundlePromise
  return gsapBundle
}

const isMobile = useMediaQuery('(max-width: 767px)')
const prefersReducedMotion = usePrefersReducedMotion()

const sectionRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const showVideo = ref(false)
const isVideoReady = ref(false)

let ctx: { revert: () => void } | undefined
let activeScrollTween: any = null
let idleHandle: number | null = null
let videoTimeline: any = null
const videoScrubProxy = { time: 0 }
let lastScrubTime = -1
let videoScrollInitialized = false

type IdleSchedulerType = 'idle' | 'timeout'
let idleSchedulerType: IdleSchedulerType | null = null

function scheduleVideoMount() {
  const mountVideo = () => {
    showVideo.value = true
  }

  if (typeof window.requestIdleCallback === 'function') {
    idleHandle = window.requestIdleCallback(() => {
      mountVideo()
    }, { timeout: 1200 })
    idleSchedulerType = 'idle'
    return
  }

  idleHandle = window.setTimeout(() => {
    mountVideo()
  }, 250)
  idleSchedulerType = 'timeout'
}

function applyVideoScrubTime(video: HTMLVideoElement, target: number) {
  if (!Number.isFinite(target)) return

  const rounded = Math.round(target * 50) / 50
  if (rounded === lastScrubTime) return
  if (Math.abs(video.currentTime - rounded) < 0.02) return

  lastScrubTime = rounded

  try {
    video.currentTime = rounded
  } catch {
  }
}

function setupVideoScroll(video: HTMLVideoElement) {
  if (videoScrollInitialized) return
  if (!sectionRef.value || prefersReducedMotion.value || !gsapBundle) return

  const duration = video.duration
  if (!Number.isFinite(duration) || duration <= 0) return

  const { gsap } = gsapBundle

  const startValue = isMobile.value ? 'top 50%' : 'center 60%'
  const endValue = isMobile.value ? '120% top' : 'bottom top'

  videoTimeline?.kill()
  videoScrubProxy.time = video.currentTime
  lastScrubTime = -1

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero-video',
      start: startValue,
      end: endValue,
      scrub: true,
      pin: true,
    },
  })

  timeline.to(videoScrubProxy, {
    time: duration,
    ease: 'none',
    onUpdate: () => {
      applyVideoScrubTime(video, videoScrubProxy.time)
    },
  })

  videoTimeline = timeline
  videoScrollInitialized = true
}

function trySetupVideoScroll() {
  const video = videoRef.value
  if (!video || !isVideoReady.value) return
  setupVideoScroll(video)
}

function markVideoReady() {
  if (isVideoReady.value) return
  isVideoReady.value = true
  trySetupVideoScroll()
}

function onVideoLoadedData() {
  const video = videoRef.value
  if (!video) return

  video.preload = 'auto'
  markVideoReady()
}

onMounted(() => {
  scheduleVideoMount()

  if (!sectionRef.value || prefersReducedMotion.value) return
  const mountedSection = sectionRef.value

  void loadGsapBundle().then(({ gsap, SplitText }) => {
    ctx = gsap.context(function () {
      const heroSplit = new SplitText('#title', { type: 'chars,words', aria: 'auto' })
      const subtitleSplit = !isMobile.value
        ? new SplitText('.hero-subtitle', { type: 'lines', aria: 'auto' })
        : null

      heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

      gsap
        .timeline()
        .from(heroSplit.chars, {
          yPercent: 100,
          duration: 1.8,
          ease: 'expo.out',
          stagger: 0.05,
        })
        .from(
          subtitleSplit ? subtitleSplit.lines : '.hero-subtitle',
          {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
          },
          '>',
        )
        .from(
          '.hero-description',
          {
            opacity: 0,
            yPercent: 20,
            duration: 1.2,
            ease: 'expo.out',
          },
          '>',
        )

      gsap
        .timeline({
          scrollTrigger: {
            trigger: mountedSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
        .to('#right-leaf', { y: 200 }, 0)
        .to('#left-leaf', { y: -200 }, 0)
        .to('.arrow', { y: 100 }, 0)

      return () => {
        heroSplit.revert()
        subtitleSplit?.revert()
      }
    }, mountedSection)

    trySetupVideoScroll()
  })
})

onUnmounted(() => {
  ctx?.revert()
  videoTimeline?.kill()
  videoTimeline = null
  videoScrollInitialized = false
  lastScrubTime = -1
  activeScrollTween?.kill()
  activeScrollTween = null

  if (idleHandle !== null) {
    if (idleSchedulerType === 'idle' && typeof window.cancelIdleCallback === 'function') {
      window.cancelIdleCallback(idleHandle)
    } else {
      window.clearTimeout(idleHandle)
    }
    idleHandle = null
    idleSchedulerType = null
  }
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

  if (!gsapBundle) {
    const top = target.getBoundingClientRect().top + window.scrollY - offsetY
    window.scrollTo({ top, behavior: 'smooth' })
    return
  }

  activeScrollTween = gsapBundle.gsap.to(window, {
    duration: 0.9,
    ease: 'power2.inOut',
    scrollTo: { y: target, offsetY },
    onComplete: () => {
      activeScrollTween = null
    },
  })
}

function onCtaClick(event: MouseEvent) {
  event.preventDefault()
  scrollToSection('#menu')
}
</script>

<template>
  <div class="hero-stage relative w-full">
    <section
      ref="sectionRef"
      id="hero"
      aria-labelledby="hero-title"
      class="flex flex-col justify-center noisy relative z-20 flex h-[calc(100dvh-var(--header-height,0px))] w-full flex-start lg:flex-between border border-transparent"
    >
      <div class="container flex flex-col md:justify-between h-full">
        <h1 id="title" class="decorative-text text-[110px] md:text-[16vw] relative z-20 flex-center h-[30%] md:h-[50%]">{{ t('hero.title') }}</h1>

        <div class="relative z-20 flex-start md:h-[50%] flex md:justify-between">
          <a
            href="#menu"
            :aria-label="t('hero.scrollToMenuAria')"
            class="absolute right-0 top-[-30%] z-20 hover:opacity-80 focus-ring"
            @click="onCtaClick"
          >
            <img
              :src="iconArrowDown"
              alt=""
              width="23"
              height="152"
              decoding="async"
              aria-hidden="true"
              class="arrow h-auto w-auto hidden lg:block"
            />
          </a>

          <div class="flex flex-col gap-2 hidden lg:block">
            <p class="text-base xl:text-lg xl:mb-5">{{ t('hero.eyebrow') }}</p>
            <h2 class="hero-subtitle font-display text-[4vw] leading-none text-accent">
              {{ t('hero.subtitleLine1') }} <br />
              {{ t('hero.subtitleLine2') }}
            </h2>
          </div>

          <div class="flex w-full lg:max-w-[270px] xl:max-w-[300px] flex-col items-center lg:items-start gap-2 z-20">
            <p
              class="hero-description max-w-[32ch] lg:max-w-none text-pretty text-base xl:text-lg xl:mb-5 leading-7 text-center lg:text-start"
            >
              {{ t('hero.descriptionLine1') }}
              <br class="hidden lg:block" />
              {{ t('hero.descriptionLine2') }}
            </p>
            <div class="flex">
              <a
                href="#menu"
                class="text-base font-semibold xl:text-lg xl:mb-5 transition-opacity hover:opacity-80 focus-ring text-accent mt-6 lg:mt-0"
                @click="onCtaClick"
              >
                {{ t('hero.cta') }}
              </a>
            </div>
          </div>
        </div>

        <picture
          id="left-leaf"
          class="pointer-events-none absolute -left-18 lg:-left-32 -bottom-18 lg:-bottom-60 xxl:top-100 z-20"
        >
          <source :srcset="monsteraWebp" type="image/webp" />
          <img
            :src="monsteraWebp"
            alt=""
            width="326"
            height="326"
            decoding="async"
            aria-hidden="true"
            class="size-[177px] lg:size-[326px] xl:size-[clamp(356px,24vw,560px)] max-w-none rotate-45 scale-x-[-1]"
          />
        </picture>
        <picture
          id="right-leaf"
          class="pointer-events-none absolute -bottom-18 -right-[70px] lg:translate-y-0 lg:-right-47 lg:-top-4 z-20"
        >
          <source :srcset="monsteraWebp" type="image/webp" />
          <img
            :src="monsteraWebp"
            alt=""
            width="356"
            height="356"
            decoding="async"
            loading="lazy"
            aria-hidden="true"
            class="size-[173px] lg:size-[356px] xl:size-[clamp(356px,24vw,560px)] max-w-none rotate-[-26deg]"
          />
        </picture>
      </div>
    </section>
    <div class="pointer-events-none absolute inset-0 z-10">
      <img
        :src="heroPosterWebp"
        alt=""
        width="1280"
        height="720"
        fetchpriority="high"
        loading="eager"
        decoding="async"
        aria-hidden="true"
        class="video transition-opacity duration-500"
        :class="isVideoReady ? 'opacity-0' : 'opacity-100'"
      />
      <video
        v-if="showVideo"
        id="hero-video"
        ref="videoRef"
        :src="heroVideo"
        :poster="heroPosterWebp"
        class="video transition-opacity duration-500"
        :class="isVideoReady ? 'opacity-100' : 'opacity-0'"
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        @loadeddata="onVideoLoadedData"
      />
    </div>
  </div>
</template>
