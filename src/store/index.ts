import axios from 'axios';
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore, } from 'vuex';

/// define your typings for the store state
export interface State {
    count: number,
    weather: Array<Object>,
  }
  
  // define injection key
  export const key: InjectionKey<Store<State>> = Symbol()
  
  export const store = createStore<State>({
    state: {
      count: 0,
      weather: [],
    },
    mutations: {
        increment (state) {
          state.count++
        },
        loadWeather (state) {
            axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
            .then(function (resp) {
              for (const {name, coord: {lat, lon}, weather: [{description: weather, icon: icon}], main: {temp: temperature}, dt: updatedAt} of resp.data.list) {
                state.weather.push({name, lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
              }
            });
        }
    },
  })

  // define your own `useStore` composition function
    export function useStore () {
        return baseUseStore(key)
    }