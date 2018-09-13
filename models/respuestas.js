module.exports = function(sequelize, DataTypes) {
  var respuestas = sequelize.define("respuestas", {
    respuesta: DataTypes.TEXT,
    
    idPreguntas: DataTypes.INTEGER,
    idEmpresa: DataTypes.INTEGER,
    correcta: DataTypes.BOOLEAN,
    idCurso: DataTypes.INTEGER,
    color: DataTypes.STRING

  });
  return respuestas;
};
