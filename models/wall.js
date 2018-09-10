module.exports = function (sequelize, DataTypes) {
  var wall = sequelize.define("wall", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: DataTypes.STRING,
    mensaje: DataTypes.TEXT,
    idusuario: DataTypes.INTEGER
  });
  return wall;
};
