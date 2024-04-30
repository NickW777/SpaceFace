<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
const props = defineProps<{
  images: string[]
}>()
</script>

<template>
  <Swiper class="w-full h-[calc(40%+10px)]">
    <SwiperSlide v-for="image in props.images" :key="image">
      <img :src="image" class="w-full h-full object-cover" />
    </SwiperSlide>
  </Swiper>
</template>
