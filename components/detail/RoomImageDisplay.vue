<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
const props = defineProps<{
  images: string[]
  notFound: string
}>()
</script>

<template>
  <Swiper class="w-full h-[calc(40%+10px)]">
    <SwiperSlide v-if="props.images?.[0]" v-for="image in props.images" :key="image">
      <img :src="image" class="w-full h-full object-cover" />
    </SwiperSlide>

    <SwiperSlide v-else>
      <img :src="props.notFound" class="w-full h-full object-cover" />
    </SwiperSlide>
  </Swiper>
</template>
