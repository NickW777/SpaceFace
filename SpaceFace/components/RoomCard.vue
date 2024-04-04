<template>
<div class="room-card">
  <Card>
    <template #header>
      <img class="card-img" alt="ILC" src="../images/ILC.jpeg"/>
    </template>
    <template #title> {{title}} </template>
    <template #footer>
      <p>Outlets: Yes</p>
    </template>
  </Card>
</div>
</template>

<script>
import Card from "primevue/card";
export default {
  props:['title'],
  components: {
    Card
  }
};
</script>

<style scoped>
  .room-card {
    background-color: rgb(170, 170, 170);
    max-width: 50%;
    border-radius: 20px;
    text-align: center;
  }
  .card-img {
    max-width: 80%;
  }
</style>