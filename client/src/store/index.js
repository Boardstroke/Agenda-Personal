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
          start: this.formatDate(new Date(event.data + " " + event.start), true),
          end: this.formatDate(new Date(event.data + " " + event.end), true),
          color: this.colors[this.rnd(0, this.colors.length - 1)]
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
