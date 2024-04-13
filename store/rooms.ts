import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('rooms', {
  state: () => {
    return {
      showDetail: ref(false),
      currQuery: [] as string[]
    }
  },

  getters: {
    getPage: (state) => {
      return (i: number) => state.currQuery[i]
    }
  },

  actions: {
    toggleDetail() {
      this.showDetail = !this.showDetail
    },

    storePage() {
      this.currQuery.push('query')
    }
  }
  // const showDetail = ref(false)

  // return {
  //   showDetail
  // }
})
