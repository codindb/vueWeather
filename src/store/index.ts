import axios from 'axios';
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore, } from 'vuex';

/// define your typings for the store state
export interface State {
    count: number,
    weather: Array<Object>,
    countDown: number,
  }
  
  // define injection key
  export const key: InjectionKey<Store<State>> = Symbol()
  
  export const store = createStore<State>({
    state: {
      count: 0,
      weather: [],
      countDown: 300,
    },
    mutations: {
        increment (state) {
          state.count++
        },
        loadWeather (state, payload) {
            for (const {name, coord: {lat, lon}, weather: [{description: weather, icon: icon}], main: {temp: temperature}, dt: updatedAt} of payload.data.list) {
                state.weather.push({name, lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
              }
        },
        unloadData (state) {
            state.weather.length = 0;
        },
        countDown (state) {
            state.countDown--;
        },
        resetCountDown (state) {
            state.countDown = 300;
        }
    },
    actions: {
        loadWeatherAsync ({commit}) {
            axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
            .then( (resp) => {
              commit('loadWeather', resp);
            })
        },
        countDownAsync({commit}) {
            setInterval(countDown, 1000);
            function countDown(){
                commit('countDown');
            }
        },
        refreshDataAsync({commit, dispatch}) {
            setInterval(refreshDataEvery5Minutes, 5000);
            function refreshDataEvery5Minutes(){
                commit('unloadData');
                dispatch('loadWeatherAsync').then(()=>{
                    commit('resetCountDown');
                });
            }

        }
        
    }
  })

  // define your own `useStore` composition function
    export function useStore () {
        return baseUseStore(key)
    }