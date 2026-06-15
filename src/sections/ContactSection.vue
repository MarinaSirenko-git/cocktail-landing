<script setup lang="ts">
import iconInstagram from '../assets/icons/icon-social-instagram.svg'
import iconX from '../assets/icons/icon-social-x.svg'
import iconFacebook from '../assets/icons/icon-social-facebook.svg'
import footerCocktailsWebp from '../assets/images/footer-cocktail-assortment.webp'
import footerCocktailsPng from '../assets/images/footer-cocktail-assortment.png'
import monsteraWebp from '../assets/images/decorative-monstera-leaf.webp'
import monsteraPng from '../assets/images/decorative-monstera-leaf.png'

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
    class="relative overflow-hidden bg-section-radial py-16 md:py-24 lg:pb-20"
  >
    <div class="relative z-10 mx-auto max-w-[1260px] px-5 lg:min-h-[640px]">
      <div class="mx-auto w-full max-w-[760px] text-center">
        <h2
          id="contact-title"
          class="font-display text-4xl font-normal leading-[0.9] tracking-tight text-foreground sm:text-5xl lg:text-[64px]"
        >
          Where to Find Us
        </h2>

        <div class="mt-10 space-y-8 lg:space-y-10">
          <div class="space-y-3">
            <h3 class="text-lg uppercase tracking-wide text-muted-subtle">Visit our store</h3>
            <address
              class="text-[clamp(1.25rem,1.14rem+0.49vw,1.563rem)] leading-tight text-foreground not-italic"
            >
              Baba Nest, Sri Panwa, 88 Sakdidej Rd, Wichit, Phuket 83000
            </address>
          </div>

          <div class="space-y-2">
            <h3 class="text-lg uppercase tracking-wide text-muted-subtle">Contact us</h3>
            <p>
              <a
                href="tel:+15559876543"
                class="text-[clamp(1.25rem,1.14rem+0.49vw,1.563rem)] text-foreground transition-colors hover:text-muted"
              >
                (555) 987-6543
              </a>
            </p>
            <p>
              <a
                href="mailto:hello@jsmcocktail.com"
                class="text-[clamp(1.25rem,1.14rem+0.49vw,1.563rem)] text-foreground transition-colors hover:text-muted"
              >
                hello@jsmcocktail.com
              </a>
            </p>
          </div>

          <div class="space-y-2">
            <h3 class="text-lg uppercase tracking-wide text-muted-subtle">Open every day</h3>
            <p
              v-for="line in hours"
              :key="line"
              class="text-[clamp(1.25rem,1.14rem+0.49vw,1.563rem)] leading-tight text-foreground"
            >
              {{ line }}
            </p>
          </div>

          <nav aria-label="Social media" class="space-y-3">
            <h3 class="text-lg uppercase tracking-wide text-muted-subtle">Socials</h3>
            <ul class="flex items-center justify-center gap-4">
              <li v-for="link in socialLinks" :key="link.label">
                <a
                  :href="link.href"
                  :aria-label="link.label"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="transition-opacity hover:opacity-80"
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

      <figure
        class="pointer-events-none relative mx-auto mt-14 w-full max-w-[526px] lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:mx-0 lg:w-[min(54vw,640px)] lg:max-w-none"
      >
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
            class="mx-auto w-full lg:mx-0"
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

    <div aria-hidden="true" class="noise-overlay" />
  </section>
</template>
