<script setup lang="ts">
import monsteraWebp from '../assets/images/decorative-monstera-leaf.webp'
import { onMounted, onUnmounted, ref } from 'vue'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'

type MenuItem = {
  name: string
  meta: string
  price: string
}

const popularCocktails: MenuItem[] = [
  { name: 'Chapel Hill Shiraz', meta: 'AU | Battle', price: '$10' },
  { name: 'Caten Malbee', meta: 'AU | Battle', price: '$49' },
  { name: 'Rhino Pale Ale', meta: 'CA | 750 ml', price: '$20' },
  { name: 'Irish Guinness', meta: 'IE | 600 ml', price: '$29' },
]

const lovedMocktails: MenuItem[] = [
  { name: 'Tropical Bloom', meta: 'US | Battle', price: '$10' },
  { name: 'Passionfruit Mint', meta: 'US | Battle', price: '$49' },
  { name: 'Citrus Glow', meta: 'CA | 750 ml', price: '$20' },
  { name: 'Lavender Fizz', meta: 'IE | 600 ml', price: '$29' },
]

// create reactive container with .value field where Vue will add real DOM element value
// type null is important because element exists only after mount
const sectionRef = ref<HTMLElement | null>(null)

type MenuGsapBundle = {
  gsap: typeof import('gsap').default
}

let menuGsapBundle: MenuGsapBundle | null = null
let menuGsapBundlePromise: Promise<MenuGsapBundle> | null = null

async function loadMenuGsapBundle() {
  if (menuGsapBundle) return menuGsapBundle

  if (!menuGsapBundlePromise) {
    menuGsapBundlePromise = (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      gsap.registerPlugin(ScrollTrigger)
      return { gsap }
    })()
  }

  menuGsapBundle = await menuGsapBundlePromise
  return menuGsapBundle
}

const prefersReducedMotion = usePrefersReducedMotion()

// create variable to store the animation context
let ctx: { revert: () => void } | undefined

onMounted(async () => {
  // add check if  user has reduced motion
  if (!sectionRef.value || prefersReducedMotion.value) return

  const { gsap } = await loadMenuGsapBundle()
  const mountedSection = sectionRef.value

  ctx = gsap.context(function (this: gsap.Context) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: mountedSection,
        start: 'top 30%',
        end: 'bottom 80%',
        scrub: true,
      },
    })

    timeline
      .from('#menu-left-leaf', {
        x: -100,
        y: 100,
      })
      .from('#menu-right-leaf', {
        x: 100,
        y: 100,
      })
  }, mountedSection)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    ref="sectionRef"
    id="menu"
    aria-labelledby="menu-title-left"
    class="flex flex-col justify-center noisy relative z-20 min-h-[calc(100dvh-var(--header-height,0px))] w-full overflow-hidden"
  >
    <div
      class="container relative z-10 mx-auto flex flex-col items-start justify-between gap-20 lg:px-5 pt-40 md:flex-row 2xl:px-0"
    >
      <div aria-labelledby="menu-title-left" class="w-full space-y-8 md:w-fit">
        <h2 id="menu-title-left" class="text-xl font-medium">Most popular cocktails:</h2>
        <ul class="space-y-8">
          <li
            v-for="item in popularCocktails"
            :key="item.name"
            class="flex items-start justify-between"
          >
            <div class="md:me-28">
              <h3 class="font-display text-[30px] text-accent leading-none text-nowrap">
                {{ item.name }}
              </h3>
              <p class="text-sm">{{ item.meta }}</p>
            </div>
            <span class="text-xl font-medium text-nowrap">- {{ item.price }}</span>
          </li>
        </ul>
      </div>

      <div aria-labelledby="menu-title-right" class="w-full space-y-8 pb-20 md:w-fit md:pb-0">
        <h2 id="menu-title-right" class="text-xl font-medium">Most loved mocktails:</h2>
        <ul class="space-y-5 lg:space-y-8">
          <li
            v-for="item in lovedMocktails"
            :key="item.name"
            class="flex items-start justify-between flex-nowrap"
          >
            <div class="me-28">
              <h3 class="font-display text-[30px] text-accent leading-none">
                {{ item.name }}
              </h3>
              <p class="text-sm">{{ item.meta }}</p>
            </div>
            <span class="text-xl font-medium text-nowrap">- {{ item.price }}</span>
          </li>
        </ul>
      </div>
    </div>

    <picture
      id="menu-left-leaf"
      class="pointer-events-none absolute -left-20 -bottom-20 w-1/3 md:top-auto md:w-fit hidden lg:block"
    >
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraWebp"
        alt=""
        width="317"
        height="317"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[317px] max-w-none rotate-[42deg] scale-x-[-1]"
      />
    </picture>
    <picture
      id="menu-right-leaf"
      class="pointer-events-none absolute -right-20 -bottom-20 w-1/3 md:top-auto md:w-fit hidden lg:block"
    >
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraWebp"
        alt=""
        width="317"
        height="317"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[317px] max-w-none rotate-[-42deg]"
      />
    </picture>
  </section>
</template>
