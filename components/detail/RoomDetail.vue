<script setup lang="ts">
import { useRoomStore } from '../../store/rooms';
import { storeToRefs } from 'pinia';

const roomStore = useRoomStore()
const { showDetail } = storeToRefs(roomStore)
</script>

<template>
  <div
    @click.stop="showDetail = false"
    class="w-screen h-screen bg-white"
  >
    <h1>
      Room Detail
    </h1>
  </div>
</template>