import Api from './Api';

export default {
  index() {
    return Api().get('agenda/eventos');
  },
  criarEvento(informacao){
    return Api().post('agenda/criar', informacao);
  },
  remove(id){
    return Api().post('agenda/remove', id);
  },
  selecionarEventoPorId(id){
    return Api().post('agenda/selecionar', id);
  },
  atualizar(informacao){
    return Api().post('agenda/atualizar', informacao);
  }
};