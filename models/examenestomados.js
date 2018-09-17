module.exports = function(sequelize, DataTypes) {
  var examanestomados = sequelize.define("examenestomados", {
    idUsuario: DataTypes.INTEGER,
    idCurso: DataTypes.INTEGER,
    idExamen: DataTypes.INTEGER,
    tiempo: DataTypes.INTEGER,
    calificacion: DataTypes.INTEGER,
    idEmpresa:  DataTypes.INTEGER,

  });
  return examanestomados;
};
