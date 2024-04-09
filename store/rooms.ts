import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoomStore = defineStore('rooms', () => {

  const showDetail = ref(false)

  return {
    showDetail,
  }
})