<script setup lang="ts">
import { computed } from 'vue'
import RoomCard from './RoomCard.vue'
import RoomCardSkeleton from './RoomCardSkeleton.vue'
import { useRoomStore } from '../../store/rooms'
import { storeToRefs } from 'pinia'
import { fetchBlockMap, fetchCompleteSpaceProvider } from '../../utils/query'
import { watch } from 'vue'

const roomStore = useRoomStore()
const { appStarted } = storeToRefs(roomStore)

// adding this because your loading system will eventually need to be speced out a bit more than just appStarted. Use intersection observers to indicate when new data needs to be loaded.
const loading = computed(() => !appStarted.value)

// you have to clean this up. Your app shouldn't be crashing if the data is not there.
const rooms = computed(() => roomStore?.getPage(0)?.rooms)

// yonas note: this was inlined inside the template, this breaks the declarative nature of Vue. It's better to have this in the script setup
const toggleDetail = async () => {
  //Open the room detail view
  roomStore.toggleDetail()
  //Don't query BlockMap if that room has already been queried
  if (roomStore.getRoomAvailability('BART_0065') === undefined) {
    roomStore.startLoadingRoomAvailability()
    const data = await fetchBlockMap('BART_0065')
    roomStore.storeRoomAvailability(data)
  }
}
</script>

<template>
  <div class="flex flex-wrap overflow-auto py-3 px-2 relative w-full">

    <div
      v-for="room in rooms"
      :key="room._id"
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
      />

    </div>

    <div
      v-if="loading"
      v-for="i in 50"
      :key="i"
      class="w-1/2 px-1 pb-2"
    >
      <RoomCardSkeleton />
    </div>

  </div>

</template>
