/**
 * Philosophy section
 *
 * GSAP behavior:
 * - Splits the main heading into words with SplitText for a staggered reveal.
 * - Runs a one-time scroll-triggered timeline to animate heading words and
 *   then fade in all philosophy grid items.
 *
 * Optimizations and accessibility:
 * - Dynamic GSAP loading (`gsap`, `SplitText`, `ScrollTrigger`) reduces initial bundle cost.
 * - Animation setup is skipped when users prefer reduced motion.
 * - Section-scoped GSAP context and SplitText revert keep markup clean on unmount.
 */
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'

type PhilosophyGsapBundle = {
  gsap: typeof import('gsap').default
  SplitText: typeof import('gsap/SplitText').SplitText
}

let philosophyGsapBundle: PhilosophyGsapBundle | null = null
let philosophyGsapBundlePromise: Promise<PhilosophyGsapBundle> | null = null

async function loadPhilosophyGsapBundle() {
  if (philosophyGsapBundle) return philosophyGsapBundle

  if (!philosophyGsapBundlePromise) {
    philosophyGsapBundlePromise = (async () => {
      const [{ default: gsap }, { SplitText }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/SplitText'),
        import('gsap/ScrollTrigger'),
      ])
      gsap.registerPlugin(SplitText, ScrollTrigger)
      return { gsap, SplitText }
    })()
  }

  philosophyGsapBundle = await philosophyGsapBundlePromise
  return philosophyGsapBundle
}

import bentoBartenderWebp from '../assets/images/bento-bartender-pouring.webp'
import bentoGuestsWebp from '../assets/images/bento-guests-drinking.webp'
import bentoGarnishWebp from '../assets/images/bento-cocktail-garnish.webp'
import bentoRowWebp from '../assets/images/bento-cocktails-row.webp'
import iconStar from '../assets/icons/icon-star.svg'
import iconCheck from '../assets/icons/icon-check.png'
import avatar1Webp from '../assets/images/avatar-customer-1.webp'
import avatar2Webp from '../assets/images/avatar-customer-2.webp'
import avatar3Webp from '../assets/images/avatar-customer-3.webp'

const customerAvatars = [
  { webp: avatar1Webp, png: avatar1Webp },
  { webp: avatar2Webp, png: avatar2Webp },
  { webp: avatar3Webp, png: avatar3Webp },
]

const checklistItems = [
  'Perfectly balanced blends',
  'Garnished to perfection',
  'Ice-cold every time',
  'Expertly shaken & stirred',
]

const prefersReducedMotion = usePrefersReducedMotion()

const sectionRef = ref<HTMLElement | null>(null)

let ctx: { revert: () => void } | undefined

