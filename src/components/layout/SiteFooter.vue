<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border bg-background py-8">
    <p class="text-center text-sm text-muted-subtle">
      &copy; {{ year }} Velvet Pour. All rights reserved.
    </p>
  </footer>
</template>
