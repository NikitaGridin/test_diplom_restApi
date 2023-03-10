const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");

//Модель хранящая информацию о треке, и жанрах к которым он относится
const TrackGenre = sequelize.define('track_genre', {
  id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
});

  module.exports = {TrackGenre};