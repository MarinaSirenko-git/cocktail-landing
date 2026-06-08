<script setup lang="ts">
import { ref } from 'vue'
import logoMark from '../../assets/logos/velvet-pour-mark.png'

const navItems = [
  { label: 'Cocktails', href: '#menu' },
  { label: 'About Us', href: '#philosophy' },
  { label: 'The Art', href: '#the-art' },
  { label: 'Contact', href: '#contact' },
]

const isMenuOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-[20px]">
    <div class="mx-auto flex max-w-[1260px] items-center justify-between px-5 py-6 lg:px-[90px] lg:py-7">
      <a
        href="/"
        class="flex items-center gap-1 font-display text-[30px] leading-10 text-foreground"
      >
        <img
          :src="logoMark"
          alt=""
          width="32"
          height="32"
          decoding="async"
          class="size-8"
          aria-hidden="true"
        />
        <span>Velvet Pour</span>
      </a>

      <nav aria-label="Main navigation" class="hidden md:block">
        <ul class="flex items-center gap-12 text-base font-medium text-muted">
          <li v-for="item in navItems" :key="item.href">
            <a
              :href="item.href"
              class="transition-opacity hover:opacity-80"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        class="inline-flex items-center justify-center rounded-button border border-border px-4 py-2 text-sm font-medium text-foreground md:hidden"
        @click="isMenuOpen = !isMenuOpen"
      >
        {{ isMenuOpen ? 'Close' : 'Menu' }}
      </button>
    </div>

    <nav
      id="mobile-menu"
      aria-label="Mobile navigation"
      :hidden="!isMenuOpen"
      class="border-t border-border px-5 py-4 md:hidden"
    >
      <ul class="flex flex-col gap-4 text-base font-medium text-muted">
        <li v-for="item in navItems" :key="item.href">
          <a
            :href="item.href"
            class="block transition-opacity hover:opacity-80"
            @click="isMenuOpen = false"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
