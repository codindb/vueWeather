<template>
    <div class="form">
        <CitySelectionForm> </CitySelectionForm>
        <TemperatureForm> </TemperatureForm>
    </div>
    <h4>next update in {{formatedCountDownInMinutesSeconds}}</h4>
    <div class="list">
        <h1>Liste des villes ({{selectedCities.length}})</h1>
        <City v-for="city of selectedCities" :key="city.id" :name="city.name" :weather="city.weather[0].description" :temperature="parseInt((city.main.temp - 273.15),10)" :updated-at="city.dt*1000"></City>
        <!-- <h1>Liste des villes ({{loadedData.length}})</h1>
        <City v-for="city of loadedData" :key="city.id" :name="city.name" :weather="city.weather" :temperature="city.temperature" :updated-at="city.updatedAt"></City> -->
    </div>
    
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import City from "./City.vue";
    import TemperatureForm from "./TemperatureForm.vue";
    import CitySelectionForm from "./CitySelectionForm.vue";
    import { useStore } from '../store';

  export default defineComponent ({
    name: 'CitiesList',
    components: {
      City,
      TemperatureForm,
      CitySelectionForm,
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
        loadedData(){
            const store = useStore();
            const cities = store.state.weather;
            const filteredCities: Array<Object> = [];
            cities.forEach(city => {
                let parsedCity = JSON.parse(JSON.stringify(city));
                if (parsedCity.temperature > store.state.temperature){
                    filteredCities.push(parsedCity)
                } 
            });        
            return filteredCities;
        },
        selectedCities() {
            const store = useStore();
            const cities = store.state.selectedCities;
            const filteredCities: Array<Object> = [];
            cities.forEach(city => {
                let parsedCity = JSON.parse(JSON.stringify(city));
                if ((parsedCity.main.temp - 273.15) > store.state.temperature){
                    filteredCities.push(parsedCity)
                }
            });
            return filteredCities;
        }
    }
  })
</script>

<style scoped lang="scss">
  h1 {
    margin: 40px 0 0;
  }
  h4 {
    position: absolute;
    margin: 50px; 
  }
  input {
      margin-top: 30px;
  }
  .list{
      margin-bottom: 30px;
  }
  .form {
      position: absolute;
      width: 20%;
      padding-top: 10%;
      padding-left: 50px;
  }
</style>
