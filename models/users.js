module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    nombre: DataTypes.STRING,
    password: DataTypes.TEXT,
    permiso: DataTypes.INTEGER

  });
  return users;
};
