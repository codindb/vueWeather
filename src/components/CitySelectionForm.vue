<template>
  <div id="v-model-select" class="demo">
    <h4>Type in a city name to add</h4>
    <input v-model.lazy="cityName" placeholder="City name">
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
            if(cityName.value.length > 0){
                store.commit('loadCityName', cityName.value);
                store.dispatch('loadCityAsync', cityName.value)
                .then(()=>{
                    cityName.value = '';
                });
            }
        })
        return {cityName}
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