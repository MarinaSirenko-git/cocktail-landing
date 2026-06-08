<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <p class="site-footer__copy">&copy; {{ year }} Cocktail. All rights reserved.</p>
    </div>
  </footer>
</template>
