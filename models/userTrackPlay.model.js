const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");

//Модель хранящая информацию о пользователе и треке который он прослушал
const UserTrackPlay = sequelize.define('user_track_play', {
  id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
  date_create: {type: DataTypes.DATE,allowNull: false,defaultValue: DataTypes.NOW,}

});

  
module.exports = {UserTrackPlay};