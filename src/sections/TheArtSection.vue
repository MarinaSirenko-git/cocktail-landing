<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'
import { useMediaQuery } from '@vueuse/core'

// register GSAP plugin
gsap.registerPlugin(ScrollTrigger)

import iconCheck from '../assets/icons/icon-check.svg'
import artMask from '../assets/images/art-section-mask.png'
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

const maskStyle = {
  WebkitMaskImage: `url(${artMask})`,
  maskImage: `url(${artMask})`,
  WebkitMaskSize: '77%',
  maskSize: '77%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
}

// detect screens less then 768 as mobile devices and reduced motion
const isMobile = useMediaQuery('(max-width: 767px)')
const prefersReducedMotion = usePrefersReducedMotion()

// create reactive container with .value field where Vue will add real DOM element value
// type null is important because element exists only after mount
const sectionRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

// create variable to store the animation context
let ctx: gsap.Context | undefined

// make actions only after the component is mounted
onMounted(() => {
  // add check if section isn`t found or user has reduced motion
  if (!sectionRef.value || !contentRef.value || prefersReducedMotion.value) return

  const trigger = isMobile.value ? sectionRef.value : contentRef.value
  const headerHeight = Math.round(
    Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
    ) || 0,
  )
  // Start when trigger top reaches the line below the fixed header (not viewport top).
  const start = `top top+=${headerHeight}`

  // Scope selectors to the art section and revert all GSAP work on cleanup.
  ctx = gsap.context(function (this: gsap.Context) {
    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger,
        start,
        end: 'bottom center',
        scrub: 1.5,
        pin: sectionRef.value,
      },
    })

    maskTimeline
      .to('.will-fade', {
        opacity: 0,
        stagger: 0.2,
        ease: 'power1.inOut',
      })
      .fromTo(
        '.will-big',
        {
          scale: 1,
          maskPosition: 'center',
          maskSize: '77%',
          WebkitMaskSize: '77%',
        },
        {
          scale: 1.3,
          maskPosition: 'center',
          maskSize: '400%',
          WebkitMaskSize: '400%',
          duration: 1,
          ease: 'power1.inOut',
        },
      )
      .to('.will-appear', {
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
      })
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
    class="relative overflow-hidden bg-section-radial py-[clamp(63px,40px+6vw,127px)] min-h-[100svh]"
  >
    <div class="container flex-center flex-col">
      <h2
        class="will-fade text-[clamp(7.625rem,3.05rem+19.5vw,20.625rem)] font-display leading-none tracking-tight noisy-display-text text-nowrap"
      >
        The ART
      </h2>
      <div
        ref="contentRef"
        class="-mt-[120px] lg:-mt-[200px] flex flex-col lg:flex-row lg:flex-wrap lg:flex-between w-full"
      >
        <ul class="will-fade flex flex-col gap-[14px] pt-[32px] lg:pt-[50px] order-3 lg:order-1">
          <li v-for="item in leftItems" :key="item" class="flex items-center gap-2.5">
            <span
              class="flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-panel bg-surface"
              aria-hidden="true"
            >
              <img :src="iconCheck" alt="" width="8" height="7" decoding="async" class="size-2" />
            </span>
            <span
              class="text-[clamp(1rem,0.96rem+0.19vw,1.125rem)] font-medium leading-6 text-foreground"
              >{{ item }}</span
            >
          </li>
        </ul>
        <figure
          class="relative mx-auto w-[626px] h-[626px] order-1 lg:order-2"
        >
          <picture class="flex size-[364px] rounded-card lg:size-[626px] absolute -top-[100px] left-0">
            <source :srcset="bartenderWebp" type="image/webp" />
            <img
              :src="bartenderPng"
              alt="Bartender preparing a cocktail seen through a glass"
              width="626"
              height="626"
              decoding="async"
              fetchpriority="high"
              class="will-big size-full object-contain"
              :style="maskStyle"
            />
          </picture>
        </figure>
        <ul
          class="will-fade flex flex-col gap-[14px] pt-[32px] lg:pt-[50px] order-4 lg:order-3 ml-auto lg:ml-0"
        >
          <li v-for="item in rightItems" :key="item" class="flex items-center gap-2.5">
            <span
              class="flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-panel bg-surface"
              aria-hidden="true"
            >
              <img :src="iconCheck" alt="" width="8" height="7" decoding="async" class="size-2" />
            </span>
            <span
              class="text-[clamp(1rem,0.96rem+0.19vw,1.125rem)] font-medium leading-6 text-foreground"
              >{{ item }}</span
            >
          </li>
        </ul>
        <h3
          id="the-art-subtitle"
          class="will-fade mt-[10px] lg:mt-[-100px] text-[clamp(2.25rem,1.99rem+1.13vw,3rem)] text-center font-display lg:w-full font-normal leading-[0.9] tracking-tight order-2 lg:order-4"
        >
          Sip-Worthy Perfection
        </h3>
      </div>
    </div>

    <div class="will-appear pointer-events-none absolute bottom-10 left-1/2 z-10 w-full -translate-x-1/2 space-y-5 px-5 text-center opacity-0 lg:bottom-16"
    >
      <h3
        class="font-display text-[clamp(2.25rem,1.99rem+1.13vw,3rem)] font-normal leading-[0.9] tracking-tight text-foreground w-full"
      >
        Made with Craft and Poured with Passion
      </h3>
      <p class="text-base leading-7 text-muted sm:text-lg lg:leading-8">
        This isn’t just a drink. It’s a carefully crafted moment made just for you.
      </p>
    </div>
  </section>
</template>
