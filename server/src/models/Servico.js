module.exports = (sequelize, DataType) => {
  const Servico = sequelize.define('Servico', {
    nome: DataType.STRING,
    data: DataType.DATE,
    valor: DataType.DECIMAL
  })
  Servico.associate = function (models) {

    models.Servico.belongsTo(models.Cliente,{
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Servico
}