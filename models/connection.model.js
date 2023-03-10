const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");
  
//Модель хранящая информацию о соеденённых пользователях
const Connection = sequelize.define('connection', {
  id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
  status: DataTypes.ENUM('accept', 'awaiting accept', 'rejected'),
}, {
  primaryKey: ['senderId', 'receiverId']
});
  
    module.exports = {Connection};