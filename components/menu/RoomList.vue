<script setup lang="ts">
import { computed, ref, onMounted, watch} from 'vue'
import RoomCard from './RoomCard.vue'
import RoomCardSkeleton from './RoomCardSkeleton.vue'
import { useRoomStore } from '../../store/rooms'
import { storeToRefs } from 'pinia'
import { fetchBlockMap, fetchCompleteSpaceProvider } from '../../utils/query'
import { RoomType } from '../../utils/ZodTypes'

const roomStore = useRoomStore()
const { appStarted } = storeToRefs(roomStore)

// adding this because your loading system will eventually need to be speced out a bit more than just appStarted. Use intersection observers to indicate when new data needs to be loaded.
const loading = computed(() => !appStarted.value)


// you have to clean this up. Your app shouldn't be crashing if the data is not there.
const rooms = computed(() => roomStore.getPage(roomStore.getPageCount() - 1)?.rooms || []);
const observer = ref(null);
const lastElement = ref(null);


// yonas note: this was inlined inside the template, this breaks the declarative nature of Vue. It's better to have this in the script setup
const toggleDetail = async (room: RoomType) => {
  roomStore.setDetailRoom(room)
  //Open the room detail view
  roomStore.toggleDetail()

  //Don't query BlockMap if that room has already been queried
  if (roomStore.getRoomAvailability('BART_0065') === undefined) {
    roomStore.startLoadingRoomAvailability()
    const data = await fetchBlockMap('BART_0065')
    roomStore.storeRoomAvailability(data)
  }
}

const loadMoreRooms = () => {
  if (!loading.value && roomStore.getPageCount() > 0) {
    roomStore.fetchNextPage();
  }
};
onMounted(() => {
  observer.value = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      loadMoreRooms();
    }
  }, {
    threshold: 1.0
  });
  if (lastElement.value) {
    observer.value.observe(lastElement.value);
  }
});

watch(() => lastElement.value, (newValue, oldValue) => {
  if (oldValue) {
    observer.value.unobserve(oldValue);
  }
  if (newValue) {
    observer.value.observe(newValue);
  }
});
</script>

<template>
  <div class="flex flex-wrap overflow-auto py-3 px-2 relative w-full">
    <div v-for="room in rooms" :key="room._id" class="w-1/2 px-1 pb-2">
      <RoomCard
        @click.stop="toggleDetail(room)"
        :building="room.building"
        :room="room.room"
        :thumbnail="room.images?.[0] || '/images/imageNotFound.jpg'"
        availability="Available For Another 3 Hours (Until 5pm)"
        :labels="room.labels"
      />
    </div>

    <div v-if="loading" v-for="i in 50" :key="i" class="w-1/2 px-1 pb-2">
      <RoomCardSkeleton />
    </div>
    <div ref="lastElement" class="w-full h-10"></div>
  </div>
</template>
