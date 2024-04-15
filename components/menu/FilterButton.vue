<script setup lang="ts">
import { ref, watch } from 'vue'
import LargeCircularButton from '../shared/LargeCircularButton.vue'
import RoomLabel from '../shared/RoomLabel.vue'
import type { Label } from '../../utils/labels'

const filterActive = ref(false);

function tempClick(message:string) {
  alert(message)
}

// This is a placeholder, probably
let labels:Label[] = ['OUTLETS', 'WHITEBOARD', 'CHALKBOARD', 'NO_OUTLETS'];
</script>

<template>
  <div class="absolute bottom-5 right-5 flex flex-col items-center">
    <div v-if="filterActive" class="bg-study-space-light rounded-full">
      <RoomLabel
        v-for="label in labels"
        :key = "label"
        :label = "label"
        class="m-2 bg-slate-700"
        @click.stop="tempClick(label)"
      />
    </div>
    <LargeCircularButton
      @click.stop="filterActive = !filterActive"
      :icon="filterActive ? 'window-close' : 'tune'"
      class="bg-study-space-light text-white"
    />
  </div>
</template>