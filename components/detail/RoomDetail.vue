<script setup lang="ts">
import { ref } from 'vue'
import { useTimeAgo } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useRoomStore } from '../../store/rooms'
import RoomLabel from '../shared/RoomLabel.vue'
import LargeCircularButton from '../shared/LargeCircularButton.vue'
import BackNavigate from '../detail/BackNavigate.vue'
import RoomAvailability from './RoomAvailability.vue'
import RoomImageDisplay from './RoomImageDisplay.vue'
import RectButton from '../shared/RectButton.vue'

const roomStore = useRoomStore()
const { showDetail } = storeToRefs(roomStore)

const favorite = ref(false)

const labels = ['OUTLETS', 'NO_OUTLETS', 'WHITEBOARD', 'CHALKBOARD'] as const

// replace this with last_edited from space provider
const lastEdited = useTimeAgo(Date.now())
const room = 'ILC-N151'

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
</script>

<template>
  <div class="w-screen h-screen">
    <BackNavigate @click.stop="roomStore.toggleDetail()" />

    <!-- images carousel - implement this with swiper.js! -->
    <RoomImageDisplay
      :images="[
        '/images/ILC.jpeg',
        'https://www.umass.edu/cp/sites/default/files/Integrative%20Learning%20Center%20%28ILC%29_02.jpg',
        'https://www.umass.edu/cp/sites/default/files/Integrative%20Learning%20Center%20%28ILC%29_04.jpg'
      ]"
    />

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
          <h1 class="text-5xl font-bold">ILC N151</h1>

          <!-- availability -->
          <span class="text-2xl font-light"> Study Here Until 10pm </span>
        </div>

        <!-- large action buttons -->
        <div class="flex flex-col gap-2">
          <LargeCircularButton icon="map-outline" class="bg-study-space-light text-white" />

          <LargeCircularButton
            @click.stop="favorite = !favorite"
            :icon="favorite ? 'star' : 'star-outline'"
            class="bg-favorite text-white"
          />
        </div>
      </div>

      <!-- availability detail -->
      <RoomAvailability
        availability="replace me with some data from block map!"
        class="mt-[90px]"
      />

      <div class="px-2 mb-10">
        <!-- additional info -->
        <div class="my-8 flex justify-between">
          <div class="text-2xl font-semibold">
            <div>Capacity</div>
            <div class="font-light">200</div>
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
