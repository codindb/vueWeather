<template>
  <div style="height: 75vh; width: 100vw;">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[45.890053, 6.039280]"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      <l-marker v-for="city in loadedData" :lat-lng="[city.coord.lat, city.coord.lon]" :key="city.name">
        <l-icon :icon-url="`https://openweathermap.org/img/wn/${city.weather[0].icon}.png`" :icon-size="iconSize" />
		<l-tooltip >
			{{city.name}} - {{(city.main.temp - 273.15).toFixed(2)}}°C
		</l-tooltip>
      </l-marker>
    </l-map>
  </div>
  <h4>next update in {{formatedCountDownInMinutesSeconds}}</h4>
</template>

<script lang="ts">
  import {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
	LTooltip,
  LPopup,
  } from "@vue-leaflet/vue-leaflet";
  import "leaflet/dist/leaflet.css";
  import { defineComponent} from "vue";
	//import { mapState } from "vuex";
  import { useStore } from '../store';

  export default defineComponent ({
    name: 'CitiesMap',
	components: {
      LMap,
      LTileLayer,
      LMarker,
      LIcon,
	LTooltip,
  LPopup,
    },
	data() {
      return {
        zoom: 6,
      }
    },
	setup() {
        const store = useStore();
        return {loadedData: store.state.selectedCities}; 
    },
	computed: {
      iconSize() {
        return [50, 50];
      },
	formatedCountDownInMinutesSeconds(){
            const store = useStore();
                if(store.state.countDown > 60){
                    return `0${Math.floor(store.state.countDown / 60)} : ${store.state.countDown % 60}`
                } else {
                    return `${store.state.countDown} s`;
                }
	},
        //...mapState(['loadWeather']),
    },
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
</style>
