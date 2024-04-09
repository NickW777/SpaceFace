<script setup lang="ts">
import AppHeaderActions from './AppHeaderActions.vue'
</script>

<template>
  <header
    class="w-screen bg-study-space rounded-b-xl text-white flex p-5 flex-col"
  >

    <!-- title -->
    <h1 class="text-5xl font-bold">
      Study Spaces
    </h1>

    <!-- actions -->
    <div class="mt-2 relative">
      <AppHeaderActions />
    </div>

  </header>
</template>