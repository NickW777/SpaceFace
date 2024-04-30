<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import { watch, getCurrentInstance } from 'vue'
const props = defineProps<{
  images: string[]
  k: number
}>()

const show: boolean = props.k > 0
// console.log(show)
// console.log(props.k)
// watch(
//   () => props.images.length,
//   (newVal, oldVal) => {
//     console.log(`k changed from ${oldVal} to ${newVal}`)
//   }
// )
// console.log(props.images.length)
</script>

<template>
  <Swiper class="w-full h-[calc(40%+10px)]">
    <SwiperSlide v-for="image in props.images" :key="image">
      <img :src="image" class="w-full h-full object-cover" />
    </SwiperSlide>
  </Swiper>
  {{ k }}
</template>
