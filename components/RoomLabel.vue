<script setup lang="ts">
import { type Label, LABEL_DISPLAY } from '../utils/labels'

defineProps<{
  label: Label
}>()
</script>

<template>
  <div
    :class="[
      'rounded-full',
      'text-white',
      'grid',
      'place-items-center',
      LABEL_DISPLAY[label].color
    ]"
  >
    <!-- TODO the icon goes here -->
  </div>
</template>