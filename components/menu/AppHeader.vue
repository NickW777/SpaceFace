<script setup lang="ts">
import { ref } from 'vue'
import RoundButton from '../shared/RoundButton.vue'
import MultiSelect from '../shared/MultiSelect.vue'

const options = [
  { value: 1, label: 'map-marker-outline' },
  { value: 2, label: 'star-outline' },
  { value: 3, label: 'wheelchair-accessibility' }
] as const

type Value = typeof options[number]['value']

const selectedFilter = ref<Value>(options[0].value)
</script>

<template>
  <header
    class="w-screen bg-study-space rounded-b-xl text-white flex p-5 flex-col"
  >

    <!-- title -->
    <h1 class="text-5xl font-bold">
      Study Spaces
    </h1>

    <!-- actions -->
    <div class="mt-2 flex justify-between">
      <RoundButton>
        <mdicon name="magnify" size="24" />
      </RoundButton>

      <MultiSelect
        v-model="selectedFilter"
        :options="options"
        type="icon"
        class="w-[200px]"
      />
    </div>

  </header>
</template>