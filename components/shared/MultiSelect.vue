<script setup lang="ts" generic="T extends string | number">

type Option<T> = {
  value: T,
  label: string | number
}

defineProps<{
  modelValue: T,
  options: Option<T>[] | readonly Option<T>[],
  type?: 'icon' | 'text'
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()

</script>

<template>
  <div
    class="flex items-center justify-between bg-white rounded-full p-1 h-8 overflow-auto"
  >
    <button
      v-for="(option, i) in options"
      :key="i"
      @click.stop="emits('update:modelValue', option.value)"
      :class="[
        option.value === modelValue ? 'text-white' : 'text-black',
        option.value === modelValue ? 'bg-study-space-light' : 'bg-white',
        `w-[${100 / options.length}%]`,
        'min-w-12',
        'h-7',
        'rounded-full',
        'grid place-items-center',
      ]"
    >
      <mdicon
        v-if="type === 'icon'"
        :name="option.label"
        :size="22"
      ></mdicon>
      <span v-else>
        {{ option.label }}
      </span>

    </button>
  </div>
</template>