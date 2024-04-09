<script setup lang="ts">
import { ref } from 'vue'
import RoundButton from '../shared/RoundButton.vue'
import MultiSelect from '../shared/MultiSelect.vue'

const options = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 }
] as const

type Value = typeof options[number]['value']

const selectedFilter = ref<Value>(options[0].value)
</script>

<template>
  <header
    class="w-screen bg-study-space rounded-b-xl text-white flex p-5 flex-col"
  >

    <!-- title -->
    <h1 class="text-4xl font-bold">
      Study Spaces
    </h1>

    <!-- actions -->
    <div class="mt-2 flex justify-between">
      <RoundButton>
        Search
      </RoundButton>

      <MultiSelect
        v-model="selectedFilter"
        :options="options"
        class="w-[150px]"
      />
    </div>

  </header>
</template>