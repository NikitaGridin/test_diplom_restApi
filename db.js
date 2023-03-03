const { Sequelize } = require('@sequelize/core');

const sequelize = new Sequelize('dip', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  //Отключение запросов в консоли
  logging: false,
  define: {
    timestamps: false
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Подключение к базе данных успешно установлено');
  })
  .catch((error) => {
    console.error('Ошибка подключения к базе данных:', error);
  });

  module.exports = {
    sequelize
  }