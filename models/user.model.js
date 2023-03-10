const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");

//Модель пользователя
const User = sequelize.define(
    "user",
    {
      id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
      nickname: { type: DataTypes.STRING, allowNull: false},
      email: { type: DataTypes.STRING, allowNull: false, unique: true},
      password: { type: DataTypes.STRING, allowNull: false},
      img: { type: DataTypes.STRING, allowNull: false},
      role: DataTypes.ENUM('admin', 'user'),
      date_create: {type: DataTypes.DATE,allowNull: false,defaultValue: DataTypes.NOW,}
    }
  );
  
  module.exports = {User};