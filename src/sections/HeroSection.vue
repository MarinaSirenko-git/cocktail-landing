<script setup lang="ts">
import heroWebp from '../assets/images/hero-cocktail-mojito.webp'
import heroPng from '../assets/images/hero-cocktail-mojito.png'
import monsteraWebp from '../assets/images/decorative-monstera-leaf.webp'
import monsteraPng from '../assets/images/decorative-monstera-leaf.png'
import noiseWebp from '../assets/images/noise-texture.webp'
import noisePng from '../assets/images/noise-texture.png'
</script>

<template>
  <section
    id="hero"
    aria-labelledby="hero-title"
    class="relative overflow-hidden bg-section-radial py-16 md:py-24 lg:min-h-[927px] lg:py-28"
  >
    <p
      aria-hidden="true"
      class="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap bg-display-text bg-clip-text font-display text-[132px] font-normal leading-none tracking-[-0.02em] text-transparent sm:text-[200px] lg:text-[330px] lg:tracking-[-0.02em]"
    >
      MOJITO
    </p>

    <div class="relative z-10 mx-auto grid max-w-[1260px] items-center gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-20">
      <div class="flex flex-col gap-3 text-center lg:text-left">
        <p class="font-display text-[28px] leading-tight text-accent sm:text-[40px] lg:text-[50px] lg:leading-[46px]">
          Cool. Crisp. Classic.
        </p>
        <h1
          id="hero-title"
          class="font-display text-4xl font-normal leading-[0.9] tracking-tight text-foreground sm:text-5xl lg:text-[64px]"
        >
          Sip the Spirit of Summer
        </h1>
        <p class="mx-auto max-w-xl text-base leading-7 text-muted lg:mx-0 lg:text-lg lg:leading-8">
          Every cocktail on our menu is a blend of premium ingredients, creative flair,
          and timeless recipes — designed to delight your senses.
        </p>
        <div class="mt-4 flex justify-center lg:justify-start">
          <a
            href="#menu"
            class="inline-flex items-center justify-center rounded-button bg-surface px-8 py-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            View cocktails
          </a>
        </div>
      </div>

      <figure class="relative mx-auto w-full max-w-[687px] overflow-hidden">
        <picture>
          <source :srcset="heroWebp" type="image/webp" />
          <img
            :src="heroPng"
            alt="Mojito cocktail in a martini glass with lime garnish"
            width="687"
            height="384"
            decoding="async"
            fetchpriority="high"
            class="mx-auto w-full mix-blend-lighten"
          />
        </picture>
      </figure>
    </div>

    <a
      href="#menu"
      aria-label="Scroll to cocktails menu"
      class="relative z-10 mx-auto mt-10 flex size-12 items-center justify-center rounded-full border border-border text-sm text-muted transition-colors hover:text-foreground lg:absolute lg:bottom-10 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2"
    >
      <span aria-hidden="true">↓</span>
    </a>

    <picture class="pointer-events-none absolute -left-20 top-20 z-0 hidden opacity-60 lg:block">
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraPng"
        alt=""
        width="477"
        height="477"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[477px] max-w-none"
      />
    </picture>
    <picture class="pointer-events-none absolute -right-16 bottom-0 z-0 hidden opacity-60 lg:block">
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraPng"
        alt=""
        width="461"
        height="461"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[461px] max-w-none"
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
