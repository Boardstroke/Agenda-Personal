const { Evento } = require("../models");

module.exports = {
  async criarEvento(req, res) {
    try {
      const evento = await Evento.create(req.body);
      res.send(evento);
    } catch (err) {
      res.status(400).send({
        error: "error"
      });
    }
  },

  async index(req, res) {
    try {
      const eventos = await Evento.findAll();
      res.send(eventos);
    } catch (err) {
      res.status(400).send({
        error: "Banco de dados desconectado"
      });
    }
  },

  async remove(req, res) {
    try {
      const evento = await Evento.findByPk(req.body.id);
      evento.destroy();
      res.status(200).send({
        message: "Conseguimos apagar o evento"
      });
    } catch (err) {
      res.status(400).send({
        error:
          "Não foi possivel excluir evento, possivelmente já tenha sido excluido"
      });
    }
  },

  async selecionarPorId(req, res) {
    try {
      const evento = await Evento.findByPk(req.body.id);

      res.send({
        id: evento.id,
        name: evento.name,
        data: evento.data,
        start: evento.start,
        end: evento.end
      });
    } catch (err) {
      res.status(400).send({
        error: "Não foi possivel encontrar o evento"
      });
    }
  },

  async atualizar(req, res) {
    try {
      const evento = await Evento.findByPk(req.body.id);

      evento.update({
        name: req.body.name,
        data: req.body.data,
        start: req.body.start,
        end: req.body.end
      });

      res.send(evento.dataValues);

    } catch (err) {
      res.status(400).send({
        error: "Não foi possivel atualizar o evento"
      });
    }
  }
};
