<script setup lang="ts">
import { ref } from 'vue'
import MultiSelect from '../shared/MultiSelect.vue';
import RoundButton from '../shared/RoundButton.vue';

const options = [
  { value: 1, label: 'map-marker-outline' },
  { value: 2, label: 'star-outline' },
  { value: 3, label: 'wheelchair-accessibility' }
] as const

type Value = typeof options[number]['value']

const selectedFilter = ref<Value>(options[0].value)

const searchActive = ref(false)

</script>

<template>
  <div class="flex justify-between h-8">

    <div
      :class="[
        'bg-white text-black rounded-full flex items-center transition-all duration-300 ease-in-out',
        searchActive ? 'w-full' : 'w-16',
      ]"

    >
      <button
        @click.stop="searchActive = !searchActive"
        :class="[
          searchActive ? 'px-1' : 'px-5',
          'transition-all duration-300 ease-in-out cursor-pointer'
        ]"
      >
        <mdicon
          :name="searchActive ? 'chevron-left' : 'magnify'"
          :size="searchActive ? 28 : 24"
        />
      </button>
    </div>

    <MultiSelect
      v-model="selectedFilter"
      :options="options"
      :class="[
        !searchActive ? 'delay-100' : 'opacity-0',
        'transition duration-200 ease-in-out w-[200px] absolute right-0',
      ]"
      type="icon"
    />
  </div>
</template>