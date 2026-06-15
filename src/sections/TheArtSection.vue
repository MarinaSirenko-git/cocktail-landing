<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'
import { useMediaQuery } from '@vueuse/core'

// register GSAP plugin
gsap.registerPlugin(ScrollTrigger)

import iconCheck from '../assets/icons/icon-check.png'
import bartenderWebp from '../assets/images/bartender-photo.webp'
import bartenderPng from '../assets/images/bartender-photo.png'

const leftItems = [
  'Handpicked ingredients',
  'Signature techniques',
  'Bartending artistry in action',
  'Freshly muddled flavors',
]

const rightItems = [
  'Perfectly balanced blends',
  'Garnished to perfection',
  'Ice-cold every time',
  'Expertly shaken & stirred',
]

// detect screens less then 768 as mobile devices and reduced motion
const isMobile = useMediaQuery('(max-width: 767px)')
const prefersReducedMotion = usePrefersReducedMotion()

// create reactive container with .value field where Vue will add real DOM element value
// type null is important because element exists only after mount
const sectionRef = ref<HTMLElement | null>(null)

// create variable to store the animation context
let ctx: gsap.Context | undefined

// make actions only after the component is mounted
onMounted(() => {
  // add check if section isn`t found or user has reduced motion
  if (!sectionRef.value || prefersReducedMotion.value) return

  const trigger = sectionRef.value

  // Start when trigger top reaches the line below the fixed header (not viewport top).
  const start = isMobile.value ? `top 20%` : `top top`

  // Scope selectors to the art section and revert all GSAP work on cleanup.
  ctx = gsap.context(function (this: gsap.Context) {
    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger,
        start,
        end: 'bottom center',
        scrub: 1.5,
        pin: true,
      },
    })

    maskTimeline
      .to('.will-fade', {
        opacity: 0,
        stagger: 0.2,
        ease: 'power1.inOut',
      })
      .fromTo('.will-fade-title', { opacity: 1 }, { opacity: 0, duration: 1, ease: 'power1.inOut' })

    maskTimeline
      .fromTo(
        '.masked-img',
        {
          scale: 1,
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskSize: '50%',
          WebkitMaskSize: '50%',
        },
        {
          scale: 1.3,
          maskSize: '400%',
          WebkitMaskSize: '400%',
          duration: 1,
          ease: 'power1.inOut',
        },
      )
      .fromTo(
        '.will-appear',
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          ease: 'power1.inOut',
        },
      )
  }, sectionRef.value)
})

// clean listeners
onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    id="the-art"
    ref="sectionRef"
    aria-labelledby="the-art-subtitle"
    class="flex flex-col justify-center relative overflow-hidden bg-section-radial min-h-[calc(100dvh-var(--header-height,0px))] py-[clamp(63px,40px+6vw,127px)]"
  >
    <div class="container">
      <h2
        class="will-fade noisy-display-text text-[clamp(118px,31vw,252px)] text-center relative font-display font-normal leading-none tracking-[-0.02em] text-nowrap"
      >
        The ART
      </h2>
      <div class="flex md:flex-row flex-col justify-between md:mb-16 md:mt-0 mt-40 gap-10">
        <ul class="will-fade space-y-4">
          <li class="flex items-center gap-2" v-for="item in leftItems" :key="item">
            <img
              :src="iconCheck"
              alt=""
              width="20"
              height="20"
              decoding="async"
              aria-hidden="true"
            />
            <p>{{ item }}</p>
          </li>
        </ul>
        <div
          class="absolute top-0 md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2 w-full md:w-[60vw] h-[50vh] md:h-[70vh] rounded-4xl overflow-hidden"
        >
          <picture>
            <source :srcset="bartenderWebp" type="image/webp" />
            <img
              :src="bartenderPng"
              alt="Bartender preparing a cocktail"
              width="1600"
              height="1066"
              loading="lazy"
              decoding="async"
              class="abs-center masked-img object-contain"
            />
          </picture>
        </div>
        <ul class="will-fade space-y-4">
          <li class="flex items-center gap-2" v-for="item in rightItems" :key="item">
            <img
              :src="iconCheck"
              alt=""
              width="20"
              height="20"
              decoding="async"
              aria-hidden="true"
            />
            <p>{{ item }}</p>
          </li>
        </ul>
      </div>
      <div class="masked-container absolute bottom-0 left-1/2 -translate-x-1/2">
        <h2
          class="will-fade-title text-center leading-none font-display text-[clamp(2.25rem,1.8rem+1.5vw,3rem)]"
        >
          Sip-Worthy Perfection
        </h2>
        <div class="will-appear z-20">
          <h3 class="text-center font-display leading-none text-nowrap text-[clamp(2.25rem,1.8rem+1.5vw,3rem)]">
            Made with Craft and Poured with Passion
          </h3>
          <p class="text-center text-base md:text-md">
            This isn’t just a drink. It’s a carefully crafted moment made just for you.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
