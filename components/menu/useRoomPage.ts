import { ref, onMounted, type Ref } from 'vue'
import { useRoomStore } from '../../store/rooms'
import { storeToRefs } from 'pinia'

export const useRoomPage = <K extends HTMLElement | null>(bar: Ref<K>) => {
  const { rooms, hasMoreRooms, page, currQuery, currFilters } = storeToRefs(useRoomStore())

  const loading = ref(false)

  const intersectionHandler = async ([bar]: IntersectionObserverEntry[]) => {
    if (!bar.isIntersecting || !hasMoreRooms.value) return
    loading.value = true
    await useRoomStore().updateRooms()
    loading.value = false
  }

  onMounted(() => {
    if (!bar.value) return console.error('Bar element is not mounted')
    const observer = new IntersectionObserver(intersectionHandler)
    observer.observe(bar.value)
  })

  return { rooms, loading, hasMoreRooms }
}
