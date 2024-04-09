<script setup lang="ts">

defineProps<{
  availability: string
  // take a prop that contains data from block map corresponding to the room
  // this will need to get parsed out a bit
}>()
</script>

<template>
  <div>

    <h1 class="text-4xl font-semibold">
      Availability
    </h1>

    <div class="bg-gray-200 p-5 flex flex-col gap-3 rounded-2xl">
      <div
        v-for="i in 3"
        :key="i"
        class="h-12 w-full bg-gray-300 rounded-xl"
      ></div>
    </div>

  </div>
</template>