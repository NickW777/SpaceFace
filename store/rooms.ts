import { defineStore } from 'pinia'
import { BlockMapType, RoomType, SpaceProviderType } from '../utils/ZodTypes'
import { Label } from '../utils/labels'
import { fetchSpaceProvider } from '../utils/query'

// yonas notes:

//FIXED
// 1. pinia automatically treats everything in returned from state as reactive

// 2. room availability should not be a value globally stored, it should be fetched on demand
// and tied to the availability component specific to the room that is being viewed

//FIXED
// 3. why are we using the string constructor to initialize currQuery?

// 4. filter options should be an object that is used to store various filter options selected by users not scattered in the room caching store

export const useRoomStore = defineStore('rooms', {
  state: () => {
    return {
      rooms: [] as RoomType[],
      hasMoreRooms: true,
      page: 0,

      showDetail: false,
      currDetailRoom: null as RoomType,

      //Keep track of the last query to determine if it changed or we're just
      //getting the next page so we can reset results
      currQuery: new String(),

      //Each entry in this array is a page of results from SpaceProvider
      currQueryResults: [] as SpaceProviderType[],
      // Copy of query results to be used by filter
      currQueryResultsCopy: [] as SpaceProviderType[],

      //Each entry in this array is a room availability calendar from BlockMap
      roomAvailability: [] as BlockMapType[],

      // Store status of room availability calendar loading
      roomAvailabilityLoading: false,

      // Stores the labels that have been toggled in Filter Menu
      toggledLabels: [] as string[],
      currentPage: 0
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
    },

    getDetailRoom: (state) => {
      return () => state.currDetailRoom
    }
  },

  actions: {
    setDetailRoom(room: RoomType) {
      this.currDetailRoom = room
    },

    toggleDetail() {
      this.showDetail = !this.showDetail
    },

    startNewQuery(query: string) {
      this.page = 0
      this.currQuery = query
      this.rooms = []
    }
  }
})
