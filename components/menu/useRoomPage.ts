import { ref, onMounted, type Ref } from 'vue'
import { useRoomStore } from '../../store/rooms'
import { storeToRefs } from 'pinia'

const SPACE_PROVIDER_URI = `https://spaceprovider.up.railway.app/api/v1`

export const useRoomPage = <K extends HTMLElement | null>(bar: Ref<K>) => {
  const { rooms, hasMoreRooms, page } = storeToRefs(useRoomStore())

  const loading = ref(false)

  const intersectionHandler = async ([ bar ]: IntersectionObserverEntry[]) => {
    if (!bar.isIntersecting || !hasMoreRooms.value) return
    loading.value = true
    const rawResponse = await fetch(SPACE_PROVIDER_URI + `?page=${++page.value}&limit=10`)
    const response = await rawResponse.json()
    const { page: paginationData, rooms: newRooms } = response
    hasMoreRooms.value = !paginationData.last_page
    rooms.value.push(...newRooms)
    loading.value = false
  }

  onMounted(() => {
    if (!bar.value) return console.error('Bar element is not mounted')
    const observer = new IntersectionObserver(intersectionHandler)
    observer.observe(bar.value)
  })

  return { rooms, loading, hasMoreRooms }
}