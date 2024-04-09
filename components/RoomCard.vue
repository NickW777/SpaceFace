<script setup lang="ts">

const props = defineProps<{
  building: string,
  room: string,
  thumbnail: string,
  labels: string[],
  availability: string,
}>()
</script>

<template>
  <div class="d-flex flex-col relative">

    <!-- image -->
    <img
      :src="props.thumbnail"
      alt="room thumbnail"
      class="bg-gray-300 h-[120px] w-full rounded-xl object-cover"
    />

    <!-- detail -->
    <div class="flex flex-col mt-2">
      <div class="text-lg font-bold leading-[1]">
        {{ props.building }} {{ props.room }}
      </div>
      <div class="text-sm">
        {{ props.availability }}
      </div>
    </div>

  </div>
</template>