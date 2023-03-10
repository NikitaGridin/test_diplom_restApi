const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");
  
//Модель хранящая информацию о пользователе и плейлистах которые он добавил
const UserPlaylistLibray = sequelize.define('user_playlist_libray', {
  id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
});
  
    module.exports = {UserPlaylistLibray};