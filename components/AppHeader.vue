<script setup lang="ts">
import RoundButton from './RoundButton.vue'
</script>

<template>
  <header
    class="w-screen bg-study-space rounded-b-xl text-white flex p-5 flex-col"
  >

    <h1 class="text-4xl font-bold">
      Study Spaces
    </h1>

    <!-- actions -->
    <div class="mt-2 flex justify-between">
      <RoundButton>
        Search
      </RoundButton>

      <RoundButton>
        Misc. Options
      </RoundButton>
    </div>

  </header>
</template>