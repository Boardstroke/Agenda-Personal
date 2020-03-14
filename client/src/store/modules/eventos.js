import EventoService from '@/services/EventoService';

const state = {
  events: [],

};

const getters = {
  indexEvents(state){
    return state.events;
  }
};

const actions = {
  updateEvents: async({commit}) => {
    let snapshot = (await EventoService.index()).data;
    snapshot.forEach(event => {
      commit('setEvents', event);
    });
  },


};

const mutations = {
  setEvents(state, event){
    const data_inicial =  new Date(event.data + " " + event.start);
    const data_final =  new Date(event.data + " " + event.end);

    state.events.push({
      id: event.id,
      name: event.name,
      start: formatDate(data_inicial),
      end: formatDate(data_final),
      color: 'blue'
    });
  },


};

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}


export default {
  state,
  getters,
  actions,
  mutations
};