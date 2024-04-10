import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('rooms', () => {

  const showDetail = ref(false)

  return {
    showDetail,
  }
})