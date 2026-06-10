<script setup lang="ts">
import menuWebp from '../assets/images/menu-cocktail-center.webp'
import menuPng from '../assets/images/menu-cocktail-center.png'
import monsteraWebp from '../assets/images/decorative-monstera-leaf.webp'
import monsteraPng from '../assets/images/decorative-monstera-leaf.png'

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
</script>

<template>
  <section
    id="menu"
    aria-labelledby="menu-title-left"
    class="relative overflo-x-hidden bg-section-radial py-16 md:py-24"
  >
    <div class="relative z-10 mx-auto grid max-w-[1260px] gap-10 px-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-start lg:gap-10 lg:px-20">
      <div aria-labelledby="menu-title-left" class="space-y-9">
        <h2
          id="menu-title-left"
          class="font-display text-xl text-accent lg:text-[20px] lg:leading-[30px]"
        >
          Most popular cocktails:
        </h2>
        <ul class="space-y-9">
          <li v-for="item in popularCocktails" :key="item.name">
            <article class="space-y-1">
              <h3 class="font-display text-2xl leading-none text-foreground lg:text-[36px]">
                {{ item.name }}
              </h3>
              <p class="text-base leading-6 text-muted-subtle">{{ item.meta }}</p>
              <p class="text-[22px] font-medium leading-6 text-foreground">
                <span aria-hidden="true">—</span>
                {{ item.price }}
              </p>
            </article>
          </li>
        </ul>
      </div>

      <figure class="mx-auto w-full max-w-[360px] lg:-mt-4 lg:max-w-[720px] lg:px-4">
        <picture>
          <source :srcset="menuWebp" type="image/webp" />
          <img
            :src="menuPng"
            alt="Cocktail in a martini glass"
            width="720"
            height="643"
            decoding="async"
            loading="lazy"
            class="mx-auto w-full"
          />
        </picture>
      </figure>

      <div aria-labelledby="menu-title-right" class="space-y-9">
        <h2
          id="menu-title-right"
          class="font-display text-xl text-accent lg:text-[20px] lg:leading-[30px]"
        >
          Most loved mocktails:
        </h2>
        <ul class="space-y-9">
          <li v-for="item in lovedMocktails" :key="item.name">
            <article class="space-y-1">
              <h3 class="font-display text-2xl leading-none text-foreground lg:text-[36px]">
                {{ item.name }}
              </h3>
              <p class="text-base leading-6 text-muted-subtle">{{ item.meta }}</p>
              <p class="text-[22px] font-medium leading-6 text-foreground">
                <span aria-hidden="true">—</span>
                {{ item.price }}
              </p>
            </article>
          </li>
        </ul>
      </div>
    </div>

    <picture class="pointer-events-none absolute -left-24 top-10 z-0 hidden opacity-50 lg:block">
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraPng"
        alt=""
        width="448"
        height="448"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[448px] max-w-none"
      />
    </picture>
    <picture class="pointer-events-none absolute -right-24 bottom-10 z-0 hidden opacity-50 lg:block">
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraPng"
        alt=""
        width="448"
        height="448"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[448px] max-w-none"
      />
    </picture>

    <div aria-hidden="true" class="noise-overlay" />
  </section>
</template>
