<template>
    <div class="filter-bar" >
        <Dropdown :options="cities" v-model="selectedOption" placeholder="Select an option"/>
        <p>icon icon icon</p>
    </div>
</template>

<script>
    import Dropdown from 'primevue/dropdown';
    import { ref } from "vue";
    
    export default {
        name: "filter-bar",
        components: { Dropdown },
        setup() {
            const cities = ref([
                "ISB",
                "LGRT"
            ])
            const selectedOption = ref(null); 
            return { cities, selectedOption };
        }
    }
</script>

<style scoped>
    .filter-bar {
        background-color: blueviolet;
        color:white;
        position:fixed;
        bottom:0;
        width:100%;
        left:0;
        height: 20%;
    }
</style>
