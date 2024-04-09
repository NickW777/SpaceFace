<script setup lang="ts">
import RoomLabel from './RoomLabel.vue'
import type { Label } from '../utils/labels'

const props = defineProps<{
  building: string,
  room: string,
  thumbnail: string,
  labels: Label[],
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

    <!-- labels -->
    <div class="flex gap-1 py-1">
      <RoomLabel
        v-for="label in props.labels"
        :key="label"
        :label="label"
        class="w-6 h-6"
      />
    </div>

    <!-- detail -->
    <div class="flex flex-col">
      <div class="text-lg font-bold leading-[1]">
        {{ props.building }} {{ props.room }}
      </div>
      <div class="text-sm">
        {{ props.availability }}
      </div>
    </div>

  </div>
</template>