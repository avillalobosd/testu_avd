module.exports = function(sequelize, DataTypes) {
  var incluye = sequelize.define("incluye", {
    idPregunta: DataTypes.INTEGER,
    idExamen:  DataTypes.INTEGER
  });
  return incluye;
};
