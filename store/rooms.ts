import { ref } from 'vue'
import { defineStore } from 'pinia'
import { SpaceProviderType } from '../utils/ZodTypes'

export const useRoomStore = defineStore('rooms', {
  state: () => {
    return {
      showDetail: ref(false),
      //Has the app gotten a first page of results to display
      appStarted: ref(false),
      //Keep track of the last query to determine if it changed or we're just
      //getting the next page so we can reset results
      currQuery: ref(new String()),
      //Each entry in this array is a page of results from SpaceProvider
      currQueryResults: [] as SpaceProviderType[],

      // Stores the labels that have been toggled in Filter Menu
      toggledLabels: [] as number[]
    }
  },

  getters: {
    getPage: (state) => {
      return (i: number) => state.currQueryResults[i]
    },

    getPageCount: (state) => {
      return () => state.currQueryResults.length
    }
  },

  actions: {
    toggleDetail() {
      this.showDetail = !this.showDetail
    },

    storePage(s: SpaceProviderType | null) {
      if (s === null) return
      //If the the current query isn't the same as the last one, reset the cached pages
      if (s.options.query != this.currQuery.value) {
        this.currQueryResults = new Array<SpaceProviderType>()
        this.currQuery.value = s.options.query
      }
      this.currQueryResults.push(s)
      this.appStarted = true
    },

    toggleLabel(index: number) {
      const currentIndex = this.toggledLabels.indexOf(index);
      if (currentIndex == -1) {
        this.toggledLabels.push(index);
      } else {
        this.toggledLabels.splice(currentIndex, 1);
      }
    }
  }
})
