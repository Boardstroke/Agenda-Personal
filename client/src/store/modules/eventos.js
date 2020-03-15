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
  getAllEvents: async({commit}) => {
    let snapshot = (await EventoService.index()).data;
    snapshot.forEach(event => {
      commit('setEvents', event);
    });
  },

  deleteEvent: async({commit}, id) => {
    try {
      await EventoService.remove({"id" : id});
      commit('removeEvent');
    } catch (error) {
      console.log("Não foi possivel Excluir Evento");
    }
  }
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
  removeEvent(state,id){
    state.events.filter(event => event.id != id);
  }




};

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}


export default {
  state,
  getters,
  actions,
  mutations,
  namespaced:true
};