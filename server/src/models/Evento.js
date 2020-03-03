module.exports = (sequelize, DataType) =>{

  const Evento = sequelize.define('Evento',{
    name: DataType.STRING,
    data: DataType.STRING,
    start: DataType.STRING,
    end: DataType.STRING
  })

  return Evento
}