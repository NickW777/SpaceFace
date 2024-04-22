import { ref } from 'vue'
import { defineStore } from 'pinia'
import { BlockMapType, SpaceProviderType } from '../utils/ZodTypes'
import RoomAvailability from '../components/detail/RoomAvailability.vue'

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

      roomAvailability: [] as BlockMapType[],
      roomAvailabilityLoading: ref(false)
    }
  },

  getters: {
    getPage: (state) => {
      return (i: number) => state.currQueryResults[i]
    },

    getPageCount: (state) => {
      return () => state.currQueryResults.length
    },

    getRoomAvailability: (state) => {
      return (room: string) => state.roomAvailability[room]
    },

    isLoadingRoomAvailability: (state) => {
      return state.roomAvailabilityLoading
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

    storeRoomAvailability(b: BlockMapType | null) {
      if (b === null) return
      // const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      // for (let i = 0; i < 7; i++) {
      //   b.Blocks[days[i]].sort(function (a, b) {
      //     return a[0] - b[0]
      //   })
      // }
      //Store the room availability in a map for easy access
      this.roomAvailability[b.building_code + '_' + b.room_code] = b
      //Tell the app the data is available to display
      this.roomAvailabilityLoading = false
    },

    startLoadingRoomAvailability() {
      this.roomAvailabilityLoading = true
    }
  }
})
