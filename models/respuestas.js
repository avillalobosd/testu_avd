module.exports = function(sequelize, DataTypes) {
  var respuestas = sequelize.define("respuestas", {
    respuesta: DataTypes.TEXT,
    idPreguntas: DataTypes.INTEGER,
    correcta: DataTypes.BOOLEAN,
    color: DataTypes.STRING

  });
  return respuestas;
};
