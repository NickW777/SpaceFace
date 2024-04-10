<script setup lang="ts">
defineProps<{
  images: string[]
}>()
</script>

<template>
    <swiper-container
      class="w-full h-[calc(40%+10px)]"
    >
        <swiper-slide
          v-for="image in images"
          :key="image"
        >
          <img
            :src="image"
            class="w-full h-full object-cover"
          />
        </swiper-slide>
    </swiper-container>
</template>