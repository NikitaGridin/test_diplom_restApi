const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");
  
//Модель хранящая информацию о пользователе и альбомах которые он добавил
const UserAlbumLibray = sequelize.define('user_album_libray', {
  id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
});
  
    module.exports = {UserAlbumLibray};