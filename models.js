const { sequelize } = require("./db");
const { DataTypes } = require("@sequelize/core");

const Track = sequelize.define(
  "track",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
  }
);

const Album = sequelize.define(
  "album",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false  },
  },
  {
    timestamps: false,
  }
);

const Ep = sequelize.define(
  "ep",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false  },
  },
  {
    timestamps: false,
  }
);

const Single = sequelize.define(
  "single",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false  },
  },
  {
    timestamps: false,
  }
);

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, allowNull: false  },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false  },
  },
  {
    timestamps: false,
  }
);
const Playlist = sequelize.define(
  "playlist",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false  },
  },
  {
    timestamps: false,
  }
);


Album.hasMany(Track,{allowNull: true,onDelete: "cascade"});
Track.belongsTo(Album);

Ep.hasMany(Track,{allowNull: true,onDelete: "cascade"});
Track.belongsTo(Ep);

Single.hasMany(Track,{allowNull: true,onDelete: "cascade"});
Track.belongsTo(Single);

User.belongsToMany(Track, { through: "UserTrack", onDelete: "cascade"});
Track.belongsToMany(User, { through: "UserTrack" , onDelete: "cascade"});

User.hasMany(Album,{ foreignKey: {
  allowNull: false
}});
Album.belongsTo(User)

User.hasMany(Ep,{ foreignKey: {
  allowNull: false
}});
Ep.belongsTo(User)

User.hasMany(Single,{ foreignKey: {
  allowNull: false
}});
Single.belongsTo(User)

User.hasMany(Playlist,{ foreignKey: {
  allowNull: false
}});
Playlist.belongsTo(User)

Playlist.belongsToMany(Track, { through: "PlaylistTrack" , unique: true});
Track.belongsToMany(Playlist, { through: "PlaylistTrack", unique: true});



sequelize.sync().then(() => {
  console.log("Таблицы успешно созданы");
}).catch(error => {
  console.log(`Ошибка при создании таблиц: ${error}`);
});


module.exports = {
  Track,
  Album,
  User,
  Playlist,
  Ep,
  Single
};
