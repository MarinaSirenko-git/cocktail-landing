<script setup lang="ts">
import iconCheck from '../assets/icons/icon-check.svg'
import artMask from '../assets/images/art-section-mask.png'
import bartenderWebp from '../assets/images/bartender-photo.webp'
import bartenderPng from '../assets/images/bartender-photo.png'
import noiseWebp from '../assets/images/noise-texture.webp'
import noisePng from '../assets/images/noise-texture.png'

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
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
}
</script>

<template>
  <section
    id="the-art"
    aria-labelledby="the-art-subtitle"
    class="relative overflow-hidden bg-section-radial py-16 md:py-24"
  >
    <p
      aria-hidden="true"
      class="pointer-events-none abs-center z-0 select-none whitespace-nowrap font-display text-[100px] leading-none tracking-tight text-display sm:text-[180px] lg:text-[330px]"
    >
      The ART
    </p>

    <div class="relative z-10 mx-auto max-w-[1260px] px-5 lg:px-20">
      <div class="relative mx-auto min-h-0 lg:min-h-[626px] lg:py-8">
        <figure class="relative mx-auto size-[min(100%,626px)]">
          <picture>
            <source :srcset="bartenderWebp" type="image/webp" />
            <img
              :src="bartenderPng"
              alt="Bartender preparing a cocktail seen through a glass"
              width="626"
              height="626"
              decoding="async"
              loading="lazy"
              class="size-full object-cover"
              :style="maskStyle"
            />
          </picture>
        </figure>

        <ul class="absolute left-0 top-1/2 hidden max-w-[220px] -translate-y-1/2 space-y-3.5 lg:block">
          <li v-for="item in leftItems" :key="item" class="flex items-center gap-2.5">
            <img :src="iconCheck" alt="" width="16" height="16" decoding="async" aria-hidden="true" class="size-4 shrink-0" />
            <span class="text-base leading-6 text-muted">{{ item }}</span>
          </li>
        </ul>

        <ul class="absolute right-0 top-1/2 hidden max-w-[220px] -translate-y-1/2 space-y-3.5 lg:block">
          <li v-for="item in rightItems" :key="item" class="flex items-center gap-2.5">
            <img :src="iconCheck" alt="" width="16" height="16" decoding="async" aria-hidden="true" class="size-4 shrink-0" />
            <span class="text-base leading-6 text-muted">{{ item }}</span>
          </li>
        </ul>
      </div>

      <div class="mt-12 grid gap-10 lg:hidden">
        <ul class="space-y-3.5">
          <li v-for="item in leftItems" :key="`mobile-${item}`" class="flex items-center gap-2.5">
            <img :src="iconCheck" alt="" width="16" height="16" decoding="async" aria-hidden="true" class="size-4 shrink-0" />
            <span class="text-base leading-6 text-muted">{{ item }}</span>
          </li>
        </ul>

        <ul class="space-y-3.5">
          <li v-for="item in rightItems" :key="`mobile-${item}`" class="flex items-center gap-2.5">
            <img :src="iconCheck" alt="" width="16" height="16" decoding="async" aria-hidden="true" class="size-4 shrink-0" />
            <span class="text-base leading-6 text-muted">{{ item }}</span>
          </li>
        </ul>
      </div>

      <h2
        id="the-art-subtitle"
        class="mt-12 text-center font-display text-4xl font-normal leading-[0.9] tracking-tight text-foreground sm:text-5xl lg:text-[64px]"
      >
        Sip-Worthy Perfection
      </h2>
    </div>

    <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-30">
      <picture class="block size-full">
        <source :srcset="noiseWebp" type="image/webp" />
        <img
          :src="noisePng"
          alt=""
          width="1440"
          height="927"
          decoding="async"
          loading="lazy"
          class="size-full object-cover"
        />
      </picture>
    </div>
  </section>
</template>
