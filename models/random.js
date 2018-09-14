module.exports = function(sequelize, DataTypes) {
  var random = sequelize.define("random", {
    idPregunta: DataTypes.INTEGER,
    idExamen:  DataTypes.INTEGER
  });
  return random;
};
