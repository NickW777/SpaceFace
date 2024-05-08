<script setup lang="ts">
import RoomLabel from '../shared/RoomLabel.vue'
import { LABEL_DISPLAY } from '../../utils/labels'
import { ref } from 'vue'
import { useRoomStore } from '../../store/rooms'
import { emit } from 'process'
import { SpaceProviderType } from '../../utils/ZodTypes'

const props = defineProps({
    isVisible: Boolean
})

const checkedLabels = ref([]);
const roomStore = useRoomStore();


const handleFilter = () => {
    roomStore.rooms = roomStore.roomsCopy.filter(room => 
        checkedLabels.value.every(label => room.labels.includes(label))
    )
}
</script>

<template>
    <div v-if="isVisible">
        <div class="fixed inset-0 z-50 flex justify-center items-center text-black">
            <div class="flex flex-col max-w-5xl rounded-lg shadow-lg bg-white">
                <!-- Header -->
                <div class="p-5">
                    <div class="flex justify-between items-start">
                        <h3 class="text-xl">Filter Rooms</h3>
                        <button class="p-1 leading-none">
                            <span class="text-xl font-semibold h-6 w-6" @click="$emit('cancel')">x</span>
                        </button>
                    </div>
                </div>
                <!-- Body -->
                <div class="p-6">
                    <form>
                        <div v-for="label in Object.keys(LABEL_DISPLAY)" :key="label" class="flex flex-row m-2">
                            <input type="checkbox" :id="label" :value="label" v-model="checkedLabels" @change="handleFilter"/>
                            <label class="flex flex-row" :for="label">
                                <RoomLabel
                                    :label = "label"
                                    class="mr-2 ml-2"
                                />
                                {{ label }}
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
</template>


<style></style>