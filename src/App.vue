<script setup lang="ts">
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import SiteHeader from './sections/SiteHeader.vue'
import SiteFooter from './sections/SiteFooter.vue'
import HeroSection from './sections/HeroSection.vue'
import MenuSection from './sections/MenuSection.vue'
import PhilosophySection from './sections/PhilosophySection.vue'
import TheArtSection from './sections/TheArtSection.vue'
import CocktailCarouselSection from './sections/CocktailCarouselSection.vue'

const { t, locale } = useI18n()

function setMetaContent(selector: string, content: string) {
  const meta = document.querySelector<HTMLMetaElement>(selector)
  if (meta) meta.content = content
}

watchEffect(() => {
  document.documentElement.lang = locale.value
  document.title = t('seo.title')
  setMetaContent('meta[name="description"]', t('seo.description'))
  setMetaContent('meta[property="og:site_name"]', t('seo.siteName'))
  setMetaContent('meta[property="og:title"]', t('seo.title'))
  setMetaContent('meta[property="og:description"]', t('seo.description'))
  setMetaContent('meta[name="twitter:card"]', t('seo.twitterCard'))
  setMetaContent('meta[name="twitter:title"]', t('seo.title'))
  setMetaContent('meta[name="twitter:description"]', t('seo.description'))
})
</script>

<template>
  <a
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-button focus:bg-accent focus:px-4 focus:py-2 focus:text-primary-foreground"
    href="#main-content"
  >
    {{ t('common.skipToContent') }}
  </a>
  <SiteHeader />
  <main id="main-content" class="w-full overflow-x-hidden text-foreground">
    <HeroSection />
    <MenuSection />
    <PhilosophySection />
    <TheArtSection />
    <CocktailCarouselSection />
  </main>
  <SiteFooter />
</template>
