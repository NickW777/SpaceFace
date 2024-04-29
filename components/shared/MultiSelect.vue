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
    class="flex items-center justify-between bg-white rounded-full h-8 overflow-auto relative"
  >

    <button
      v-for="(option, i) in options"
      :key="i"
      @click.stop="emits('update:modelValue', option.value)"
      :class="[
        option.value === modelValue ? 'text-white' : 'text-black',
        `w-[${100 / options.length}%]`,
        'h-7',
        'rounded-full',
        'grid place-items-center',
        'z-20',
        'transition-colors',
        'duration-300'
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

    <!-- background color on selected -->
    <div
      :class="[
        'absolute',
        'bg-study-space',
        'rounded-full',
        'h-7',
        `w-[calc(${100 / options.length}%-6px)]`,        'transition-all',
        'duration-300',
        `left-[calc(${(options.findIndex(o => o.value === modelValue) * (100 / options.length))}%+3px)]`,
      ]"
    ></div>

  </div>
</template>