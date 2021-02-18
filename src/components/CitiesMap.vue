<template>
  <div>
    <h1>Carte des villes</h1>
    <div id="map" />
  </div>
</template>

<script>
  import axios from "axios";
  import mapboxgl from "mapbox-gl";
  import "mapbox-gl/dist/mapbox-gl.css";
  import { onMounted } from "vue";

  export default {
    name: 'CitiesMap',
    setup() {
      onMounted(() => {
        mapboxgl.accessToken ="pk.eyJ1IjoidmFsZW50aW5mbGd0IiwiYSI6ImNrbDk2ejJ5cDA2d24ycW9vc2YyNGY4azcifQ.UGvnn-BCyCcec2WSfteoBA";
        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [6.039280, 45.890053], // starting position [lng, lat]
          zoom: 12, // starting zoom
        });
        map.on('load', () => {
          let cities = [];
          axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
            .then(function (resp) {
              for (const {name, coord: {lat, lon}, weather: [{description: weather, icon: icon}], main: {temp: temperature}, dt: updatedAt} of resp.data.list) {
                cities.push({name, lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
              }
              cities.forEach(function(city) {
                let el = document.createElement('img');
                el.src = `https://openweathermap.org/img/wn/${city.icon}@2x.png`;
                el.classList.add('marker');
                el.title = `${city.name} - ${city.temperature}°C`;
                new mapboxgl.Marker(el)
                  .setLngLat([city.lon, city.lat])
                  .addTo(map);
              });
            });
        });
      });
      return {};
    },
  }
</script>

<style scoped>
  h1 {
    margin: 40px 0 0;
  }
  #map {
    height: 60vh;
  }

</style>
