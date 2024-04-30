<script setup lang="ts">
import { computed } from 'vue'
import RoomCard from './RoomCard.vue'
import RoomCardSkeleton from './RoomCardSkeleton.vue'
import { useRoomStore } from '../../store/rooms'
import { storeToRefs } from 'pinia'
import { fetchBlockMap, fetchCompleteSpaceProvider } from '../../utils/query'
import { watch } from 'vue'
import { RoomType } from '../../utils/ZodTypes'

const roomStore = useRoomStore()
const { appStarted } = storeToRefs(roomStore)

// adding this because your loading system will eventually need to be speced out a bit more than just appStarted. Use intersection observers to indicate when new data needs to be loaded.
const loading = computed(() => !appStarted.value)

//TODO make it so app does not crash when data has not been loaded yet
const rooms = computed(() => roomStore?.getPage(0)?.rooms)

// yonas note: this was inlined inside the template, this breaks the declarative nature of Vue. It's better to have this in the script setup
const toggleDetail = async (room: RoomType) => {
  roomStore.setDetailRoom(room)
  //Open the room detail view
  roomStore.toggleDetail()
  fetchCompleteSpaceProvider(roomStore.getPage(0).rooms[1]._id).then((data) => {
    roomStore.storeCompleteRoom(0, 1, data)
  })

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
    <div v-for="room in rooms" :key="room._id" class="w-1/2 px-1 pb-2">
      <RoomCard
        @click.stop="toggleDetail(room)"
        :building="room.building"
        :room="room.room"
        :thumbnail="room.images?.[0] || '/images/imageNotFound.jpg'"
        availability="Available For Another 3 Hours (Until 5pm)"
        :labels="room.labels"
      />
    </div>

    <div v-if="loading" v-for="i in 50" :key="i" class="w-1/2 px-1 pb-2">
      <RoomCardSkeleton />
    </div>
  </div>
</template>
