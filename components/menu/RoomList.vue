<script setup lang="ts">
import { ref } from 'vue'
import { useRoomPage } from './useRoomPage'
import { useRoomStore } from '../../store/rooms'
import RoomCard from './RoomCard.vue'
import RoomCardSkeleton from './RoomCardSkeleton.vue'
import { type RoomType } from '../../utils/ZodTypes'

const roomStore = useRoomStore()

const toggleDetail = async (room: RoomType) => {
  roomStore.setDetailRoom(room)
  roomStore.toggleDetail()
}

const bar = ref()

const { rooms, loading } = useRoomPage<HTMLElement>(bar)
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

    <div v-if="loading" v-for="i in 10" :key="i" class="w-1/2 px-1 pb-2">
      <RoomCardSkeleton />
    </div>

    <div v-show="!loading" ref="bar" style="width: 100%; height: 20px"></div>
  </div>
</template>
