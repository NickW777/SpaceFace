import { defineStore } from 'pinia'
import { BlockMapType, RoomType, SpaceProviderType } from '../utils/ZodTypes'
import { Label } from '../utils/labels'

import { fetchSpaceProvider } from '../utils/query'

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

      currFilters: [] as string[],

      //Each entry in this array is a room availability calendar from BlockMap
      roomAvailability: [] as BlockMapType[]
    }
  },

  getters: {
    // yonas note: consider localizing to RoomAvailability component
    getRoomAvailability: (state) => {
      return (room: string) => state.roomAvailability[room]
    },

    getDetailRoom: (state) => {
      return () => state.currDetailRoom
    }
  },

  actions: {
    setDetailRoom(room: RoomType) {
      this.currDetailRoom = room
    },

    // Queries SpaceProvider and pushed the new rooms
    async updateRooms() {
      const response = await fetchSpaceProvider(
        this.currQuery.toString(),
        this.currFilters,
        ++this.page
      )
      const { page: paginationData, rooms: newRooms } = response
      this.hasMoreRooms = !paginationData.last_page
      this.rooms.push(...newRooms)
    },

    toggleDetail() {
      this.showDetail = !this.showDetail
    },

    clearRooms() {
      this.page = 0
      this.rooms = []
    }
  }
})
