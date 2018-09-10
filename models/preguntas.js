module.exports = function(sequelize, DataTypes) {
  var preguntas = sequelize.define("preguntas", {
    pregunta: DataTypes.TEXT,
    idCurso: DataTypes.INTEGER

  });
  return preguntas;
};
