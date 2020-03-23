import ClienteService from '@/services/ClienteService';

const state ={
  menu: false,
  clientes: []
};

const mutations = {
  fecharMenu(){
    state.menu = false;
  },
  abrirMenu(){
    state.menu = true;
  },
  setClientes(state, payload){
    console.log(payload);
    state.clientes.push(payload);
  },

};

const actions = {
  fecharMenu({commit},){
    commit('fecharMenu');
  },
  abrirMenu({commit}){
    commit('abrirMenu');
  },

  index: async({commit}) =>{
    try{
      const response = (await ClienteService.index()).data;

      response.forEach(payload => {
        // console.log(payload);
        commit("setClientes", payload);
      });
    }catch(error){
      console.log(error);
    }
  },

  criarCliente: async({commit}, cliente) =>{
    try {
      const response = (await ClienteService.criarCliente(cliente)).data;
      commit('setClientes', response );
    } catch (error) {
      console.log(error);
    }

  }

};

export default {
  state,
  mutations,
  actions,
  namespaced: true
}