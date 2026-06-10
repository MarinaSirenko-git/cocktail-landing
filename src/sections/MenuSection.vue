<script setup lang="ts">
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
    class="relative overflow-x-hidden bg-section-radial pt-[120px] pb-[420px]"
  >
    <div class="relative container flex-between">
      <div aria-labelledby="menu-title-left" class="space-y-9">
        <h2
          id="menu-title-left"
          class="text-xl lg:text-[20px] lg:leading-[30px]"
        >
          Most popular cocktails:
        </h2>
        <ul class="space-y-9">
          <li v-for="item in popularCocktails" :key="item.name">
            <article class="grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-4 gap-y-1">
              <h3 class="col-start-1 row-start-1 font-display text-[30px] leading-none text-accent">
                {{ item.name }}
              </h3>
              <p class="col-start-1 row-start-2 text-base leading-6">{{ item.meta }}</p>
              <p class="col-start-2 row-start-1 justify-self-end text-[22px] font-medium leading-6 text-foreground">
                <span aria-hidden="true">—</span>
                {{ item.price }}
              </p>
            </article>
          </li>
        </ul>
      </div>

      <div aria-labelledby="menu-title-right" class="space-y-9">
        <h2
          id="menu-title-right"
          class="text-xl lg:text-[20px] lg:leading-[30px]"
        >
          Most loved mocktails:
        </h2>
        <ul class="space-y-9">
          <li v-for="item in lovedMocktails" :key="item.name">
            <article class="grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-4 gap-y-1">
              <h3 class="col-start-1 row-start-1 font-display text-[30px] leading-none text-accent">
                {{ item.name }}
              </h3>
              <p class="col-start-1 row-start-2 text-base leading-6">{{ item.meta }}</p>
              <p class="col-start-2 row-start-1 justify-self-end text-[22px] font-medium leading-6 text-foreground">
                <span aria-hidden="true">—</span>
                {{ item.price }}
              </p>
            </article>
          </li>
        </ul>
      </div>
    </div>

    <picture class="pointer-events-none absolute -left-15 bottom-0 z-10">
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraPng"
        alt=""
        width="317"
        height="317"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[317px] max-w-none rotate-[42deg] scale-x-[-1]"
      />
    </picture>
    <picture class="pointer-events-none absolute -right-15 bottom-0 z-10">
      <source :srcset="monsteraWebp" type="image/webp" />
      <img
        :src="monsteraPng"
        alt=""
        width="317"
        height="317"
        decoding="async"
        loading="lazy"
        aria-hidden="true"
        class="size-[317px] max-w-none rotate-[-42deg]"
      />
    </picture>

    <div aria-hidden="true" class="noise-overlay" />
  </section>
</template>
