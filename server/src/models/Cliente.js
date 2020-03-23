module.exports = (sequelize, DataType) => {
  const Cliente = sequelize.define("Cliente", {
    avatar: DataType.STRING,
    name: DataType.STRING,
    email: DataType.STRING,
    telefone: DataType.STRING
  });
  Cliente.associate = function(models) {
    models.Cliente.hasMany(models.Servico);
  };
  return Cliente;
};
