module.exports = function(sequelize, DataTypes) {
  var preguntas = sequelize.define("preguntas", {
    pregunta: DataTypes.TEXT,
    idCurso: DataTypes.INTEGER,
    idEmpresa:  DataTypes.INTEGER

  });
  return preguntas;
};
