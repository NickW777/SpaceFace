<script setup lang="ts">
import { ref } from 'vue'
import { useRoomPage } from './useRoomPage'
import { useRoomStore } from '../../store/rooms'
import RoomCard from './RoomCard.vue'
import RoomCardSkeleton from './RoomCardSkeleton.vue'
import { type RoomType } from '../../utils/ZodTypes'
import { isAvailable } from '../shared/isAvailable'

const roomStore = useRoomStore()

const toggleDetail = async (room: RoomType) => {
  roomStore.setDetailRoom(room)
  roomStore.toggleDetail()
}

const bar = ref()

const { rooms, loading } = useRoomPage<HTMLElement>(bar)

function getText(room:RoomType):string {
  const availability = isAvailable(room.availability);
  if (availability.open && availability.until == Infinity) {
    return "No more classes today"
  }

  const hoursRemaining = Math.floor(availability.timeRemaining / 100)
  const minutesRemaining = availability.timeRemaining % 100
  const timeRemaining = (hoursRemaining + minutesRemaining / 60).toFixed(1)

  let hoursUntil = Math.floor(availability.until/100)
  const minutesUntil = availability.until%100 < 10 ? "0" +  availability.until%100 : "" + availability.until%100;
  const meridiem = hoursUntil < 12 ? "am" : "pm";
  if (hoursUntil > 12) hoursUntil -= 12;

  if (availability.open) {
    return "Available for " + timeRemaining + " hours (until " + hoursUntil + ":" + minutesUntil + meridiem + ")";
  } else {
    return "Closed for " + timeRemaining + " hours (until " + hoursUntil + ":" + minutesUntil + meridiem + ")";
  }
}
</script>

<template>
  <div class="flex flex-wrap overflow-auto py-3 px-2 relative w-full">
    <div v-for="room in rooms" :key="room._id" class="w-1/2 px-1 pb-2">
      <RoomCard
        @click.stop="toggleDetail(room)"
        :building="room.building"
        :room="room.room"
        :thumbnail="room.thumbnail || '/images/imageNotFound.jpg'"
        :availability="getText(room)"
        :labels="room.labels"
      />
    </div>

    <div v-if="loading" v-for="i in 10" :key="i" class="w-1/2 px-1 pb-2">
      <RoomCardSkeleton />
    </div>

    <div v-show="!loading" ref="bar" style="width: 100%; height: 20px"></div>
  </div>
</template>
