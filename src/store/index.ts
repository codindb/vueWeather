import axios from 'axios';
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore, } from 'vuex';

/// define your typings for the store state
export interface State {
    weather: Array<Object>,
    countDown: number,
  }
  
  // define injection key
  export const key: InjectionKey<Store<State>> = Symbol()
  
  export const store = createStore<State>({
    state: {
      weather: [],
      countDown: 120,
    },
    mutations: {
        initialiseStore(state){
            if(localStorage.getItem('store')){
                this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store') || '{}'))
				);
            }
        },
        loadWeather (state, payload) {
            for (const {name, coord: {lat, lon}, weather: [{description: weather, icon: icon}], main: {temp: temperature}, dt: updatedAt} of payload) {
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
            state.countDown = 120;
        }
    },
    actions: {
        loadWeatherAsync ({commit, state}) {
            if(state.weather.length < 1 || state.countDown < 1 ) {
                axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                    .then( (resp) => {
                        commit('loadWeather', resp.data.list);
                        console.log("Data loaded from OWM API!");
                        })
            } else {
                console.log(`data will be reloaded in ${state.countDown} s`);
            }
        },
        countDownAsync({commit, dispatch, state}) {
            setInterval(() => {
                commit('countDown');
                if(state.countDown < 1){
                    dispatch('refreshDataAsync')
                }
            }, 1000);
        },
        refreshDataAsync({commit, dispatch}) {
            commit('unloadData')
            dispatch('loadWeatherAsync')
                .then(() => {
                    commit('resetCountDown');
                });
        }
    }
  })

  // define your own `useStore` composition function
    export function useStore () {
        return baseUseStore(key)
    }