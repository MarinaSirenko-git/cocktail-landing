<script setup lang="ts">
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import HeroSection from './sections/HeroSection.vue'
import MenuSection from './sections/MenuSection.vue'
import PhilosophySection from './sections/PhilosophySection.vue'
import TheArtSection from './sections/TheArtSection.vue'
import ShowcaseSection from './sections/ShowcaseSection.vue'
import CocktailCarouselSection from './sections/CocktailCarouselSection.vue'
import ContactSection from './sections/ContactSection.vue'
</script>

<template>
  <a
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-button focus:bg-accent focus:px-4 focus:py-2 focus:text-primary-foreground"
    href="#main-content"
  >
    Skip to content
  </a>
  <SiteHeader />
  <main id="main-content" class="min-h-screen bg-background text-foreground">
    <HeroSection />
    <MenuSection />
    <PhilosophySection />
    <TheArtSection />
    <ShowcaseSection />
    <CocktailCarouselSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
