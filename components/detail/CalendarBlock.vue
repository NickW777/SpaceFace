<script setup lang="ts">
const props = defineProps<{
  start: number
  end: number
}>()

function formatTime(time: number): string {
  let min = ('' + time).slice(-2)
  let hr = ('' + time).slice(0, -2)
  let cat = ''

  if (parseInt(hr) > 12) {
    hr = '' + (parseInt(hr) - 12)
    cat = ' PM'
  } else if (parseInt(hr) === 12) {
    cat = ' PM'
  } else if (parseInt(hr) === 0) {
    hr = '12'
    cat = ' AM'
  } else {
    cat = ' AM'
  }

  return hr + ':' + min + cat
}

const startTime = formatTime(props.start)
const endTime = formatTime(props.end)
</script>

<template>
  <div class="h-10 w-full bg-red-400 rounded-xl">
    <h1 class="center font-semibold">{{ startTime }} to {{ endTime }}</h1>
  </div>
</template>

<style scoped>
.center {
  margin: auto;
  text-align: center;
  padding: 10px;
}
</style>
