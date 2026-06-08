<script setup lang="ts">
import iconArrow from '../assets/icons/icon-arrow-right.svg'
import drinkWebp from '../assets/images/carousel-drink-raspberry-mojito.webp'
import drinkPng from '../assets/images/carousel-drink-raspberry-mojito.png'
import monsteraWebp from '../assets/images/decorative-monstera-leaf.webp'
import monsteraPng from '../assets/images/decorative-monstera-leaf.png'
import noiseWebp from '../assets/images/noise-texture.webp'
import noisePng from '../assets/images/noise-texture.png'

const tabs = [
  'Classic Mojito',
  'Raspberry Mojito',
  'Violet Breeze',
  'Tipsy Tales',
]

const activeTabIndex = 1
</script>

<template>
  <section
    id="carousel"
    aria-labelledby="carousel-recipe-title"
    class="relative overflow-hidden bg-section-radial py-16 md:py-24"
  >
    <!-- TODO: Implement tab panel switching and GSAP transitions -->
    <div class="relative z-10 mx-auto max-w-[1260px] px-5 lg:px-20">
      <div
        role="tablist"
        aria-label="Featured cocktails"
        class="flex flex-wrap justify-center gap-x-8 gap-y-2 border-b border-border"
      >
        <button
          v-for="(tab, index) in tabs"
          :key="tab"
          type="button"
          role="tab"
          :aria-selected="index === activeTabIndex"
          :tabindex="index === activeTabIndex ? 0 : -1"
          :id="`carousel-tab-${index}`"
          :aria-controls="`carousel-panel-${index}`"
          class="border-b-2 px-1 pb-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          :class="index === activeTabIndex ? 'border-accent text-foreground' : 'border-transparent text-muted hover:text-foreground'"
        >
          {{ tab }}
        </button>
      </div>

      <div class="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
        <button
          type="button"
          class="hidden items-center justify-end gap-4 text-left text-muted transition-colors hover:text-foreground lg:flex"
        >
          <span class="font-display text-xl text-foreground">Classic Mojito</span>
          <span aria-hidden="true" class="h-px w-16 bg-border" />
          <img :src="iconArrow" alt="" width="38" height="38" decoding="async" aria-hidden="true" class="size-[38px] shrink-0 rotate-180" />
        </button>

        <figure class="mx-auto w-full max-w-[401px]">
          <picture>
            <source :srcset="drinkWebp" type="image/webp" />
            <img
              :src="drinkPng"
              alt="Raspberry mojito in a tall glass"
              width="401"
              height="268"
              decoding="async"
              loading="lazy"
              class="mx-auto w-full"
            />
          </picture>
        </figure>

        <button
          type="button"
          class="hidden items-center gap-4 text-muted transition-colors hover:text-foreground lg:flex"
        >
          <img :src="iconArrow" alt="" width="38" height="38" decoding="async" aria-hidden="true" class="size-[38px] shrink-0" />
          <span aria-hidden="true" class="h-px w-16 bg-border" />
          <span class="font-display text-xl text-foreground">Violet Breeze</span>
        </button>
      </div>

      <div
        v-for="(tab, index) in tabs"
        :key="`panel-${tab}`"
        role="tabpanel"
        :id="`carousel-panel-${index}`"
        :aria-labelledby="`carousel-tab-${index}`"
        :hidden="index !== activeTabIndex"
        class="mx-auto mt-12 max-w-2xl text-center"
      >
        <template v-if="index === activeTabIndex">
          <p class="text-sm uppercase tracking-wide text-muted-subtle">Recipes for:</p>
          <h2 id="carousel-recipe-title" class="mt-2 font-display text-4xl text-accent lg:text-5xl">
            Raspberry Mojito
          </h2>
          <h3 class="mt-4 font-display text-2xl text-foreground lg:text-3xl">
            A Zesty Classic That Never Fails
          </h3>
          <p class="mt-4 text-base leading-7 text-muted sm:text-lg">
            The Margarita is a classic that balances tangy lime, smooth tequila, and a touch
            of sweetness. Shaken, frozen, or on the rocks—it’s always crisp &amp; refreshing.
          </p>
        </template>
        <p v-else class="sr-only">{{ tab }} recipe details are not available yet.</p>
      </div>
    </div>

    <picture class="pointer-events-none absolute -left-20 top-10 z-0 hidden opacity-50 lg:block">
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraPng"
        alt=""
        width="587"
        height="587"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[587px] max-w-none"
      />
    </picture>
    <picture class="pointer-events-none absolute -right-20 bottom-10 z-0 hidden opacity-50 lg:block">
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraPng"
        alt=""
        width="587"
        height="587"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[587px] max-w-none"
      />
    </picture>

    <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-30">
      <picture class="block size-full">
        <source :srcset="noiseWebp" type="image/webp" />
        <img
          :src="noisePng"
          alt=""
          width="1440"
          height="837"
          decoding="async"
          loading="lazy"
          class="size-full object-cover"
        />
      </picture>
    </div>
  </section>
</template>
