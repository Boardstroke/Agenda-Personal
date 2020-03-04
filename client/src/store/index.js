import Vue from 'vue';
import Vuex from 'vuex';
import EventoService from '@/services/EventoService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],

  },
  getters:{

  },
  mutations: {
    setEvents(state, events){
      state.events = events;
    }
  },
  actions: {
    async updateEvents({commit}){
      let events = [];
      let snapshot = (await EventoService.index()).data;

      snapshot.forEach(event => {
        events.push({
          id: event.id,
          name: event.name,
        });
      });
      commit('setEvents', events);
    },

    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },

    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    }
  },
});
