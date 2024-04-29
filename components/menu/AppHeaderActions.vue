<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import MultiSelect from '../shared/MultiSelect.vue'
import { useRoomStore } from '../../store/rooms'
import { fetchSpaceProvider } from '../../utils/query'

const roomStore = useRoomStore()

const options = [
  { value: 1, label: 'map-marker-outline' },
  { value: 2, label: 'star-outline' },
  { value: 3, label: 'wheelchair-accessibility' }
] as const

type Value = (typeof options)[number]['value']

const selectedFilter = ref<Value>(options[0].value)

const searchActive = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)

const searchText = ref(null)

const focusSearchField = () => {
  if (!searchActive.value) return
  queueMicrotask(() => searchInput.value?.focus())
}

watch(searchActive, focusSearchField)

const callAPIWithSearchQuery = async () => {
  const data = await fetchSpaceProvider(searchText.value)
  roomStore.storePage(data)
}

const updateSearch = useDebounceFn(callAPIWithSearchQuery, 2000)

watch(searchText, updateSearch)
</script>

<template>
  <div class="flex justify-between h-8">

    <div
      :class="[
        'bg-white text-black rounded-full flex items-center transition-all duration-300 ease-in-out flex items-center',
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

      <input
        v-show="searchActive"
        v-model="searchText"
        ref="searchInput"
        type="text"
        class="w-4/5 outline-transparent"
        placeholder="Search"
      />
    </div>

    <MultiSelect
      v-model="selectedFilter"
      :options="options"
      :class="[
        !searchActive ? 'delay-100' : 'opacity-0',
        'transition duration-200 ease-in-out w-[200px] right-0',
      ]"
      style="position: absolute;"
      type="icon"
    />
  </div>
</template>