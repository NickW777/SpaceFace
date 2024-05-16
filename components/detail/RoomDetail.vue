<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { useRoomStore } from '../../store/rooms'
import RoomLabel from '../shared/RoomLabel.vue'
import LargeCircularButton from '../shared/LargeCircularButton.vue'
import BackNavigate from '../detail/BackNavigate.vue'
import RoomAvailability from './RoomAvailability.vue'
import RoomImageDisplay from './RoomImageDisplay.vue'
import RectButton from '../shared/RectButton.vue'

const { currDetailRoom } = storeToRefs(useRoomStore())
const { toggleDetail, getRoomAvailability } = useRoomStore()

const favorite = ref(false)

const labels = currDetailRoom.value.labels
const capacity = currDetailRoom.value.capacity
const lastEdited = new Date(currDetailRoom.value.last_edited).toLocaleDateString()
const room = currDetailRoom.value.building + ' ' + currDetailRoom.value.room
const images = currDetailRoom.value.images
const gps_coords = currDetailRoom.value.gps_coords
const accessNotes = currDetailRoom.value.access_notes
const availability = currDetailRoom.value.availability

const fileIssue = (type: 'issue' | 'feedback') => {
  const title = type === 'issue' ? 'Report Issue' : 'Feedback'
  const titleQuery = `title=${title} (${room})`
  const labelsQuery = `labels=user%20${type}`
  const spaceFaceTeam = ['yonava', 'NickW777', 'wsau2', 'shruts046']
  const assigneesQuery = `assignees=${spaceFaceTeam.join(',')}`
  const query = `?${titleQuery}&${labelsQuery}&${assigneesQuery}`
  const issueUrl = `https://github.com/NickW777/SpaceFace/issues/new${query}`
  window.open(issueUrl, '_blank')
}

const editRoom = () => {
  // get from pinia store
  window.open(`https://spaceprovider.up.railway.app/admin?room=${room}`, '_blank')
}
const googleMaps = () => {
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${gps_coords.coordinates[1]}%2C${gps_coords.coordinates[0]}`,
    '_blank'
  )
}

onMounted(async () => {
  if (currDetailRoom.value.images.length > 1) return console.log('Images already loaded')

  const url = `https://spaceprovider.up.railway.app/api/v1?room=${currDetailRoom.value.building}-${currDetailRoom.value.room}`

  await axios.get(url).then((res) => {
    if (!res?.data?.images) return console.error('No images found for this room')
    for (let i = 0; i < res.data.images.length; i++) {
      currDetailRoom.value.images.push(res.data.images[i])
    }
  })
})
</script>

<template>
  <div class="w-screen h-screen">
    <BackNavigate @click.stop="toggleDetail()" />

    <!-- images carousel - implement this with swiper.js! -->
    <RoomImageDisplay :images="images" notFound="/images/imageNotFound.jpg" />

    <!-- popover tab -->
    <div
      class="z-50 absolute w-full h-[60%] bg-white rounded-t-xl -translate-y-[10px] p-4 overflow-auto"
    >
      <div class="px-2 flex justify-between">
        <!-- title content -->
        <div>
          <!-- labels -->
          <div class="flex gap-1 py-2">
            <RoomLabel v-for="label in labels" :key="label" :label="label" />
          </div>

          <!-- title -->
          <h1 class="text-5xl font-bold">{{ room }}</h1>

          <!-- availability -->
          <span class="text-2xl font-light"> Study Here Until 10pm </span>
        </div>

        <!-- large action buttons -->
        <div class="flex flex-col gap-2">
          <LargeCircularButton
            @click.stop="googleMaps"
            icon="map-outline"
            class="bg-study-space-light text-white"
          />

          <LargeCircularButton
            @click.stop="favorite = !favorite"
            :icon="favorite ? 'star' : 'star-outline'"
            class="bg-favorite text-white"
          />
        </div>
      </div>

      <!-- Access notes -->
      <p class="font-light px-2">{{ accessNotes }}</p>

      <!-- availability detail -->
      <RoomAvailability
        :building="currDetailRoom.building"
        :room="currDetailRoom.room"
        class="mt-[90px]"
      />


      <div class="px-2 mb-10">
        <!-- additional info -->
        <div class="my-8 flex justify-between">
          <div class="text-2xl font-semibold">
            <div>Capacity</div>
            <div class="font-light">{{ capacity }}</div>
          </div>

          <div class="text-2xl font-semibold text-right">
            <div>Last Edited</div>
            <div class="font-light capitalize">
              {{ lastEdited }}
            </div>
          </div>
        </div>

        <RectButton @click.stop="editRoom" class="bg-blue-500 text-white w-full mb-2" icon="pencil">
          Edit This Room
        </RectButton>

        <div class="flex gap-2">
          <RectButton
            @click.stop="fileIssue('feedback')"
            icon="message"
            class="bg-study-space text-white"
          >
            Feedback
          </RectButton>
          <RectButton @click.stop="fileIssue('issue')" icon="alert" class="bg-red-500 text-white">
            Report Issue
          </RectButton>
        </div>
      </div>
    </div>
  </div>
</template>
