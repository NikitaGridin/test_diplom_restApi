const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");

//Модель хранящая информацию о плейлисте и треках которые в него добавлены
const PlaylistTrack = sequelize.define('playlist_track', {
  id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
});

  
module.exports = {PlaylistTrack};