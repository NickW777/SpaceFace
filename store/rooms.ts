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
    },

    getPageCount: (state) => {
      return () => state.currQuery.length
    }
  },

  actions: {
    toggleDetail() {
      this.showDetail = !this.showDetail
    },

    storePage(s: string) {
      this.currQuery.push(s)
    }
  }
  // const showDetail = ref(false)

  // return {
  //   showDetail
  // }
})
