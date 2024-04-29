<script setup lang="ts">
import RoomCard from './RoomCard.vue'
import { useRoomStore } from '../../store/rooms'
import { storeToRefs } from 'pinia'
import { fetchBlockMap } from '../../utils/query'

const roomStore = useRoomStore()
const { appStarted } = storeToRefs(roomStore)
</script>

<template>
  <div
    v-if="appStarted"
    class="flex flex-wrap overflow-auto py-3 px-2 relative w-full"
  >
    <div
      v-for="i in roomStore.getPage(0).rooms.length"
      :key="i"
      class="w-1/2 px-1 pb-2"
    >
      <RoomCard
        @click.stop="
          () => {
            //Open the room detail view
            roomStore.toggleDetail()
            //Don't query BlockMap if that room has already been queried
            if (roomStore.getRoomAvailability('BART_0065') === undefined) {
              roomStore.startLoadingRoomAvailability()
              fetchBlockMap('BART_0065').then((data) => roomStore.storeRoomAvailability(data))
            }
          }
        "
        :building="roomStore.getPage(0).rooms[i - 1].building"
        :room="roomStore.getPage(0).rooms[i - 1].room"
        thumbnail="/images/ILC.jpeg"
        availability="Available For Another 3 Hours (Until 5pm)"
        :labels="roomStore.getPage(0).rooms[i - 1].labels"
      />
    </div>
  </div>
  <div v-else>
    <div class="text-2xl">
      Loading...
    </div>
  </div>
</template>
