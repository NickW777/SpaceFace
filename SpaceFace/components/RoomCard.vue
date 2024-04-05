<template>
<div class="room-card">
  <Card>
    <template #header>
      <img class="card-img" alt="ILC" src="../images/ILC.jpeg"/>
    </template>
      <template #title> <div class="title">{{title}}</div> </template>
    <template #content>Available for 1 hour</template>
    <template #footer>
      <p>icon icon icon star</p>
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
    background-color: rgb(230, 230, 230);
    max-width: 45%;
    border-radius: 20px;
    text-align: center;
    margin: 8px;
    padding-top: 10px;
  }
  .card-img {
    max-width: 95%;
    border-radius: 10px;
  }
  .title {
    font-size: 15px;
    font-weight: bold;
  }
</style>