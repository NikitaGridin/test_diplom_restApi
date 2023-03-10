const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");
  
//Модель жанров
const Genre = sequelize.define(
    "genre",
    {
      id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
      title: { type: DataTypes.STRING, allowNull: false},
    }
  );
  
    module.exports = {Genre};