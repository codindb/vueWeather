<template>
  <div>
      <div class="namePlusButton">
        <h2>{{name}}</h2>
        <button @click='handleClick'>Delete</button>
      </div>
    
    <p>Temps : {{weather}} - Température : {{temperature}}°C</p>
    <p><em>Dernière mise à jour : {{currentDateTime()}}</em></p>
    
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import moment from 'moment';
    import { useStore } from '../store'

  export default defineComponent ({
    name: 'City',
    props: {
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
                }
            });
        }
        return { handleClick }
    },
    methods: {
        currentDateTime() {
            moment.locale("fr");
            return moment(this.updatedAt).fromNow();
        },
    },
  });
</script>

<style scoped lang="scss">
  h1 {
    margin: 40px 0 0;
  }
  .namePlusButton {
      display: inline-flex;
  }
  button {
      height: 30px;
      margin-top: 20px;
      margin-left: 20px;
  }
</style>
