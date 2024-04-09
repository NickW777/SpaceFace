<script setup lang="ts">
import { ref } from 'vue'
import MultiSelect from '../shared/MultiSelect.vue';

const DAYS_OF_WEEK = [
  { value: 'sun', label: 'sun' },
  { value: 'mon', label: 'mon' },
  { value: 'tue', label: 'tue' },
  { value: 'wed', label: 'wed' },
  { value: 'thu', label: 'thu' },
  { value: 'fri', label: 'fri' },
  { value: 'sat', label: 'sat' },
] as const

type Day = typeof DAYS_OF_WEEK[number]['value']

const selectedDay = ref<Day>('sun')

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

    <!-- content - come up with design and fill in with data computed from block map -->
    <div class="bg-gray-200 p-5 flex flex-col gap-3 rounded-2xl">
      <div
        v-for="i in 3"
        :key="i"
        class="h-12 w-full bg-gray-300 rounded-xl"
      ></div>

      <!-- select day of week -->
      <MultiSelect
        v-model="selectedDay"
        :options="DAYS_OF_WEEK"
        padding="3"
      />

    </div>

  </div>
</template>