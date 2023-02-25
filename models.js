const { sequelize } = require("./db");
const { DataTypes } = require("@sequelize/core");

const Track = sequelize.define(
  "track",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  }
);

const Album = sequelize.define(
  "album",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  }
);

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  }
);


Album.hasMany(Track);
Track.belongsTo(Album);

User.belongsToMany(Track, { through: "UserTrack" });
Track.belongsToMany(User, { through: "UserTrack" });

User.hasMany(Album);
Album.belongsTo(User)

sequelize.sync().then(() => {
    console.log("Таблицы успешно созданы");
  }).catch(error => {
    console.log(`Ошибка при создании таблиц: ${error}`);
  });

module.exports = {
  Track,
  Album,
  User
};
