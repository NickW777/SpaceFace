<script setup lang="ts">
import RoomCard from './RoomCard.vue'
</script>

<template>
  <div class="flex flex-wrap gap-2 items-center justify-center">
    <div
      v-for="i in 100"
      :key="i"
    >
      <RoomCard />
    </div>
  </div>
</template>