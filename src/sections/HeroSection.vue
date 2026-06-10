<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import iconArrowDown from '../assets/icons/arrow-down.svg'
import monsteraWebp from '../assets/images/decorative-monstera-leaf.webp'
import monsteraPng from '../assets/images/decorative-monstera-leaf.png'

import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(SplitText, ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | undefined
onMounted(() => {
  if (!sectionRef.value) return
  ctx = gsap.context(function (this: gsap.Context) {
    const heroSplit = new SplitText('#title', { type: 'chars,words', aria: 'auto' })
    const paragraphSplit = new SplitText('.animation-marker', { type: 'lines', aria: 'auto' })

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

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      })
      .to('#right-leaf', {y: 200}, 0)
      .to('#left-leaf', {y: -200}, 0)
  }, sectionRef.value)
})
onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    ref="sectionRef"
    id="hero"
    aria-labelledby="hero-title"
    class="relative overflow-hidden bg-section-radial py-16 md:py-24 lg:min-h-[927px] lg:py-0"
  >
    <h1  id="title" class="decorative-text flex-center m-auto pt-14">MOJITO</h1>

    <div class="relative container flex-between pt-26 pb-16">
      <a
        href="#menu"
        aria-label="Scroll to cocktails menu"
        class="absolute right-0 top-[-60px] z-10 hover:opacity-80 focus-ring"
      >
        <img
          :src="iconArrowDown"
          alt=""
          width="23"
          height="152"
          decoding="async"
          aria-hidden="true"
          class="h-auto w-auto"
        />
      </a>

      <div class="flex flex-col gap-2">
        <p  class="animation-marker text-base">Cool. Crisp. Classic.</p>
        <h2 class="animation-marker font-display text-[50px] leading-none text-accent">
          Sip the Spirit <br />
          of Summer
        </h2>
      </div>

      <div class="flex max-w-[270px] flex-col items-right gap-2">
        <p  class="animation-marker text-base leading-7">
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

    <picture id="left-leaf" class="pointer-events-none absolute -left-32 top-48 z-0">
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
    <picture id="right-leaf" class="pointer-events-none absolute -right-47 -top-4 z-0">
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
  </section>
</template>
