<script setup lang="ts">
import { ref } from 'vue'
import RoomLabel from '../shared/RoomLabel.vue'
import type { Label } from '../../utils/labels'

const favorite = ref(false)

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

    <div class="flex justify-between">

      <!-- labels -->
      <div class="flex gap-1 py-2">
        <RoomLabel
          v-for="label in props.labels"
          :key="label"
          :label="label"
        />
      </div>

      <!-- favorite a room -->
      <button @click.stop="favorite = !favorite">
        <mdicon
          :name="favorite ? 'star' : 'star-outline'"
          :class="{
            'text-yellow-400': favorite,
            'text-black': !favorite
          }"
          :size="28"
        />
      </button>

    </div>

    <!-- detail -->
    <div class="flex flex-col">
      <div class="text-xl font-bold leading-[1]">
        {{ props.building }} {{ props.room }}
      </div>
      <div class="text-sm leading-[1.2]">
        {{ props.availability }}
      </div>
    </div>

  </div>
</template>