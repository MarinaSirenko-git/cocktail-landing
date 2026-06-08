<script setup lang="ts">
import iconInstagram from '../assets/icons/icon-social-instagram.svg'
import iconX from '../assets/icons/icon-social-x.svg'
import iconFacebook from '../assets/icons/icon-social-facebook.svg'
import footerCocktailsWebp from '../assets/images/footer-cocktail-assortment.webp'
import footerCocktailsPng from '../assets/images/footer-cocktail-assortment.png'
import monsteraWebp from '../assets/images/decorative-monstera-leaf.webp'
import monsteraPng from '../assets/images/decorative-monstera-leaf.png'
import noiseWebp from '../assets/images/noise-texture.webp'
import noisePng from '../assets/images/noise-texture.png'

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: iconInstagram },
  { label: 'X', href: 'https://x.com', icon: iconX },
  { label: 'Facebook', href: 'https://facebook.com', icon: iconFacebook },
]

const hours = [
  'Mon-Thu : 11:00am - 12am',
  'Fri : 11:00am - 2am',
  'Sat : 9:00am - 2am',
  'Sun : 9:00am - 1 am',
]
</script>

<template>
  <section
    id="contact"
    aria-labelledby="contact-title"
    class="relative overflow-hidden bg-section-radial py-16 md:py-24"
  >
    <div class="relative z-10 mx-auto grid max-w-[1260px] gap-12 px-5 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-20">
      <div>
        <h2
          id="contact-title"
          class="font-display text-4xl font-normal leading-[0.9] tracking-tight text-foreground sm:text-5xl lg:text-[64px]"
        >
          Where to Find Us
        </h2>

        <div class="mt-10 grid gap-8 sm:grid-cols-2">
          <div class="space-y-2">
            <h3 class="font-display text-xl text-accent">Visit our store</h3>
            <address class="text-base leading-7 text-muted not-italic">
              456, Raq Blvd. #404, Los Angeles, CA 90210
            </address>
          </div>

          <div class="space-y-2">
            <h3 class="font-display text-xl text-accent">Contact us</h3>
            <p>
              <a href="tel:+15559876543" class="text-base text-muted transition-colors hover:text-foreground">
                (555) 987-6543
              </a>
            </p>
            <p>
              <a href="mailto:hello@jsmcocktail.com" class="text-base text-muted transition-colors hover:text-foreground">
                hello@jsmcocktail.com
              </a>
            </p>
          </div>

          <div class="space-y-2">
            <h3 class="font-display text-xl text-accent">Open every day</h3>
            <p v-for="line in hours" :key="line" class="text-base leading-7 text-muted">
              {{ line }}
            </p>
          </div>

          <nav aria-label="Social media" class="space-y-3">
            <h3 class="font-display text-xl text-accent">Socials</h3>
            <ul class="flex items-center gap-4">
              <li v-for="link in socialLinks" :key="link.label">
                <a
                  :href="link.href"
                  :aria-label="link.label"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex size-10 items-center justify-center rounded-full border border-border transition-opacity hover:opacity-80"
                >
                  <img
                    :src="link.icon"
                    alt=""
                    width="30"
                    height="30"
                    decoding="async"
                    aria-hidden="true"
                    class="size-[30px]"
                  />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <figure class="mx-auto w-full max-w-[526px]">
        <picture>
          <source :srcset="footerCocktailsWebp" type="image/webp" />
          <img
            :src="footerCocktailsPng"
            alt=""
            width="526"
            height="544"
            decoding="async"
            loading="lazy"
            aria-hidden="true"
            class="mx-auto w-full"
          />
        </picture>
      </figure>
    </div>

    <picture class="pointer-events-none absolute -left-24 bottom-0 z-0 hidden opacity-50 lg:block">
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraPng"
        alt=""
        width="537"
        height="537"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[537px] max-w-none"
      />
    </picture>
    <picture class="pointer-events-none absolute -right-16 top-10 z-0 hidden opacity-50 lg:block">
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraPng"
        alt=""
        width="421"
        height="421"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[421px] max-w-none"
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
