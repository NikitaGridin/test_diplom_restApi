const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");
  
//Модель хранящая информацию подписках на пользователей
const Subcribe = sequelize.define('subcribe', {
  id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
},
{
  primaryKey: ['subscriberId', 'userId']
});
  
    module.exports = {Subcribe};