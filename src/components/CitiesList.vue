<template>
  <div>
    <h1>Liste des villes</h1>
    <City v-for="city of loadedData" :key="city.id" :name="city.name" :weather="city.weather" :temperature="city.temperature" :updated-at="city.updatedAt"></City>
    
  </div>
</template>

<script lang="ts">
  // import axios from "axios";
  import { defineComponent } from "vue";
  import City from "./City.vue";
  import { useStore } from '../store';

  export default defineComponent ({
    name: 'CitiesList',
    components: {
      City
    },
    setup() {
        const store = useStore();
        store.commit('loadWeather');
        return {loadedData: store.state.weather}; 
    }
  })
</script>

<style scoped>
  h1 {
    margin: 40px 0 0;
  }
</style>
