module.exports = function(sequelize, DataTypes) {
  var criticas = sequelize.define("criticas", {
    idPregunta: DataTypes.INTEGER,
    idExamen:  DataTypes.INTEGER,
    keycritica:  DataTypes.INTEGER
  });
  return criticas;
};
