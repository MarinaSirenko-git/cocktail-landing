<script setup lang="ts">
import bartenderWebp from '../assets/images/bartender-photo.webp'
import bartenderPng from '../assets/images/bartender-photo.png'
import aperolWebp from '../assets/images/floating-cocktail-aperol.webp'
import aperolPng from '../assets/images/floating-cocktail-aperol.png'
import martiniWebp from '../assets/images/floating-cocktail-martini.webp'
import martiniPng from '../assets/images/floating-cocktail-martini.png'
import noiseWebp from '../assets/images/noise-texture.webp'
import noisePng from '../assets/images/noise-texture.png'
</script>

<template>
  <section
    id="showcase"
    aria-labelledby="showcase-title"
    class="relative overflow-hidden bg-section-radial py-16 md:py-24"
  >
    <div class="relative z-10 mx-auto max-w-[1260px] px-5 lg:px-20">
      <figure class="relative mx-auto max-w-[968px] overflow-hidden rounded-card">
        <picture>
          <source :srcset="bartenderWebp" type="image/webp" />
          <img
            :src="bartenderPng"
            alt="Bartender focused on pouring a cocktail"
            width="968"
            height="661"
            decoding="async"
            loading="lazy"
            class="w-full object-cover"
          />
        </picture>
      </figure>

      <div class="mx-auto mt-10 max-w-2xl text-center">
        <h2
          id="showcase-title"
          class="font-display text-4xl font-normal leading-[0.9] tracking-tight text-foreground sm:text-5xl lg:text-[64px]"
        >
          Made with Craft, Poured with Passion
        </h2>
        <p class="mt-6 text-base leading-7 text-muted sm:text-lg lg:leading-8">
          This isn’t just a drink. It’s a carefully crafted moment made just for you.
        </p>
      </div>
    </div>

    <picture class="pointer-events-none absolute left-8 top-1/4 z-0 hidden opacity-80 lg:block">
      <source :srcset="aperolWebp" type="image/webp" />
      <img
        :src="aperolPng"
        alt=""
        width="262"
        height="278"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[262px] max-w-none"
      />
    </picture>
    <picture class="pointer-events-none absolute right-8 bottom-1/4 z-0 hidden opacity-80 lg:block">
      <source :srcset="martiniWebp" type="image/webp" />
      <img
        :src="martiniPng"
        alt=""
        width="238"
        height="250"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[238px] max-w-none"
      />
    </picture>

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
