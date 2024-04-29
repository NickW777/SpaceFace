<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import RoomList from './RoomList.vue'
import FilterButton from './FilterButton.vue'

const HEADER_HEIGHT_PX = 125
</script>

<template>
  <div>
    <AppHeader :class="[`min-h-[${HEADER_HEIGHT_PX}px]`]" />
    <RoomList :class="[`max-h-[calc(100vh-${HEADER_HEIGHT_PX}px)]`]" />
    <FilterButton/>
  </div>
</template>