<script setup lang="ts">
import iconStar from '../assets/icons/icon-star.svg'
import iconCheck from '../assets/icons/icon-check.svg'
import bentoBartenderWebp from '../assets/images/bento-bartender-pouring.webp'
import bentoBartenderPng from '../assets/images/bento-bartender-pouring.png'
import bentoGuestsWebp from '../assets/images/bento-guests-drinking.webp'
import bentoGuestsPng from '../assets/images/bento-guests-drinking.png'
import bentoGarnishWebp from '../assets/images/bento-cocktail-garnish.webp'
import bentoGarnishPng from '../assets/images/bento-cocktail-garnish.png'
import bentoRowWebp from '../assets/images/bento-cocktails-row.webp'
import bentoRowPng from '../assets/images/bento-cocktails-row.png'
import avatar1Webp from '../assets/images/avatar-customer-1.webp'
import avatar1Png from '../assets/images/avatar-customer-1.png'
import avatar2Webp from '../assets/images/avatar-customer-2.webp'
import avatar2Png from '../assets/images/avatar-customer-2.png'
import avatar3Webp from '../assets/images/avatar-customer-3.webp'
import avatar3Png from '../assets/images/avatar-customer-3.png'
import noiseWebp from '../assets/images/noise-texture.webp'
import noisePng from '../assets/images/noise-texture.png'

const checklistItems = [
  'Perfectly balanced blends',
  'Garnished to perfection',
  'Ice-cold every time',
  'Expertly shaken & stirred',
]
</script>

<template>
  <section
    id="philosophy"
    aria-labelledby="philosophy-title"
    class="relative overflow-hidden bg-section-radial py-16 md:py-24"
  >
    <div class="relative z-10 mx-auto max-w-[1260px] px-5 lg:px-20">
      <span class="inline-flex rounded-pill bg-surface px-5 py-2.5 text-sm font-medium text-primary-foreground">
        Best Cocktails
      </span>

      <header class="mx-auto mt-8 max-w-3xl text-center">
        <h2
          id="philosophy-title"
          class="font-display text-4xl font-normal leading-[0.9] tracking-tight text-foreground sm:text-5xl lg:text-[64px]"
        >
          Where every detail matters—from muddle to garnish
        </h2>
        <p class="mt-6 text-base leading-7 text-muted sm:text-lg lg:leading-8">
          Every cocktail we serve is a reflection of our obsession with detail — from the
          first muddle to the final garnish. That care is what turns a simple drink into
          something truly memorable.
        </p>
      </header>

      <div
        role="group"
        aria-label="4.5 out of 5 stars from more than 12,000 customers"
        class="mx-auto mt-10 flex max-w-lg flex-col items-center gap-4 text-center"
      >
        <div class="flex flex-wrap items-center justify-center gap-4">
          <div class="flex flex-col items-center gap-2">
            <div class="flex items-center gap-1" aria-hidden="true">
              <img
                v-for="n in 5"
                :key="n"
                :src="iconStar"
                alt=""
                width="16"
                height="16"
                decoding="async"
                aria-hidden="true"
                class="size-4"
              />
            </div>
            <p class="text-2xl font-bold text-foreground">4.5/5</p>
          </div>

          <div class="flex items-center gap-2 rounded-pill border border-border bg-surface-dark px-3 py-2">
            <picture>
              <source :srcset="avatar1Webp" type="image/webp" />
              <img :src="avatar1Png" alt="" width="44" height="44" decoding="async" loading="lazy" class="size-11 rounded-full" />
            </picture>
            <picture>
              <source :srcset="avatar2Webp" type="image/webp" />
              <img :src="avatar2Png" alt="" width="44" height="44" decoding="async" loading="lazy" class="-ml-3 size-11 rounded-full border-2 border-background" />
            </picture>
            <picture>
              <source :srcset="avatar3Webp" type="image/webp" />
              <img :src="avatar3Png" alt="" width="44" height="44" decoding="async" loading="lazy" class="-ml-3 size-11 rounded-full border-2 border-background" />
            </picture>
            <p class="ml-2 rounded-pill bg-accent-badge px-3 py-1 text-sm font-medium text-primary-foreground">
              +12k
            </p>
          </div>
        </div>
        <p class="text-base text-muted-subtle">More than +12000 customers</p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12">
        <figure class="overflow-hidden rounded-card md:col-span-4">
          <picture>
            <source :srcset="bentoBartenderWebp" type="image/webp" />
            <img
              :src="bentoBartenderPng"
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
          class="flex flex-col justify-center rounded-card bg-card-gradient p-8 md:col-span-4"
        >
          <h3 id="philosophy-feature-title" class="font-display text-2xl text-foreground lg:text-3xl">
            Crafted to Impress
          </h3>
          <ul class="mt-6 space-y-3.5">
            <li v-for="item in checklistItems" :key="item" class="flex items-center gap-2.5">
              <img :src="iconCheck" alt="" width="16" height="16" decoding="async" aria-hidden="true" class="size-4 shrink-0" />
              <span class="text-base leading-6 text-muted">{{ item }}</span>
            </li>
          </ul>
        </article>

        <figure class="overflow-hidden rounded-card md:col-span-8">
          <picture>
            <source :srcset="bentoGuestsWebp" type="image/webp" />
            <img
              :src="bentoGuestsPng"
              alt="Guests enjoying cocktails at the bar"
              width="580"
              height="285"
              decoding="async"
              loading="lazy"
              class="h-full w-full object-cover"
            />
          </picture>
        </figure>

        <figure class="overflow-hidden rounded-card md:col-span-7">
          <picture>
            <source :srcset="bentoRowWebp" type="image/webp" />
            <img
              :src="bentoRowPng"
              alt="Assorted colorful cocktails in a row"
              width="780"
              height="285"
              decoding="async"
              loading="lazy"
              class="h-full w-full object-cover"
            />
          </picture>
        </figure>

        <figure class="overflow-hidden rounded-card md:col-span-5">
          <picture>
            <source :srcset="bentoGarnishWebp" type="image/webp" />
            <img
              :src="bentoGarnishPng"
              alt="Cocktail with citrus garnish"
              width="480"
              height="285"
              decoding="async"
              loading="lazy"
              class="h-full w-full object-cover"
            />
          </picture>
        </figure>
      </div>
    </div>

    <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-30">
      <picture class="block size-full">
        <source :srcset="noiseWebp" type="image/webp" />
        <img
          :src="noisePng"
          alt=""
          width="1440"
          height="1065"
          decoding="async"
          loading="lazy"
          class="size-full object-cover"
        />
      </picture>
    </div>
  </section>
</template>
