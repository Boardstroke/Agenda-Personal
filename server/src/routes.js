const EventosController = require('./controllers/EventosController')
const ClienteController = require('./controllers/ClienteController')
module.exports = (app) => {
  // Rotas referente a agenda
  app.post('/agenda/criar', EventosController.criarEvento)
  app.post('/agenda/remove', EventosController.remove)
  app.post('/agenda/atualizar',EventosController.atualizar)
  app.post('/agenda/selecionar', EventosController.selecionarPorId)

  app.get('/agenda/eventos', EventosController.index)

  // Rotas referentes criação, edição, etc. Do cliente
  app.post('/clientes/criar', ClienteController.criarCliente)
  app.post('/clientes/addServico', ClienteController.addServico)
  app.get('/clientes/index', ClienteController.index)

}