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
    class="relative overflow-hidden bg-section-radial py-16 md:py-24 lg:min-h-[927px] lg:py-0"
  >
    <p
      aria-hidden="true"
      class="pointer-events-none abs-center z-0 select-none whitespace-nowrap bg-display-text bg-clip-text font-display text-[132px] font-normal leading-none tracking-[-0.02em] text-transparent sm:text-[200px] lg:text-[330px] lg:tracking-[-0.02em]"
    >
      MOJITO
    </p>

    <div class="relative z-10 mx-auto max-w-[1260px] px-5 pb-16 lg:min-h-[927px] lg:px-20 lg:pb-0">
      <figure
        class="relative z-10 mx-auto w-full max-w-[520px] overflow-hidden sm:max-w-[600px] lg:absolute lg:left-1/2 lg:top-[45%] lg:max-w-[687px] lg:-translate-x-1/2 lg:-translate-y-1/2"
      >
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

      <div
        class="relative z-20 mt-10 flex flex-col gap-3 text-center lg:absolute lg:bottom-16 lg:left-0 lg:mt-0 lg:max-w-[420px] lg:text-left"
      >
        <p class="font-display text-[28px] leading-tight text-accent sm:text-[40px] lg:text-[50px] lg:leading-[46px]">
          Cool. Crisp. Classic.
        </p>
        <h1
          id="hero-title"
          class="font-display text-4xl font-normal leading-[0.9] tracking-tight text-foreground sm:text-5xl lg:text-[64px]"
        >
          Sip the Spirit of Summer
        </h1>
      </div>

      <div
        class="relative z-20 mt-6 flex flex-col gap-4 text-center lg:absolute lg:bottom-16 lg:right-0 lg:mt-0 lg:max-w-[420px] lg:text-right"
      >
        <p class="mx-auto max-w-xl text-base leading-7 text-muted lg:mx-0 lg:ml-auto lg:text-lg lg:leading-8">
          Every cocktail on our menu is a blend of premium ingredients, creative flair,
          and timeless recipes — designed to delight your senses.
        </p>
        <div class="flex justify-center lg:justify-end">
          <a
            href="#menu"
            class="inline-flex items-center gap-1 text-base font-semibold text-foreground underline decoration-accent underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            View cocktails
          </a>
        </div>
      </div>
    </div>

    <a
      href="#menu"
      aria-label="Scroll to cocktails menu"
      class="relative z-10 mx-auto mt-10 flex-center size-12 rounded-full border border-border text-sm text-muted transition-colors hover:text-foreground lg:absolute lg:right-10 lg:top-1/2 lg:mx-0 lg:mt-0 lg:-translate-y-1/2"
    >
      <span aria-hidden="true" class="block h-6 w-px bg-border" />
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
