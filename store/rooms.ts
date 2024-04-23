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

      // Stores the labels that have been toggled in Filter Menu
      toggledLabels: [] as string[]

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
      console.log(`Storing ${b} from BlockMap`)
      //Store the room availability in a map for easy access
      this.roomAvailability[b.building_code + '_' + b.room_code] = b
      //Tell the app the data is available to display
      this.roomAvailabilityLoading = false
    },

    startLoadingRoomAvailability() {
      this.roomAvailabilityLoading = true

    toggleLabel(label: string) {
      const currentIndex = this.toggledLabels.indexOf(label);
      if (currentIndex == -1) {
        this.toggledLabels.push(label);
      } else {
        this.toggledLabels.splice(currentIndex, 1);
      }

    }
  }
})
