const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");
  
//Модель хранящая информацию о пользователе и треках которые он добавил
const UserTrackLibray = sequelize.define('user_track_libray', {
  id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},

});
  
    module.exports = {UserTrackLibray};