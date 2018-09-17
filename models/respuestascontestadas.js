module.exports = function(sequelize, DataTypes) {
  var respuestascontestadas = sequelize.define("respuestascontestadas", {
    idUser: DataTypes.INTEGER,
    idExamen: DataTypes.INTEGER,
    respuesta: DataTypes.TEXT,
    idPreguntas: DataTypes.INTEGER,
    idEmpresa: DataTypes.INTEGER,
    correcta: DataTypes.BOOLEAN,
    idCurso: DataTypes.INTEGER,
    color: DataTypes.STRING

  });
  return respuestascontestadas;
};
