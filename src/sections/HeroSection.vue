<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import iconArrowDown from '../assets/icons/arrow-down.svg'
import heroPosterWebp from '../assets/images/hero-poster.webp'
import monsteraWebp from '../assets/images/decorative-monstera-leaf.webp'
import heroVideo from '../assets/video/output.mp4'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'

// register GSAP plugin
gsap.registerPlugin(SplitText, ScrollTrigger, ScrollToPlugin)

// detect screens less then 768 as mobile devices and reduced motion
const isMobile = useMediaQuery('(max-width: 767px)')
const prefersReducedMotion = usePrefersReducedMotion()

// create reactive container with .value field where Vue will add real DOM element value
// type null is important because element exists only after mount
const sectionRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const showVideo = ref(false)
const isVideoReady = ref(false)

// create variable to store the animation context
let ctx: gsap.Context | undefined
let activeScrollTween: gsap.core.Tween | null = null
let idleHandle: number | null = null
let videoTimeline: gsap.core.Timeline | null = null

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

function setupVideoScroll(video: HTMLVideoElement) {
  if (!sectionRef.value || prefersReducedMotion.value) return

  const startValue = isMobile.value ? 'top 50%' : 'center 60%'
  const endValue = isMobile.value ? '120% top' : 'bottom top'

  videoTimeline?.kill()
  videoTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero-video',
      start: startValue,
      end: endValue,
      scrub: true,
      pin: true,
    },
  })

  videoTimeline.to(video, {
    currentTime: video.duration,
    ease: 'none',
  })
}

function onVideoLoadedData() {
  const video = videoRef.value
  if (!video) return

  isVideoReady.value = true
  setupVideoScroll(video)
}

// make actions only after the component is mounted
onMounted(() => {
  scheduleVideoMount()

  // add check if section isn`t found or user has reduced motion
  if (!sectionRef.value || prefersReducedMotion.value) return

  // Scope selectors to the hero section and revert all GSAP work on cleanup.
  ctx = gsap.context(function (this: gsap.Context) {
    // initiate elements for SplitText plugin
    const heroSplit = new SplitText('#title', { type: 'chars,words', aria: 'auto' })
    const subtitleSplit = !isMobile.value
      ? new SplitText('.hero-subtitle', { type: 'lines', aria: 'auto' })
      : null

    // add special class to each title's char
    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

    // Text reveal timeline (title chars, then subtitle lines).
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

    // Scroll-linked parallax timeline for decorative elements (leaves + arrow).
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      .to('#right-leaf', { y: 200 }, 0)
      .to('#left-leaf', { y: -200 }, 0)
      .to('.arrow', { y: 100 }, 0)

    // On unmount, revert SplitText wrappers and restore original text markup.
    return () => {
      heroSplit.revert()
      subtitleSplit?.revert()
    }
  }, sectionRef.value)
})

// clean listeners
onUnmounted(() => {
  ctx?.revert()
  videoTimeline?.kill()
  videoTimeline = null
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

  activeScrollTween = gsap.to(window, {
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
        <h1 id="title" class="decorative-text text-[115px] md:text-[16vw] relative z-20 flex-center h-[30%] md:h-[50%]">MOJITO</h1>

        <div class="relative z-20 flex-start md:h-[50%] flex md:justify-between">
          <a
            href="#menu"
            aria-label="Scroll to cocktails menu"
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
            <p class="text-base xl:text-lg xl:mb-5">Cool. Crisp. Classic.</p>
            <h2 class="hero-subtitle font-display text-[4vw] leading-none text-accent">
              Sip the Spirit <br />
              of Summer
            </h2>
          </div>

          <div class="flex w-full lg:max-w-[270px] xl:max-w-[300px] flex-col items-center lg:items-start gap-2 z-20">
            <p
              class="hero-description max-w-[32ch] lg:max-w-none text-pretty text-base xl:text-lg xl:mb-5 leading-7 text-center lg:text-start"
            >
              Every cocktail on our menu is a blend of premium ingredients, creative flair, and
              timeless recipes <br class="hidden lg:block" />— designed to delight your senses.
            </p>
            <div class="flex">
              <a
                href="#menu"
                class="text-base font-semibold xl:text-lg xl:mb-5 transition-opacity hover:opacity-80 focus-ring text-accent mt-6 lg:mt-0"
                @click="onCtaClick"
              >
                View cocktails
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
