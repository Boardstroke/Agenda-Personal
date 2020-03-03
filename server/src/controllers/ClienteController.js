const {Cliente, Servico} = require('../models')

module.exports = {

  async criarCliente(req, res){
    try{

      const cliente = await Cliente.create(req.body);
      res.send(cliente);

    } catch(err){

      res.status(400).send({
        error : 'error'
      })
    }
  },

  async addServico(req,res){
    try{
      servico = await Servico.create({
        nome: req.body.nome,
        ClienteId: req.body.clienteId,
        data:req.body.data,
        valor: req.body.valor
      })
      res.send(servico)
    }catch(err){
      res.send({
        erro: "Foi ter quer estar ao seu lado"
      })
    }
  },

  async index (req, res){
    try{
      const clientes = await Cliente.findAll({include: [Servico]});
      res.send(clientes)
    } catch(err){
      res.status(400).send({
        error: "Banco de dados desconectado"
      })
    }
  },


}