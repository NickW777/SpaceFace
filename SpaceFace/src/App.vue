<script setup lang="ts">
import RoomCard from "../components/RoomCard.vue";

const jsonData = {
  items: ['ILC 3rd Floor Library', 'LGRT', '301', '302', '303', '303', '303', '303', '303']
}
</script>

<template>
<div class="header">
  <h1>StudySpace</h1>
</div>
<div class="card-section">
  <RoomCard v-for="(item, index) in jsonData.items" :key="index" :title="item" />
</div>
</template>

<style scoped>
  .header {
    background-color: blueviolet;
    position: absolute;
    width: 100%;
    text-align: center;
    color:white;

  }
  .card-section {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  body {
    overflow-x: hidden;
  }
</style>