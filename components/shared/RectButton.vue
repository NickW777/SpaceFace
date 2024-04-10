<script setup lang="ts">
defineProps<{
  icon?: string,
}>()
</script>

<template>
  <button
    :class="[,
      'text-xl rounded-lg px-4 py-2 w-1/2 flex justify-center items-center gap-2'
    ]"
  >
    <slot><!-- optional fallback --></slot>
    <mdicon
      v-if="icon"
      :name="icon"
      class="text-white text-2xl"
    />
  </button>
</template>