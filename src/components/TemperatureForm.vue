<template>
  <div id="v-model-select" class="demo">
    <h4>Pick a temperature to filter</h4>
    <select v-model="temperature">
      <option v-for="temperature of options" :key="temperature.id" :value="temperature.value">
          {{temperature.value}} °C
      </option>
    </select>
    <br/>
    <br/>
    <!-- <span>Selected: {{ temperature }} °C</span> -->
  </div>
</template>

<script lang="ts">
import {defineComponent, onUpdated, ref} from "vue";
import { useStore } from '../store';

export default defineComponent({
  name: "TemperatureForm",
  data() {
    return {
      options: [
          { id: 1, value: 0},
          { id: 2, value: 10},
          { id: 3, value: 15},
          { id: 4, value: 20},
      ]
    }
  },
  setup() {
        const store = useStore();
        const temperature = ref(0);
        onUpdated(()=> {
            store.commit('updateTemperature', temperature.value)
            // console.log(temperature.value);
        })
        return {temperature}
    },
})
</script>

<style scoped lang="scss">

.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
  width: 100%;
}

</style>