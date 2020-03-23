import Api from './Api';

export default {
  criarCliente(informacao){
    return Api().post('clientes/criar', informacao);
  },

  index(){
    return Api().get('clientes/index');
  }

}