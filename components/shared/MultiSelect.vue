<script setup lang="ts" generic="T extends string | number">

type Option<T> = {
  value: T,
  label: string | number
}

defineProps<{
  modelValue: T,
  options: Option<T>[] | readonly Option<T>[]
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()

</script>

<template>
  <div class="flex items-center gap-1 bg-white rounded-full p-1 h-6">
    <div
      v-for="(option, i) in options"
      :key="i"
      @click.stop="emits('update:modelValue', option.value)"
      :class="[
        option.value === modelValue ? 'text-white' : 'text-black',
        option.value === modelValue ? 'bg-study-space-light' : 'bg-white',
        'rounded-full',
        'px-6',
        'h-5'
      ]"
    >
      {{ option.label }}
    </div>
  </div>
</template>