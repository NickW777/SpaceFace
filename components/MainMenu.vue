<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import RoomList from './RoomList.vue'

const HEADER_HEIGHT_PX = 110
</script>

<template>
  <div>
    <AppHeader :class="[`h-[${HEADER_HEIGHT_PX}px]`]" />
    <RoomList :class="[`h-[calc(100vh-${HEADER_HEIGHT_PX}px)]`, 'py-3']" />
  </div>
</template>