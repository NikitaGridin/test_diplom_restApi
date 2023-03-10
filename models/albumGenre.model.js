const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");
  
//Модель жанров
const AlbumGenre = sequelize.define('album_genre', {
  id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
});
  
    module.exports = {AlbumGenre};