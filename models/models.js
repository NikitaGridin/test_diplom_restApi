const { sequelize } = require("../db");
const { DataTypes } = require("@sequelize/core");

//Переменная которая используется в описании поля date_create у таблиц
const date_create = {
  type: DataTypes.DATE,
  allowNull: false,
  defaultValue: DataTypes.NOW,
};

//Переменная которая используется в описании поля id у таблиц
const id = { 
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true 
};

//Модель пользователя
const User = sequelize.define(
  "user",
  {
    id: id,
    login: { type: DataTypes.STRING, allowNull: false  },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false  },
    date_create: date_create
  }
);

//Модель трека
const Track = sequelize.define(
  "track",
  {
    id: id,
    title: { type: DataTypes.STRING, allowNull: false },
    date_create: date_create

  }
);

//Модель альбома, большой музыкальный релиз
const Album = sequelize.define(
  "album",
  {
    id: id,
    title: { type: DataTypes.STRING, allowNull: false  },
    date_create: date_create
  }
);

//Модель плейлиста
const Playlist = sequelize.define(
  "playlist",
  {
    id: id,
    title: { type: DataTypes.STRING, allowNull: false  },
    date_create: date_create

  }
);

//Модель жанров
const Genre = sequelize.define(
  "genre",
  {
    id: id,
    title: { type: DataTypes.STRING, allowNull: false  },
  }
);

//Модель типов релиза
const TypeAlbum = sequelize.define(
  "type_album",
  {
    id: id,
    title: { type: DataTypes.STRING, allowNull: false  },
  }
);
//Модель статуса публикации
const StatusRelease = sequelize.define(
  "status_release",
  {
    id: id,
    title: { type: DataTypes.STRING, allowNull: false  },
  }
);

//Модель хранящая информацию о пользователе и треке который он опубликовал
const UserTrack = sequelize.define('user_track', {
  id: id,
  date_create: date_create

});

//Модель хранящая информацию о пользователе и треке который он прослушал
const UserTrackPlay = sequelize.define('user_track_play', {
  id: id,
  date_create: date_create

});

//Модель хранящая информацию о плейлисте и треках которые в него добавлены
const PlaylistTrack = sequelize.define('playlist_track', {
  id: id,
});

//Модель хранящая информацию о треке, и жанрах к которым он относится
const TrackGenre = sequelize.define('track_genre', {
  id: id,
});

//Модель хранящая информацию о пользователе и альбомах которые он добавил
const UserAlbumLibray = sequelize.define('user_album_libray', {
  id: id,
});

//Модель хранящая информацию о пользователе и треках которые он добавил
const UserTrackLibray = sequelize.define('user_track_libray', {
  id: id,
});

const ReleaseInfo = sequelize.define('release_info', {
  id: id,
  date_create: date_create,
  date_publicate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  }
});

Album.hasMany(Track,{onDelete: "cascade"});
Track.belongsTo(Album);

User.belongsToMany(Track, { through: UserTrack, onDelete: "cascade", unique: true});
Track.belongsToMany(User, { through: UserTrack , onDelete: "cascade", unique: true});

User.hasMany(Album, {onDelete: "cascade"});
Album.belongsTo(User)

User.hasMany(Playlist, {onDelete: "cascade"});
Playlist.belongsTo(User)

Playlist.belongsToMany(Track, { through: PlaylistTrack, unique: true});
Track.belongsToMany(Playlist, { through: PlaylistTrack, unique: true});

Track.belongsToMany(Genre, { through: TrackGenre, unique: true});
Genre.belongsToMany(Track, { through: TrackGenre, unique: true});

User.belongsToMany(Track, { through: UserTrackPlay, onDelete: "set null"});
Track.belongsToMany(User, { through: UserTrackPlay, onDelete: "cascade"});

User.belongsToMany(Album, { through: UserAlbumLibray,onDelete: "cascade"});
Album.belongsToMany(User, { through: UserAlbumLibray});

User.belongsToMany(Track, { through: UserTrackLibray,onDelete: "cascade"});
Track.belongsToMany(User, { through: UserTrackLibray});

ReleaseInfo.belongsTo(Album, {
  onDelete: 'CASCADE'
})

ReleaseInfo.belongsTo(StatusRelease)

Album.belongsTo(TypeAlbum)

module.exports = {
  User,
  Track,
  Album,
  Playlist,
  Genre,
  TypeAlbum,
  StatusRelease,
  UserTrack,
  UserTrackPlay,
  PlaylistTrack,
  TrackGenre,
  UserAlbumLibray,
  UserTrackLibray,
  ReleaseInfo
};


