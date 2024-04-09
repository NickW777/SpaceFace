<script setup lang="ts">
import RoomLabel from '../shared/RoomLabel.vue'
import LargeCircularButton from '../shared/LargeCircularButton.vue'
import BackNavigate from '../detail/BackNavigate.vue'
import RoomAvailability from './RoomAvailability.vue'
import { useRoomStore } from '../../store/rooms';
import { storeToRefs } from 'pinia';

const roomStore = useRoomStore()
const { showDetail } = storeToRefs(roomStore)

// get room from pinia, showDisplay should be a derived value that is true when room is not null
// selecting a room should set the room in the store

const labels = ['OUTLETS', 'NO_OUTLETS', 'WHITEBOARD', 'CHALKBOARD'] as const

</script>

<template>
  <div
    class="w-screen h-screen"
  >
    <BackNavigate @click.stop="showDetail = false" />
    <!-- images carousel - implement this with swiper.js! -->
    <img
      src="/images/ILC.jpeg"
      alt="room"
      class="w-full h-[40%] object-cover"
    />

    <!-- popover tab -->
    <div
      class="w-full h-[calc(60%+10px)] bg-white rounded-t-xl -translate-y-[10px] p-4 overflow-auto"
    >

      <div class="px-2 flex justify-between">

        <!-- title content -->
        <div>

          <!-- labels -->
          <div class="flex gap-1 py-2">
            <RoomLabel
              v-for="label in labels"
              :key="label"
              :label="label"
            />
          </div>

          <!-- title -->
          <h1 class="text-5xl font-bold">
            ILC N151
          </h1>

          <!-- availability -->
          <span class="text-2xl font-light">
            Study Here Until 10pm
          </span>

        </div>

        <!-- large action buttons -->
        <div class="flex flex-col gap-2">
          <LargeCircularButton class="bg-study-space-light" />
          <LargeCircularButton class="bg-favorite" />
        </div>

      </div>

      <!-- availability detail -->
      <RoomAvailability
        availability="replace me with some data from block map!"
        class="mt-[90px]"
      />

    </div>

  </div>
</template>