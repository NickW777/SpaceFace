import { ref } from 'vue'
import { defineStore } from 'pinia'
import { SpaceProviderType, SpaceProvider } from '../utils/ZodTypes'

export const useRoomStore = defineStore('rooms', {
  state: () => {
    return {
      showDetail: ref(false),
      currQuery: [] as SpaceProviderType[]
    }
  },

  getters: {
    getPage: (state) => {
      return (i: number) => state.currQuery[i]
    },

    getPageCount: (state) => {
      return () => state.currQuery.length
    }
  },

  actions: {
    toggleDetail() {
      this.showDetail = !this.showDetail
    },

    storePage(s: SpaceProviderType | null) {
      if (s === null) return
      console.log('storing page')
      this.currQuery.push(s)
    }
  }
})
