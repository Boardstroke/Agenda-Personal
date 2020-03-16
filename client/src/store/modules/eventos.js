import EventoService from '@/services/EventoService';

const state = {
  events: [],
  eventSelected: {}
};

const getters = {
  getEventSelected(){
    return state.eventSelected;
  }
};

const actions = {
  getAllEvents: async({commit}) => {
    try{
      let snapshot = (await EventoService.index()).data;
      snapshot.forEach(event => {
        commit('setEvents', event);
      });
    }catch(error){
      console.log("Não foi possivel coletar eventos");
    }

  },

  createEvent: async({commit}, information) => {
    try {
      const event = await EventoService.criarEvento(information);
      commit.setEvents(event);
    } catch (error) {
      console.log("Não foi possivel criar Evento");
    }
  },

  deleteEvent: async({commit}, id) => {
    try {
      await EventoService.remove({"id" : id});
      commit('removeEvent', id);
    } catch (error) {
      console.log("Não foi possivel Excluir Evento");
    }
  },

  editEvent: async({commit}, informacao) => {
    try {
      const response = await EventoService.atualizar(informacao).data;
      commit("removeEvent", informacao.id);
      commit("setEvents", response.evento);
    } catch (error) {
      console.log("Não foi possivel editar Evento");
    }
  },

  getEventById: ({commit}, id) =>{
    const gettedEvent = state.events.filter(event => event.id == id)
    commit('selectEvent', gettedEvent);
  }
};

const mutations = {
  setEvents(state, event){
    const data_inicial =  new Date(event.data + " " + event.start);
    const data_final =  new Date(event.data + " " + event.end);
    const events = [];

    events.push({
      id: event.id,
      name: event.name,
      start: formatDate(data_inicial),
      end: formatDate(data_final),
      color: 'blue'
    });
    state.events = events;
  },

  removeEvent(state,id){
    state.events = state.events.filter(event => event.id != id);
  },

  selectEvent(state,event){
    state.eventSelected = event;
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