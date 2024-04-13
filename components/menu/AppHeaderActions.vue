<script setup lang="ts">
import { ref, watch, computed, Ref } from 'vue'
import { executeTransition, useDebounceFn, useFetch } from '@vueuse/core'
import MultiSelect from '../shared/MultiSelect.vue'
import { useRoomStore } from '../../store/rooms'

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

watch(searchActive, (isActive) => {
  if (isActive)
    queueMicrotask(() => {
      searchInput.value?.focus()
    })
})

async function fetchData(q: string | null): Promise<Ref<string | null>> {
  if (!q) q = ''
  const { data } = await useFetch<string>(
    `https://spaceprovider.up.railway.app/api/v1?q=${q}&page=1&limit=2`
  ).get()
  data.value = JSON.stringify(data.value)
  return data
}

//Run the SpaceProvider Query after 2 sec of inactivity
watch(
  searchText,
  useDebounceFn(() => {
    fetchData(searchText.value).then((data) => roomStore.storePage(data.value ?? ''))
  }, 2000)
)
</script>

<template>
  <div class="flex justify-between h-8">
    <div
      :class="[
        'bg-white text-black rounded-full flex items-center transition-all duration-300 ease-in-out flex items-center',
        searchActive ? 'w-full' : 'w-16'
      ]"
    >
      <button
        @click.stop="searchActive = !searchActive"
        :class="[
          searchActive ? 'px-1' : 'px-5',
          'transition-all duration-300 ease-in-out cursor-pointer'
        ]"
      >
        <mdicon :name="searchActive ? 'chevron-left' : 'magnify'" :size="searchActive ? 28 : 24" />
      </button>

      <input
        v-show="searchActive"
        v-model="searchText"
        ref="searchInput"
        type="text"
        class="w-2/3 outline-transparent"
        placeholder="Search"
      />
    </div>

    <MultiSelect
      v-model="selectedFilter"
      :options="options"
      :class="[
        !searchActive ? 'delay-100' : 'opacity-0',
        'transition duration-200 ease-in-out w-[200px] absolute right-0'
      ]"
      type="icon"
    />
  </div>
</template>
