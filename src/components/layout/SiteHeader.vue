<script setup lang="ts">
import { ref } from 'vue'
import logoMark from '../../assets/logos/velvet-pour-mark.png'
import { useHeaderScroll } from '../../composables/useHeaderScroll'
import { useSmoothScroll } from '../../composables/useSmoothScroll'

const navItems = [
  { label: 'Cocktails', href: '#menu' },
  { label: 'About Us', href: '#philosophy' },
  { label: 'The Art', href: '#the-art' },
  { label: 'Contact', href: '#contact' },
]

const headerBackdropRef = ref<HTMLElement | null>(null)
const isMenuOpen = ref(false)

useHeaderScroll(headerBackdropRef)

const { handleNavClick } = useSmoothScroll()

function onNavClick(event: MouseEvent, href: string) {
  handleNavClick(event, href, () => {
    isMenuOpen.value = false
  })
}
</script>

<template>
  <header class="sticky top-0 z-50 relative">
    <div
      ref="headerBackdropRef"
      class="pointer-events-none absolute inset-0 -z-10"
      aria-hidden="true"
    />
    <div class="container relative flex-between py-7">
      <a
        href="/"
        class="flex-center gap-1 font-display text-[30px] leading-10 text-foreground"
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
        <span class="mt-[4px] leading-[25px]">Velvet Pour</span>
      </a>

      <nav aria-label="Main navigation" class="hidden md:block">
        <ul class="flex items-center gap-12 text-base font-medium text-muted">
          <li v-for="item in navItems" :key="item.href">
            <a
              :href="item.href"
              class="transition-opacity hover:opacity-80"
              @click="onNavClick($event, item.href)"
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
        class="flex-center rounded-button border border-border px-4 py-2 text-sm font-medium text-foreground md:hidden"
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
            @click="onNavClick($event, item.href)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
