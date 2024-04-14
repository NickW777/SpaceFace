<script setup lang="ts">
import { ref, watch } from 'vue'
import LargeCircularButton from '../shared/LargeCircularButton.vue'

const filterActive = ref(false);

watch(filterActive, (isActive) => {
  if (isActive) alert("active")
})

</script>

<template>
  <div>
  
  </div>
  <LargeCircularButton
  @click.stop="filterActive = !filterActive"
  :icon="filterActive ? 'window-close' : 'tune'"
  class="bg-study-space-light text-white absolute bottom-5 right-5"
  />
</template>