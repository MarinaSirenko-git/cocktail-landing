<script setup lang="ts">
import bentoBartenderWebp from '../assets/images/bento-bartender-pouring.webp'
import bentoBartenderPng from '../assets/images/bento-bartender-pouring.png'
import bentoGuestsWebp from '../assets/images/bento-guests-drinking.webp'
import bentoGuestsPng from '../assets/images/bento-guests-drinking.png'
import bentoGarnishWebp from '../assets/images/bento-cocktail-garnish.webp'
import bentoGarnishPng from '../assets/images/bento-cocktail-garnish.png'
import bentoRowWebp from '../assets/images/bento-cocktails-row.webp'
import bentoRowPng from '../assets/images/bento-cocktails-row.png'
import bartenderPhotoWebp from '../assets/images/bartender-photo.webp'
import bartenderPhotoPng from '../assets/images/bartender-photo.png'
</script>

<template>
  <section id="philosophy" aria-labelledby="philosophy-title" class="container mx-auto min-h-screen px-5 py-28">
    <div class="mb-16">
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div class="lg:col-span-8">
          <p class="mb-8 inline-flex rounded-pill bg-surface px-4 py-2 text-sm font-medium text-primary-foreground">
            Best Cocktails
          </p>
          <h2 id="philosophy-title" class="font-display text-5xl leading-none md:text-6xl">
            Where every detail matters <span class="text-foreground">-</span><br />
            from muddle to garnish
          </h2>
        </div>

        <div class="flex flex-col justify-between space-y-5 lg:col-span-4">
          <p class="text-lg text-muted">
            Every cocktail we serve is a reflection of our obsession with detail — from the first
            muddle to the final garnish. That care is what turns a simple drink into something truly memorable.
          </p>

          <div>
            <p class="text-xl font-bold text-foreground md:text-3xl"><span class="text-accent text-5xl">4.5</span>/5</p>
            <p class="text-sm text-muted-subtle">More than +12000 customers</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-5 grid grid-cols-1 gap-5 md:grid-cols-12">
      <figure class="relative h-72 overflow-hidden rounded-card md:col-span-3">
        <div aria-hidden="true" class="noisy pointer-events-none absolute inset-0 z-10 opacity-35" />
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

      <figure class="relative h-72 overflow-hidden rounded-card md:col-span-6">
        <div aria-hidden="true" class="noisy pointer-events-none absolute inset-0 z-10 opacity-35" />
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

      <figure class="relative h-72 overflow-hidden rounded-card md:col-span-3">
        <div aria-hidden="true" class="noisy pointer-events-none absolute inset-0 z-10 opacity-35" />
        <picture>
          <source :srcset="bentoGarnishWebp" type="image/webp" />
          <img
            :src="bentoGarnishPng"
            alt="Cocktail with citrus garnish"
            width="317"
            height="317"
            decoding="async"
            loading="lazy"
            class="h-full w-full object-cover"
          />
        </picture>
      </figure>
    </div>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-12">
      <figure class="relative h-72 overflow-hidden rounded-card md:col-span-8">
        <div aria-hidden="true" class="noisy pointer-events-none absolute inset-0 z-10 opacity-35" />
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

      <figure class="relative h-72 overflow-hidden rounded-card md:col-span-4">
        <div aria-hidden="true" class="noisy pointer-events-none absolute inset-0 z-10 opacity-35" />
        <picture>
          <source :srcset="bartenderPhotoWebp" type="image/webp" />
          <img
            :src="bartenderPhotoPng"
            alt="Bartender preparing a cocktail behind the bar"
            width="480"
            height="285"
            decoding="async"
            loading="lazy"
            class="h-full w-full object-cover"
          />
        </picture>
      </figure>
    </div>
  </section>
</template>
