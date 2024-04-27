import { ref } from 'vue'
import { defineStore } from 'pinia'
import { BlockMapType, RoomType, SpaceProviderType } from '../utils/ZodTypes'
import RoomAvailability from '../components/detail/RoomAvailability.vue'
import { set } from '@vueuse/core'

export const useRoomStore = defineStore('rooms', {
  state: () => {
    return {
      showDetail: ref(false),
      detailIndex: ref({ page: 0, room: 0 }),

      //Has the app gotten a first page of results to display
      appStarted: ref(false),
      //Keep track of the last query to determine if it changed or we're just
      //getting the next page so we can reset results
      currQuery: ref(new String()),
      //Each entry in this array is a page of results from SpaceProvider
      currQueryResults: ref([] as SpaceProviderType[]),

      roomAvailability: ref([] as BlockMapType[]),
      roomAvailabilityLoading: ref(false),

      // Stores the labels that have been toggled in Filter Menu
      toggledLabels: [] as string[],

      detailImagesKey: ref(0)
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
    },

    getDetailRoom: (state) => {
      return () => state.currQueryResults[state.detailIndex.page].rooms[state.detailIndex.room]
    }
  },

  actions: {
    setDetailRoom(page: number, room: number) {
      this.detailIndex = { page: page, room: room }
    },

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

    storeCompleteRoom(page: number, room: number, r: RoomType) {
      this.currQueryResults[page].rooms[room] = r
      // set(this.currQueryResults[page].rooms, room, r)
      // set(this.currQueryResults, page, set(this.currQueryResults[page], room, r))

      // Create a copy of the current rooms
      // const newRooms = [this.currQueryResults[page].rooms]

      // // Update the room in the copied array
      // newRooms[room] = r

      // // Replace the old rooms array with the new one
      // this.currQueryResults[page].rooms = newRooms

      // console.log(this.currQueryResults[page].rooms[room])
      // this.detailImagesKey += 1
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
    },

    toggleLabel(label: string) {
      const currentIndex = this.toggledLabels.indexOf(label)
      if (currentIndex == -1) {
        this.toggledLabels.push(label)
      } else {
        this.toggledLabels.splice(currentIndex, 1)
      }
    }
  }
})
