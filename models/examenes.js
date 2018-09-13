module.exports = function(sequelize, DataTypes) {
  var examanes = sequelize.define("examenes", {
    idCurso: DataTypes.INTEGER,
    tiempo: DataTypes.INTEGER,
    numPreguntas: DataTypes.TEXT,
    incluye: DataTypes.TEXT,
    criticas: DataTypes.TEXT,
    idEmpresa:  DataTypes.INTEGER,

  });
  return examanes;
};
