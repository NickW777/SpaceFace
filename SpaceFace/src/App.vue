<script setup lang="ts">
import RoomCard from "../components/RoomCard.vue";
import FilterBar from "../components/FilterBar.vue";
import { ref } from "vue";

const jsonData = {
  items: ['ILC 3rd Floor Library', 'LGRT', '301', '302', '303', '303', '303', '303', '303', '303', '303', '303', '303', '303']
}

const display = ref(true);

const toggleFilterVisibility = () => {
  display.value = !display.value;
}
</script>

<template>
<div class="header">
  <h1>StudySpace</h1>
  <div class="buttons">
    <button>Search</button>
    <button @click="toggleFilterVisibility">Filter</button>
  </div>
</div>
<div class="card-section">
  <RoomCard v-for="(item, index) in jsonData.items" :key="index" :title="item" />
</div>
<div class="filter" v-show="display">
  <FilterBar></FilterBar>
</div>
</template>

<style scoped>
  .header {
    background-color: blueviolet;
    position: fixed;
    width: 100%;
    top:0;
    left:0;
    text-align: center;
    color:white;
    overflow: hidden;
  }
  .header .buttons {
    display:flex;
    justify-content: space-between;
  }
  .card-section {
    margin-top: 100px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
</style>