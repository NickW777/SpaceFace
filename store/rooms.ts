import { ref } from 'vue'
import { defineStore } from 'pinia'
import { BlockMapType, SpaceProviderType } from '../utils/ZodTypes'

// yonas notes:

// 1. pinia automatically treats everything in returned from state as reactive

// 2. room availability should not be a value globally stored, it should be fetched on demand
// and tied to the availability component specific to the room that is being viewed

// 3. why are we using the string constructor to initialize currQuery?

// 4. filter options should be an object that is used to store various filter options selected by users not scattered in the room caching store

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
      roomAvailabilityLoading: ref(false),
    }
  },

  getters: {
    getPage: (state) => {
      return (i: number) => state.currQueryResults[i]
    },

    getPageCount: (state) => {
      return () => state.currQueryResults.length
    },

    // yonas note: consider localizing to RoomAvailability component
    getRoomAvailability: (state) => {
      return (room: string) => state.roomAvailability[room]
    },

    isLoadingRoomAvailability: (state) => {
      return state.roomAvailabilityLoading
    }
  },

  actions: {
    // yonas note: consider making this a derived state based on whether the user has selected a room to view
    toggleDetail() {
      this.showDetail = !this.showDetail
    },

    // yonas note: can we use a more descriptive name for this function and the parameter?
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

    // yonas note: why are we making this a function? if we need to mutate state based on a series of actions, the logic should stay in the action
    startLoadingRoomAvailability() {
      this.roomAvailabilityLoading = true

    },

    // yonas note: label has a type, we should use that type instead of string
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