onMounted(async () => {
  if (!sectionRef.value || prefersReducedMotion.value) return

  const { gsap, SplitText } = await loadPhilosophyGsapBundle()
  const mountedSection = sectionRef.value

  ctx = gsap.context(function () {
    const titleSplit = new SplitText('#philosophy-title', { type: 'words', aria: 'auto' })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: mountedSection,
        start: 'top center',
        once: true,
      },
    })

    timeline
      .from(titleSplit.words, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: 'expo.out',
        stagger: 0.02,
      })
      .from(
        '#philosophy-grid > *',
        {
          opacity: 0,
          duration: 1,
          ease: 'power1.inOut',
          stagger: 0.04,
        },
        '-=0.5',
      )

    return () => {
      titleSplit.revert()
    }
  }, mountedSection)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    ref="sectionRef"
    id="philosophy"
    aria-labelledby="philosophy-title"
    class="flex flex-col justify-center min-h-[calc(100dvh-var(--header-height,0px))] py-[clamp(50px,6vw,100px)] overflow-hidden"
  >
    <div class="container grid grid-cols-1 lg:grid-cols-2 gap-y-[clamp(32px,6vw,80px)]">
      <div class="lg:col-span-1 flex flex-col gap-[32px]">
        <p
          class="flex-center rounded-pill bg-white text-black text-sm px-4 py-2 text-lg font-medium max-w-[136px]"
        >
          Best Cocktails
        </p>
        <h2
          id="philosophy-title"
          class="font-display text-foreground text-[clamp(3rem,2.65rem+1.5vw,4rem)] w-full max-w-[550px] leading-[0.9]"
        >
          Where every detail matters - from muddle to garnish
        </h2>
      </div>

      <div class="lg:col-span-1 lg:justify-self-end w-full max-w-[430px]">
        <div class="flex flex-col gap-[32px]">
          <p id="philosophy-paragraph" class="text-md lg:text-lg text-foreground">
            Every cocktail we serve is a reflection of our obsession with detail — from the first
            muddle to the final garnish. That care is what turns a simple drink into something truly
            memorable.
          </p>
          <div class="flex flex-nowrap items-center gap-4">
            <div
              class="flex flex-col items-start pr-1 lg:pr-[25px] border-r border-r-white/20 min-w-[180px]"
            >
              <div class="flex items-center gap-1 mb-[20px]" aria-hidden="true">
                <img
                  v-for="n in 5"
                  :key="n"
                  :src="iconStar"
                  alt=""
                  width="16"
                  height="16"
                  decoding="async"
                  class="size-4"
                />
              </div>
              <p class="font-bold text-[clamp(1.25rem,1.16rem+0.4vw,1.5rem)]">4.5/5</p>
              <p class="text-xs lg:text-sm text-muted-subtle">More than +12000 customers</p>
            </div>

            <div
              class="relative flex h-[85px] w-[196px] items-center justify-center overflow-hidden rounded-pill bg-card-gradient"
              aria-label="More than 12,000 customers"
            >
              <div aria-hidden="true" class="noisy pointer-events-none absolute inset-0 z-10" />
              <div class="flex items-center z-20">
                <picture
                  v-for="(avatar, index) in customerAvatars"
                  :key="index"
                  class="relative -mr-5 sm:-mr-3.5 shrink-0"
                >
                  <source :srcset="avatar.webp" type="image/webp" />
                  <img
                    :src="avatar.png"
                    alt=""
                    width="44"
                    height="44"
                    decoding="async"
                    loading="lazy"
                    class="size-11 rounded-full border border-white"
                  />
                </picture>
                <span
                  class="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-white bg-accent-badge text-sm font-medium leading-[14px] text-primary-foreground"
                >
                  +12k
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="philosophy-grid"
        class="lg:col-span-2 grid grid-cols-1 lg:grid-cols-[330fr_330fr_80fr_480fr] gap-[20px]"
      >
        <figure
          class="relative h-[320px] lg:h-full lg:min-h-[285px] xl:max-h-[285px] overflow-hidden rounded-card"
        >
          <div aria-hidden="true" class="noisy pointer-events-none absolute inset-0 z-10" />
          <picture>
            <source :srcset="bentoBartenderWebp" type="image/webp" />
            <img
              :src="bentoBartenderWebp"
              alt="Bartender pouring a cocktail"
              width="330"
              height="285"
              decoding="async"
              loading="lazy"
              class="h-full w-full object-cover"
            />
          </picture>
        </figure>

        <article
          aria-labelledby="philosophy-feature-title"
          class="relative flex min-h-[285px] flex-col overflow-hidden rounded-card bg-card-gradient px-6 py-8"
        >
          <div aria-hidden="true" class="noisy pointer-events-none absolute inset-0 z-10" />
          <h3
            id="philosophy-feature-title"
            class="font-display text-[clamp(1.875rem,1.74rem+0.56vw,2.25rem)] leading-none text-foreground z-20"
          >
            Crafted to Impress
          </h3>
          <ul class="pt-5 border-t mt-3.5 flex flex-col gap-3.5 border-white/20 z-20">
            <li v-for="item in checklistItems" :key="item" class="flex items-center gap-2.5">
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
        </article>

        <figure
          class="relative h-[204px] lg:h-full lg:min-h-[285px] xl:max-h-[285px] overflow-hidden rounded-card lg:col-span-2"
        >
          <div aria-hidden="true" class="noisy pointer-events-none absolute inset-0 z-10" />
          <picture>
            <source :srcset="bentoGuestsWebp" type="image/webp" />
            <img
              :src="bentoGuestsWebp"
              alt="Guests enjoying cocktails at the bar"
              width="580"
              height="285"
              decoding="async"
              loading="lazy"
              class="h-full w-full object-cover"
            />
          </picture>
        </figure>

        <figure
          class="relative h-[147px] lg:h-full lg:min-h-[285px] xl:max-h-[285px] overflow-hidden rounded-card lg:col-span-3"
        >
          <div aria-hidden="true" class="noisy pointer-events-none absolute inset-0 z-10" />
          <picture>
            <source :srcset="bentoRowWebp" type="image/webp" />
            <img
              :src="bentoRowWebp"
              alt="Assorted colorful cocktails in a row"
              width="780"
              height="285"
              decoding="async"
              loading="lazy"
              class="h-full w-full object-cover"
            />
          </picture>
        </figure>

        <figure
          class="relative h-[240px] lg:h-full lg:min-h-[285px] xl:max-h-[285px] overflow-hidden rounded-card"
        >
          <div aria-hidden="true" class="noisy pointer-events-none absolute inset-0 z-10" />
          <picture>
            <source :srcset="bentoGarnishWebp" type="image/webp" />
            <img
              :src="bentoGarnishWebp"
              alt="Cocktail with oranges and flowers"
              width="317"
              height="317"
              decoding="async"
              loading="lazy"
              class="h-full w-full object-cover"
            />
          </picture>
        </figure>
      </div>
    </div>
  </section>
</template>
