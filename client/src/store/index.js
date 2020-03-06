import Vue from 'vue';
import Vuex from 'vuex';
import EventoService from '@/services/EventoService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],

  },
  getters:{
    indexEvents(state){
      return state.events;
    }
  },
  mutations: {
    setEvents(state, event){
      const data_inicial =  new Date(event.data + " " + event.start);
      const data_final =  new Date(event.data + " " + event.end);

      state.events.push({
        id: event.id,
        name: event.name,
        start: `${data_inicial.getFullYear()}-${data_inicial.getMonth() +1}-${data_inicial.getDate()} ${data_inicial.getHours()}:${data_inicial.getMinutes()}`,
        end: `${data_final.getFullYear()}-${data_final.getMonth() +1}-${data_final.getDate()} ${data_final.getHours()}:${data_final.getMinutes()}`,
        color: 'blue'
      });
    }
  },
  actions: {
    async updateEvents({commit}){
      let snapshot = (await EventoService.index()).data;

      snapshot.forEach(event => {
        commit('setEvents', event);
      });
    },
  },
});
