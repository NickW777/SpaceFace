<script setup lang="ts">
const props = defineProps<{
  start: number
  end: number
}>()

const startTime = ('' + start).slice(-2)
const endTime = ''
</script>

<template>
  <div class="h-12 w-full bg-red-400 rounded-xl">
    <h1 class="center">{{ start }} to {{ end }}</h1>
  </div>
</template>

<style scoped>
.center {
  margin: auto;
  text-align: center;
  padding: 10px;
}
</style>
