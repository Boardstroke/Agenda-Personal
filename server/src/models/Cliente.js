module.exports = (sequelize, DataType) => {
  const Cliente = sequelize.define('Cliente',{
    name: DataType.STRING
  })
  Cliente.associate = function(models){
    models.Cliente.hasMany(models.Servico)
  }
  return Cliente
}