import axios from 'axios';
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore, } from 'vuex';

/// define your typings for the store state
export interface State {
    weather: Array<Object>,
    selectedCities: Array<Object>,
    countDown: number,
    temperature: number,
    selectedCitiesNames:Array<String>,
  }
  
  // define injection key
  export const key: InjectionKey<Store<State>> = Symbol()
  
  export const store = createStore<State>({
    strict: true,
    state: {
      weather: [],
      countDown: 30,
      temperature: 0,
      selectedCities: [],
      selectedCitiesNames: []
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
            state.selectedCities.length = 0;
        },
        countDown (state) {
            state.countDown--;
        },
        resetCountDown (state) {
            state.countDown = 30;
        },
        clearSelectedCities (state) {
            state.selectedCities.length = 0;
        },
        updateTemperature (state, temperature) {
            state.temperature = temperature;
        },
        loadCity (state, payload) {
            state.selectedCities.push(payload.data);
        },
        loadCityName (state, payload) {
            state.selectedCitiesNames.push(payload);
        },
        deleteCity (state, payload) {
            state.selectedCities.splice(payload, 1);
            state.selectedCitiesNames.splice(payload, 1);
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
        reloadSelectedCities({dispatch, state}) {
            if(state.selectedCities.length < 1 || state.countDown < 1 ) {
                state.selectedCitiesNames.forEach(cityName => {
                    dispatch('loadCityAsync', cityName)
                });
                console.log("Data loaded from OWM API!");
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
            dispatch('reloadSelectedCities')
                .then(() => {
                    commit('resetCountDown');
                });
        },
        loadCityAsync ({commit}, payload) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${process.env.VUE_APP_OW_APP_ID}`)
            .then( (resp) => {
                commit('loadCity', resp)
            })
        },
    }
  })

  // define your own `useStore` composition function
    export function useStore () {
        return baseUseStore(key)
    }