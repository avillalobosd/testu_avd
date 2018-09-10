module.exports = function(sequelize, DataTypes) {
  var cursos = sequelize.define("cursos", {
    nombre: DataTypes.STRING,
    idEmpresa: DataTypes.STRING

  });
  return cursos;
};
