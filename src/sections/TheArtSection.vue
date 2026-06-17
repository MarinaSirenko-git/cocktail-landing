/**
 * The Art section
 *
 * GSAP behavior:
 * - Pins section during scroll via ScrollTrigger.
 * - On desktop, fades out side lists/title, then expands mask on the bartender image,
 *   and reveals the final caption block.
 * - Uses scrubbed timeline for scroll-linked progression.
 *
 * Optimizations:
 * - Dynamic GSAP loading (`gsap` + `ScrollTrigger`) to reduce initial bundle size.
 * - Mobile-specific behavior: desktop fade sequence is skipped on small screens.
 * - Respects reduced-motion user preference and skips animation setup entirely.
 * - Cleans up GSAP context on unmount to prevent duplicate triggers/memory leaks.
 */
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'
import { useMediaQuery } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

type ArtGsapBundle = {
  gsap: typeof import('gsap').default
}

let artGsapBundle: ArtGsapBundle | null = null
let artGsapBundlePromise: Promise<ArtGsapBundle> | null = null

async function loadArtGsapBundle() {
  if (artGsapBundle) return artGsapBundle

  if (!artGsapBundlePromise) {
    artGsapBundlePromise = (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      gsap.registerPlugin(ScrollTrigger)
      return { gsap }
    })()
  }

  artGsapBundle = await artGsapBundlePromise
  return artGsapBundle
}

import iconCheck from '../assets/icons/icon-check.png'
import bartenderWebp from '../assets/images/bartender-photo.webp'

const { t, tm } = useI18n()
const leftItems = computed<string[]>(() => tm('art.leftItems') as string[])
const rightItems = computed<string[]>(() => tm('art.rightItems') as string[])

const isMobile = useMediaQuery('(max-width: 767px)')
const prefersReducedMotion = usePrefersReducedMotion()

const sectionRef = ref<HTMLElement | null>(null)

let ctx: { revert: () => void } | undefined

onMounted(async () => {
  if (!sectionRef.value || prefersReducedMotion.value) return

  const { gsap } = await loadArtGsapBundle()
  const trigger = sectionRef.value

  // Start when trigger top reaches the line below the fixed header (not viewport top).
  const start = isMobile.value ? `top 20%` : `top top`

  // Scope selectors to the art section and revert all GSAP work on cleanup.
  ctx = gsap.context(function () {
    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger,
        start,
        end: 'bottom center',
        scrub: 1.5,
        pin: true,
      },
    })

    if (!isMobile.value) {
      maskTimeline
        .to('.will-fade', {
          opacity: 0,
          stagger: 0.2,
          ease: 'power1.inOut',
        })
        .fromTo(
          '.will-fade-title',
          { opacity: 1 },
          { opacity: 0, duration: 1, ease: 'power1.inOut' },
        )
    }

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

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    id="the-art"
    ref="sectionRef"
    aria-labelledby="the-art-subtitle"
    class="flex flex-col justify-center relative overflow-hidden bg-section-radial min-h-[calc(100dvh-var(--header-height,0px))] py-[clamp(60px,40px+6vw,127px)]"
  >
    <div class="container">
      <h2
        class="will-fade noisy-display-text text-[clamp(100px,20vw,252px)] text-center relative font-display font-normal leading-none tracking-[-0.02em] text-nowrap"
      >
        {{ t('art.title') }}
      </h2>
      <div class="flex md:flex-row flex-col justify-between md:mb-16 md:mt-0 mt-70 gap-10">
        <ul class="will-fade space-y-4">
          <li class="flex items-center gap-2" v-for="item in leftItems" :key="item">
            <span
              class="flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-panel bg-surface"
              aria-hidden="true"
            >
              <img :src="iconCheck" alt="" width="8" height="7" decoding="async" class="size-2" />
            </span>
            <p>{{ item }}</p>
          </li>
        </ul>
        <div
          class="absolute top-0 md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2 w-full md:w-[60vw] h-[50vh] md:h-[70vh] rounded-4xl overflow-hidden"
        >
          <picture>
            <source :srcset="bartenderWebp" type="image/webp" />
            <img
              :src="bartenderWebp"
              :alt="t('art.altBartenderPreparing')"
              width="1600"
              height="1066"
              loading="lazy"
              decoding="async"
              class="abs-center masked-img object-contain"
            />
          </picture>
        </div>
        <ul class="will-fade space-y-4 ml-auto md:ml-0">
          <li class="flex items-center gap-2" v-for="item in rightItems" :key="item">
            <span
              class="flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-panel bg-surface"
              aria-hidden="true"
            >
              <img :src="iconCheck" alt="" width="8" height="7" decoding="async" class="size-2" />
            </span>
            <p>{{ item }}</p>
          </li>
        </ul>
      </div>
      <div
        class="masked-container absolute top-94 md:top-auto md:bottom-0 left-1/2 -translate-x-1/2"
      >
        <h2
          class="will-fade-title text-center text-nowrap leading-none font-display text-[clamp(2.25rem,1.8rem+1.5vw,3rem)]"
        >
          {{ t('art.subtitle') }}
        </h2>
        <div class="will-appear hidden md:block z-20">
          <h3
            class="text-center font-display leading-none text-nowrap text-[clamp(2.25rem,1.8rem+1.5vw,3rem)]"
          >
            {{ t('art.heading') }}
          </h3>
          <p class="text-center text-base md:text-md">
            {{ t('art.description') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
