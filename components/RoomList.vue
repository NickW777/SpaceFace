<script setup lang="ts">
import RoomCard from './RoomCard.vue'
</script>

<template>
  <div class="flex flex-wrap items-center justify-center overflow-auto py-3 px-2">
    <div
      v-for="i in 100"
      :key="i"
      class="w-1/2 px-1 pb-2"
    >
      <RoomCard
        building="ILC"
        room="N151"
        thumbnail="../images/ILC.jpeg"
        availability="Available Now Until 5PM"
        :labels="['OUTLETS', 'NO_OUTLETS', 'WHITEBOARD', 'CHALKBOARD']"
      />
    </div>
  </div>
</template>