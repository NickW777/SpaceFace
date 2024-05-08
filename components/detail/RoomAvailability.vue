<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { BlockMapType } from '../../utils/ZodTypes'
import MultiSelect from '../shared/MultiSelect.vue'
import CalendarBlock from './CalendarBlock.vue'
import { getBlock } from './getBlock'
import {isAvailable} from '../shared/isAvailable'
import { useRoomStore } from '../../store/rooms'
const roomStore = useRoomStore()

const blockData = ref<BlockMapType>({
  building_code: '',
  room_code: '',
  Blocks: {
    Sun: [],
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: []
  }
})

const block = computed(() => blockData.value['Blocks'])

const loading = ref(false)

const DAYS_OF_WEEK = [
  { value: 'Sun', label: 'sun' },
  { value: 'Mon', label: 'mon' },
  { value: 'Tue', label: 'tue' },
  { value: 'Wed', label: 'wed' },
  { value: 'Thu', label: 'thu' },
  { value: 'Fri', label: 'fri' },
  { value: 'Sat', label: 'sat' }
] as const

const currentDate = new Date();
const days = DAYS_OF_WEEK.map(({ value }) => value)
const selectedDay = ref(days[currentDate.getDay()])

const props = defineProps<{
  building: string,
  room: string,
}>()

onMounted(async () => {
  loading.value = true
  const blockFetchRes = await getBlock(props.building, props.room)
  if ('ERROR' in blockFetchRes) {
    loading.value = false
    return
  }
  blockData.value = blockFetchRes
  loading.value = false

  // Set room availability every second
  updateIsReady;
  setInterval(updateIsReady, 3000)
})

// Ref for room availability
const isReady = ref(false)

// Updates isReady
function updateIsReady() {
  if (roomStore.showDetail) {
    isReady.value = isAvailable(blockData);
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center my-1 px-3">
      <!-- title -->
      <h1 class="text-4xl font-semibold">
        Availability
      </h1>

      <!-- emblem -->
      <span class="bg-green-500 text-white px-3 rounded-full shadow-gray-400 shadow-sm" :class="{'bg-green-500' : isReady, 'bg-red-500' : !isReady}">
        {{isReady ? "ready now" : "not ready"}}
      </span>
    </div>

    <!-- content -->
    <div class="bg-gray-200 p-5 flex flex-col gap-3 rounded-2xl">
      <!-- select day of week -->
      <MultiSelect
        v-model="selectedDay"
        :options="DAYS_OF_WEEK"
      />

      <div
        v-if="block[selectedDay]"
        v-for="[start, end] in block[selectedDay]"
        :key="start"
      >
        <CalendarBlock
          :start="start"
          :end="end"
        />
      </div>

      <div v-if="loading">
        Loading...
      </div>

      <div v-else-if="block[selectedDay].length === 0">
        Nothing is blocking this room on {{ selectedDay.toLowerCase() }}
      </div>

    </div>
  </div>
</template>
