<script setup lang="ts">
import RoomCard from './RoomCard.vue'
import { useRoomStore } from '../../store/rooms'
import { storeToRefs } from 'pinia'

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
        @click.stop="roomStore.toggleDetail()"
        :building="roomStore.getPage(0).rooms[i - 1].building"
        :room="roomStore.getPage(0).rooms[i - 1].room"
        thumbnail="/images/ILC.jpeg"
        availability="Available For Another 3 Hours (Until 5pm)"
        :labels="roomStore.getPage(0).rooms[i - 1].labels"
      />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
