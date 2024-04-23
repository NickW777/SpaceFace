<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import LargeCircularButton from '../shared/LargeCircularButton.vue'
import RoomLabel from '../shared/RoomLabel.vue'
import { Label, LABEL_DISPLAY } from '../../utils/labels'
import { useRoomStore } from '../../store/rooms';

// Filter menu active/inactive
const filterActive = ref(false);

// Gets array for storing toggled room labels from Pinia
const roomStore = useRoomStore();
const isLabelToggled = (index: number) => computed(() => roomStore.toggledLabels.includes(index));
</script>

<template>
  <div class="absolute bottom-5 right-5 flex flex-col items-center">
    <!-- This is the filter menu -->
    <Transition>
      <div v-if="filterActive" class="bg-study-space-light rounded-full">
        <RoomLabel
          v-for="(label, index) in Object.keys(LABEL_DISPLAY)"
          :key = "label"
          :label = "label"
          :class="isLabelToggled(index).value ? '' : 'bg-black'"
          class="m-2"
          @click.stop="roomStore.toggleLabel(index)"
        />
      </div>
    </Transition>
    
    <!-- This is the circular filter button -->
    <LargeCircularButton
      @click.stop="filterActive = !filterActive"
      :icon="filterActive ? 'window-close' : 'tune'"
      class="bg-study-space-light text-white"
    />
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>