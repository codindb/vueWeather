<template>
  <div class="cityComponent">
    <h2>{{name}}</h2>
    <img v-bind:src="`https://openweathermap.org/img/wn/${icon}.png`" alt="weather icon" width="70" height="70">
    <p>Weather : {{weather}} - Temperature : {{temperature}}°C</p>
    <p><em>last update : {{currentDateTime()}}</em></p>
    <button @click='handleClick'>Delete</button>
    
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import moment from 'moment';
    import { useStore } from '../store'

  export default defineComponent ({
    name: 'City',
    props: {
        icon: String,
      name: String,
      weather: String,
      temperature: Number,
      updatedAt: [String, Date, Number],
    },
    setup(props) {
        const store = useStore();
        const handleClick = () => {
            const cities = store.state.selectedCities;
            cities.forEach(city => {
                let parsedCity = JSON.parse(JSON.stringify(city));
                if (parsedCity.name === props.name) {
                    let index = cities.indexOf(city);
                    store.commit('deleteCity', index);
                    store.commit('deleteCityName', parsedCity.name)
                }
            });
        }
        return { handleClick }
    },
    methods: {
        currentDateTime() {
            //moment.locale("fr");
            return moment(this.updatedAt).fromNow();
        },
    },
  });
</script>

<style scoped lang="scss">
  h2 {
    padding: 20px 0 0;
    color: white;
  }
  .cityComponent {
      width: 40%;
      margin: 0 auto;
      background-color: $blue;
      border-radius: 30px;
  }
  button {
      margin-bottom: 20px;
  }
  p {
      color: white;
  }
  img {
      margin-top: -30px;
      margin-bottom: -20px;
  }
</style>
