<script setup lang="ts" generic="T extends string | number">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: T,
  options: T[]
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()
</script>

<template>

</template>