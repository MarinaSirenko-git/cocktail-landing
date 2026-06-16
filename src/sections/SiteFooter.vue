<script setup lang="ts">
import iconInstagram from '../assets/icons/icon-social-instagram.svg'
import iconX from '../assets/icons/icon-social-x.svg'
import iconFacebook from '../assets/icons/icon-social-facebook.svg'
import footerCocktailsWebp from '../assets/images/footer-cocktail-assortment.webp'
import monsteraWebp from '../assets/images/decorative-monstera-leaf.webp'
import { onMounted, onUnmounted, ref } from 'vue'

import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'

// register GSAP plugin
gsap.registerPlugin(SplitText, ScrollTrigger)

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: iconInstagram },
  { label: 'X', href: 'https://x.com', icon: iconX },
  { label: 'Facebook', href: 'https://facebook.com', icon: iconFacebook },
]

const hours = ['Mon-Thu : 5:00pm - 12:00am', 'Fri-Sat : 5:00pm - 1:00am', 'Sun : 5:00pm - 12:00am']

const prefersReducedMotion = usePrefersReducedMotion()

// create reactive container with .value field where Vue will add real DOM element value
// type null is important because element exists only after mount
const sectionRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | undefined

onMounted(() => {
  if (!sectionRef.value || prefersReducedMotion.value) return
  ctx = gsap.context(function (this: gsap.Context) {
    const title = new SplitText('#contact-title', { type: 'words', aria: 'auto' })
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact-title',
        start: 'top 90%',
      },
      ease: 'power1.inOut',
    })

    timeline
      .fromTo(
        title.words,
        {
          opacity: 0,
          yPercent: 100,
        },
        {
          opacity: 1,
          yPercent: 0,
          stagger: 0.02,
          duration: 0.6,
        },
      )
      .fromTo(
        '#contact h3, #contact address, #contact a, #contact p',
        {
          opacity: 0,
          yPercent: 100,
        },
        {
          opacity: 1,
          yPercent: 0,
          stagger: 0.02,
          duration: 0.6,
        },
      )
      .to('#footer-leaf-l', { y: '-50', duration: 1, ease: 'power1.inOut' })
      .to('#footer-leaf-r', { y: '50', duration: 1, ease: 'power1.inOut' })

    return () => {
      title.revert()
    }
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <footer
    id="contact"
    ref="sectionRef"
    aria-labelledby="contact-title"
    class="flex flex-col justify-center relative overflow-hidden bg-section-radial min-h-[calc(100dvh-var(--header-height,0px))] pt-16 pb-[150px] md:py-24 lg:pb-20"
  >
    <div>
      <div class="relative container z-10 lg:min-h-[640px]">
        <div class="mx-auto w-full max-w-[760px] text-center">
          <h2
            id="contact-title"
            class="font-display text-[clamp(3rem,1.85rem+5vw,5.625rem)] font-normal leading-[0.9] tracking-tight text-foreground"
          >
            Where to Find Us
          </h2>

          <div class="mt-10 space-y-8 lg:space-y-10">
            <div class="space-y-3">
              <h3 class="text-md uppercase tracking-wide">Visit our bar</h3>
              <address
                class="text-[clamp(1.25rem,1.14rem+0.49vw,1.563rem)] leading-tight text-foreground not-italic"
              >
                Baba Nest, Sri Panwa, 88 Sakdidej Rd, Wichit, Phuket 83000
              </address>
            </div>

            <div class="space-y-2">
              <h3 class="text-md uppercase tracking-wide">Contact us</h3>
              <p>
                <a
                  href="tel:+15559876543"
                  class="text-[clamp(1.25rem,1.14rem+0.49vw,1.563rem)] text-foreground transition-colors hover:text-muted"
                >
                  +66 098 014 6914
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
              <h3 class="text-md uppercase tracking-wide">Open every day</h3>
              <p
                v-for="line in hours"
                :key="line"
                class="text-[clamp(1.25rem,1.14rem+0.49vw,1.563rem)] leading-tight text-foreground"
              >
                {{ line }}
              </p>
            </div>

            <nav aria-label="Social media" class="space-y-3">
              <h3 class="text-md tracking-wide">Socials</h3>
              <ul class="flex items-center justify-center gap-4">
                <li v-for="link in socialLinks" :key="link.label">
                  <a
                    :href="link.href"
                    :aria-label="link.label"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="transition-opacity"
                  >
                    <img
                      :src="link.icon"
                      alt=""
                      width="30"
                      height="30"
                      decoding="async"
                      aria-hidden="true"
                      class="size-[30px] object-contain hover:opacity-80"
                    />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <figure
          class="pointer-events-none mx-auto mt-14 w-full max-w-[526px] absolute right-[-100px] bottom-[-259px] lg:bottom-[-160px] lg:right-[-180px] lg:mt-0 lg:mx-0 lg:w-[min(54vw,526px)] lg:max-w-none"
        >
          <picture>
            <source :srcset="footerCocktailsWebp" type="image/webp" />
            <img
              :src="footerCocktailsWebp"
              alt=""
              width="526"
              height="544"
              decoding="async"
              loading="lazy"
              aria-hidden="true"
              class="mx-auto w-[279px] lg:w-full lg:mx-0"
            />
          </picture>
        </figure>
      </div>

      <picture
        id="footer-leaf-l"
        class="pointer-events-none absolute -left-24 bottom-[-70px] z-0 lg:block rotate-[25deg] scale-x-[-1]"
      >
        <source :srcset="monsteraWebp" type="image/webp" />
        <img
          :src="monsteraWebp"
          alt=""
          width="398"
          height="398"
          decoding="async"
          loading="lazy"
          aria-hidden="true"
          class="size-[249px] lg:size-[398px] max-w-none"
        />
      </picture>
      <picture
        id="footer-leaf-r"
        class="pointer-events-none absolute -right-16 top-[-50px] z-0 hidden lg:block rotate-[25deg] scale-y-[-1]"
      >
        <source :srcset="monsteraWebp" type="image/webp" />
        <img
          :src="monsteraWebp"
          alt=""
          width="328"
          height="328"
          decoding="async"
          loading="lazy"
          aria-hidden="true"
          class="size-[328px] max-w-none"
        />
      </picture>
    </div>
  </footer>
</template>
