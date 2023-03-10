const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");

//Модель плейлиста
const Playlist = sequelize.define(
    "playlist",
    {
      id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
      title: { type: DataTypes.STRING, allowNull: false},
      img: { type: DataTypes.STRING, allowNull: false},
      date_create: {type: DataTypes.DATE,allowNull: false,defaultValue: DataTypes.NOW,}
    }
  ); 

  module.exports = {Playlist};