<script setup lang="ts">
import InputText from 'primevue/inputtext';

const jsonData = {
  items: [
    "item",
    "item",
    "item",
    "item"
  ]
}
</script>



<template>
  <div class="about">
    <InputText></InputText>
    <ul>
      <li v-for="(item, index) in jsonData.items" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
