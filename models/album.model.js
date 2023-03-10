const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");

//Модель альбома
const Album = sequelize.define(
    "album",
    {
      id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
      title: { type: DataTypes.STRING, allowNull: false},
      img: { type: DataTypes.STRING, allowNull: false},
      type: DataTypes.ENUM('Album', 'Ep', 'Single'),
      status: DataTypes.ENUM('published', 'awaiting publication', 'rejected'),
      date_create: {type: DataTypes.DATE,allowNull: false,defaultValue: DataTypes.NOW,}
    }
  );  

  module.exports = {Album};