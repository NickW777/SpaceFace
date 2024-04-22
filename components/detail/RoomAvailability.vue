<script setup lang="ts">
import { ref } from 'vue'
import MultiSelect from '../shared/MultiSelect.vue'
import { BlockMap, BlockMapType } from '../../utils/ZodTypes'

import { useCounter } from '../../composables/counter'

const { count, increment, double } = useCounter(20)
const counter2 = useCounter(15)

const DAYS_OF_WEEK = [
  { value: 'sun', label: '☀️' },
  { value: 'mon', label: 'mon' },
  { value: 'tue', label: 'tue' },
  { value: 'wed', label: 'wed' },
  { value: 'thu', label: 'thu' },
  { value: 'fri', label: 'fri' },
  { value: 'sat', label: 'sat' }
] as const

type Day = (typeof DAYS_OF_WEEK)[number]['value']

const selectedDay = ref<Day>('sun')

const props = defineProps<{
  availability: BlockMapType
  // take a prop that contains data from block map corresponding to the room
  // this will need to get parsed out a bit
}>()
</script>

<template>
  <div>
    <div class="flex justify-between items-center my-1 px-3">
      <!-- title -->
      <h1 class="text-4xl font-semibold">Availability</h1>

      <!-- emblem -->
      <span class="bg-green-500 text-white px-3 rounded-full shadow-gray-400 shadow-sm">
        ready now
      </span>
    </div>

    <!-- content -->
    <div class="bg-gray-200 p-5 flex flex-col gap-3 rounded-2xl">
      <!-- come up with design and fill in with data computed from block map -->
      <!-- this may be a new component -->
      <div v-for="i in 3" :key="i" class="h-12 w-full bg-gray-300 rounded-xl">
        {{ props.availability }}
      </div>

      <!-- <button @click="increment" class="bg-gray-800 p-3 text-white font-bold text-2xl">
        {{ count }} - {{ double }}
      </button>

      <button @click="counter2.increment" class="bg-gray-800 p-3 text-white font-bold text-2xl">
        {{ counter2.count }}
      </button> -->

      <!-- select day of week -->
      <MultiSelect v-model="selectedDay" :options="DAYS_OF_WEEK" class="mt-4" />
    </div>
  </div>
</template>
