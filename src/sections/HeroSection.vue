<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import iconArrowDown from '../assets/icons/arrow-down.svg'
import monsteraWebp from '../assets/images/decorative-monstera-leaf.webp'
import monsteraPng from '../assets/images/decorative-monstera-leaf.png'
import heroVideo from '../assets/video/input.mp4'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'

// register GSAP plugin
gsap.registerPlugin(SplitText, ScrollTrigger)

// detect screens less then 768 as mobile devices
const isMobile = useMediaQuery('(max-width: 767px)')
const prefersReducedMotion = usePrefersReducedMotion()

// create reactive container with .value field where Vue will add real DOM element value
// type null is important because element exists only after mount
const sectionRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)

// create variable to store the animation context
let ctx: gsap.Context | undefined

// make actions only after the component is mounted
onMounted(() => {
  // add check if section isn`t found or user has reduced motion
  if (!sectionRef.value || prefersReducedMotion.value) return

  // Scope selectors to the hero section and revert all GSAP work on cleanup.
  ctx = gsap.context(function (this: gsap.Context) {
    // set value for start and end video timeline params
    const startValue = isMobile.value ? 'top 50%' : 'center 60%'
    const endValue = isMobile.value ? '120% top' : 'bottom top'

    // initiate elements for SplitText plugin
    const heroSplit = new SplitText('#title', { type: 'chars,words', aria: 'auto' })
    const paragraphSplit = new SplitText('.animation-marker', { type: 'lines', aria: 'auto' })

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
        paragraphSplit.lines,
        {
          opacity: 0,
          yPercent: 100,
          duration: 1.8,
          ease: 'expo.out',
          stagger: 0.06,
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

    // get video obj
    const video = videoRef.value
    if (!video) return

    const initVideoScroll = () => {
      // Pin the video section and scrub timeline progress between start/end.
      const videoTimeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: 'video',
            start: startValue,
            end: endValue,
            scrub: true,
            pin: true,
          },
        })

      // Drive playback by animating currentTime from 0 to full duration.
      videoTimeline.to(video, {
        currentTime: video.duration,
      })
    }

    const onLoadedMetadata = () => {
      initVideoScroll()
    }

    // If metadata is ready, start immediately; otherwise wait for it once.
    if (video.readyState >= 1) {
      initVideoScroll()
    } else {
      video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true })
    }

    // On unmount, revert SplitText wrappers and restore original text markup.
    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      heroSplit.revert()
      paragraphSplit.revert()
    }
  }, sectionRef.value)
})

// clean listeners
onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    ref="sectionRef"
    id="hero"
    aria-labelledby="hero-title"
    class="relative flex flex-col flex-between min-h-[calc(100dvh-88px)] overflo-x-hidden bg-section-radial py-16 md:py-24 lg:py-0"
  >
    <h1 id="title" class="decorative-text relative z-10 flex-center pt-14">MOJITO</h1>

    <div class="relative z-10 container flex-between">
      <a
        href="#menu"
        aria-label="Scroll to cocktails menu"
        class="absolute right-0 top-[-240px] z-10 hover:opacity-80 focus-ring"
      >
        <img
          :src="iconArrowDown"
          alt=""
          width="23"
          height="152"
          decoding="async"
          aria-hidden="true"
          class="arrow h-auto w-auto"
        />
      </a>

      <div class="flex flex-col gap-2">
        <p class="animation-marker text-base">Cool. Crisp. Classic.</p>
        <h2 class="animation-marker font-display text-[50px] leading-none text-accent">
          Sip the Spirit <br />
          of Summer
        </h2>
      </div>

      <div class="flex max-w-[270px] flex-col items-right gap-2">
        <p class="animation-marker text-base leading-7">
          Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless
          recipes <br />— designed to delight your senses.
        </p>
        <div class="flex">
          <a
            href="#menu"
            class="animation-marker text-base transition-opacity hover:opacity-80 focus-ring"
          >
            View cocktails
          </a>
        </div>
      </div>
    </div>

    <picture id="left-leaf" class="pointer-events-none absolute -left-32 top-48 z-10">
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraPng"
        alt=""
        width="326"
        height="326"
        decoding="async"
        aria-hidden="true"
        class="size-[326px] max-w-none rotate-45 scale-x-[-1]"
      />
    </picture>
    <picture id="right-leaf" class="pointer-events-none absolute -right-47 -top-4 z-10">
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraPng"
        alt=""
        width="356"
        height="356"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[356px] max-w-none rotate-[-26deg]"
      />
    </picture>

    <div class="video absolute inset-0">
      <video
        id="hero-video"
        ref="videoRef"
        class="mix-blend-lighten"
        :src="heroVideo"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </div>
    <div aria-hidden="true" class="noise-overlay" />
  </section>
</template>
