<script setup lang="ts">
import { ref } from 'vue'
import MultiSelect from '../shared/MultiSelect.vue'
import { BlockMap, BlockMapType } from '../../utils/ZodTypes'

import { useCounter } from '../../composables/counter'
import { useRoomStore } from '../../store/rooms'
const roomStore = useRoomStore()

const { count, increment, double } = useCounter(20)
const counter2 = useCounter(15)

const DAYS_OF_WEEK = [
  { value: 'Sun', label: 'sun' },
  { value: 'Mon', label: 'mon' },
  { value: 'Tue', label: 'tue' },
  { value: 'Wed', label: 'wed' },
  { value: 'Thu', label: 'thu' },
  { value: 'Fri', label: 'fri' },
  { value: 'Sat', label: 'sat' }
] as const

type Day = (typeof DAYS_OF_WEEK)[number]['value']

const selectedDay = ref<Day>('Mon')

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
      <!-- select day of week -->
      <MultiSelect v-model="selectedDay" :options="DAYS_OF_WEEK" />
      <!-- come up with design and fill in with data computed from block map -->
      <!-- this may be a new component -->

      <div
        v-if="!roomStore.isLoadingRoomAvailability"
        v-for="i in props.availability.Blocks[selectedDay].length"
        :key="i"
        class="h-12 w-full bg-gray-300 rounded-xl"
      >
        {{ props.availability.Blocks[selectedDay][i - 1] }}
      </div>
      <div v-else>Loading...</div>

      <!-- <button @click="increment" class="bg-gray-800 p-3 text-white font-bold text-2xl">
        {{ count }} - {{ double }}
      </button>

      <button @click="counter2.increment" class="bg-gray-800 p-3 text-white font-bold text-2xl">
        {{ counter2.count }}
      </button> -->
    </div>
  </div>
</template>
