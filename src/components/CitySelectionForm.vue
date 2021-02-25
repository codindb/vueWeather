<template>
  <div id="v-model-select" class="demo">
    <input v-model.lazy="cityName" placeholder="Type in city name">
    <p>added city : {{ cityName }}</p>
    <br/>
    <br/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onUpdated, ref} from "vue";
import { useStore } from '../store';

export default defineComponent({
  name: "CitiySelectionForm",
  setup() {
        const store = useStore();
        const cityName = ref("");
        onUpdated(()=> {
            store.dispatch('loadCityAsync', cityName.value)
            // console.log(cityName.value);
        })
        return {cityName}
    },
})
</script>

<style scoped>

.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

</style>