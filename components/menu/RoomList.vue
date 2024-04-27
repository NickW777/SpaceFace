<script setup lang="ts">
import RoomCard from './RoomCard.vue'
import { useRoomStore } from '../../store/rooms'
import { storeToRefs } from 'pinia'
import { fetchBlockMap, fetchCompleteSpaceProvider } from '../../utils/query'
import { watch } from 'vue'

const roomStore = useRoomStore()
const { appStarted } = storeToRefs(roomStore)
</script>

<template>
  <div class="flex flex-wrap items-center justify-center overflow-auto py-3 px-2">
    <div
      v-if="appStarted"
      v-for="i in roomStore.getPage(0).rooms.length"
      :key="i"
      class="w-1/2 px-1 pb-2"
    >
      <RoomCard
        @click.stop="
          () => {
            //Choose the room and open the room detail view
            roomStore.setDetailRoom(0, i - 1)
            roomStore.toggleDetail()
            fetchCompleteSpaceProvider(roomStore.getPage(0).rooms[i - 1]._id).then((data) => {
              roomStore.storeCompleteRoom(0, i - 1, data)
            })

            //Don't query Blockmap if that room has already been queried
            if (roomStore.getRoomAvailability('BART_0065') === undefined) {
              roomStore.startLoadingRoomAvailability()
              fetchBlockMap('BART_0065').then((data) => roomStore.storeRoomAvailability(data))
            }
          }
        "
        :building="roomStore.getPage(0).rooms[i - 1].building"
        :room="roomStore.getPage(0).rooms[i - 1].room"
        :thumbnail="roomStore.getPage(0).rooms[i - 1].images?.[0] || '/images/imageNotFound.jpg'"
        availability="Available For Another 3 Hours (Until 5pm)"
        :labels="roomStore.getPage(0).rooms[i - 1].labels"
      />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
