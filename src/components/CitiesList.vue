<template>
    <h4>next update in {{formatedCountDownInMinutesSeconds}}</h4>
    <div>
        <h1>Liste des villes</h1>
        <City v-for="city of loadedData" :key="city.id" :name="city.name" :weather="city.weather" :temperature="city.temperature" :updated-at="city.updatedAt"></City>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import City from "./City.vue";
    import { useStore } from '../store';
    //import { mapState } from "vuex";

  export default defineComponent ({
    name: 'CitiesList',
    components: {
      City
    },
    setup() {
        const store = useStore();
        return {loadedData: store.state.weather}; 
    },
    computed: {
        formatedCountDownInMinutesSeconds(){
            const store = useStore();
                if(store.state.countDown > 60){
                    return `0${Math.floor(store.state.countDown / 60)} : ${store.state.countDown % 60}`
                } else {
                    return `${store.state.countDown} s`;
                }
        },
        //...mapState(['loadWeather']),
    } 
  })
</script>

<style scoped>
  h1 {
    margin: 40px 0 0;
  }
  h4 {
    position: absolute;
    margin: 50px; 
  }
</style>
