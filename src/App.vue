<script setup lang="ts">
import MainMenu from '../components/menu/MainMenu.vue'
import RoomDetail from '../components/detail/RoomDetail.vue'
import { useRoomStore } from '../store/rooms'
import { storeToRefs } from 'pinia'
import { fetchSpaceProvider } from '../utils/query'

const roomStore = useRoomStore()
const { showDetail, appStarted } = storeToRefs(roomStore)

const initialize = () => {
  fetchSpaceProvider('', 1, 10).then((data) => roomStore.storePage(data))
}
initialize()
</script>

<template>
  <div>
    <Transition :name="showDetail ? 'in' : 'out'">
      <RoomDetail v-if="showDetail" />
      <MainMenu v-else />
    </Transition>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap');

body {
  font-family: 'League Spartan', sans-serif;
}

/* TRANSITION INTO DETAIL */

.in-enter-active,
.in-leave-active {
  transition: transform 0.4s ease;
  position: fixed;
}

.in-enter-from {
  transform: translateX(100%);
}

.in-leave-to {
  transform: translateX(-100%);
}

/* TRANSITION OUT OF DETAIL */

.out-enter-active,
.out-leave-active {
  transition: transform 0.4s ease;
  position: fixed;
}

.out-enter-from {
  transform: translateX(-100%);
}

.out-leave-to {
  transform: translateX(100%);
}
</style>
../utils/query
