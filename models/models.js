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
    login: { type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    password: { type: DataTypes.STRING, allowNull: false},
    img: { type: DataTypes.STRING, allowNull: false},
    date_create: date_create
  }
);

//Модель трека
const Track = sequelize.define(
  "track",
  {
    id: id,
    title: { type: DataTypes.STRING, allowNull: false},
    img: { type: DataTypes.STRING, allowNull: false},
    date_create: date_create,
  }
);

//Модель альбома, большой музыкальный релиз
const Album = sequelize.define(
  "album",
  {
    id: id,
    title: { type: DataTypes.STRING, allowNull: false},
    img: { type: DataTypes.STRING, allowNull: false},
    type: DataTypes.ENUM('Album', 'Ep', 'Single'),
    status: DataTypes.ENUM('published', 'awaiting publication', 'rejected'),
    date_create: date_create
  }
);

//Модель плейлиста
const Playlist = sequelize.define(
  "playlist",
  {
    id: id,
    title: { type: DataTypes.STRING, allowNull: false},
    img: { type: DataTypes.STRING, allowNull: false},
    date_create: date_create
  }
);

//Модель жанров
const Genre = sequelize.define(
  "genre",
  {
    id: id,
    title: { type: DataTypes.STRING, allowNull: false},
    img: { type: DataTypes.STRING, allowNull: false},
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
const AlbumGenre = sequelize.define('album_genre', {
  id: id,
});
//Модель хранящая информацию о пользователе и альбомах которые он добавил
const UserAlbumLibray = sequelize.define('user_album_libray', {
  id: id,
});

const UserPlaylistLibray = sequelize.define('user_playlist_libray', {
  id: id,
});

//Модель хранящая информацию о пользователе и треках которые он добавил
const UserTrackLibray = sequelize.define('user_track_libray', {
  id: id,
});

//Модель хранящая информацию о среденённых пользователях
const Connection = sequelize.define('connection', {
  id: id,
  status: DataTypes.ENUM('accept', 'awaiting accept', 'rejected'),
}, {
  primaryKey: ['senderId', 'receiverId']
});

//Модель хранящая информацию подписках на пользователей
const Subcribe = sequelize.define('subcribe', {
  id: id,
},
{
  primaryKey: ['subscriberId', 'userId']
});

Album.hasMany(Track,{onDelete: "cascade"});
Track.belongsTo(Album);

User.belongsToMany(Track, { through: UserTrack, onDelete: "cascade", unique: true});
Track.belongsToMany(User, { through: UserTrack , onDelete: "cascade", unique: true});

User.hasMany(Album, {onDelete: "cascade", allowNull: false});
Album.belongsTo(User)

User.hasMany(Playlist, {onDelete: "cascade"});
Playlist.belongsTo(User)

Playlist.belongsToMany(Track, { through: PlaylistTrack, unique: true});
Track.belongsToMany(Playlist, { through: PlaylistTrack, unique: true});

Track.belongsToMany(Genre, { through: TrackGenre, unique: true});
Genre.belongsToMany(Track, { through: TrackGenre, unique: true});

Album.belongsToMany(Genre, { through: AlbumGenre, unique: true});
Genre.belongsToMany(Album, { through: AlbumGenre, unique: true});

User.belongsToMany(Track, { through: UserTrackPlay, onDelete: "set null", unique: true});
Track.belongsToMany(User, { through: UserTrackPlay, onDelete: "cascade", unique: true});

User.belongsToMany(Album, { through: UserAlbumLibray,onDelete: "cascade", unique: true});
Album.belongsToMany(User, { through: UserAlbumLibray, unique: true});

User.belongsToMany(Track, { through: UserTrackLibray,onDelete: "cascade", unique: true});
Track.belongsToMany(User, { through: UserTrackLibray, unique: true});

User.belongsToMany(Track, { through: UserPlaylistLibray,onDelete: "cascade", unique: true});
Playlist.belongsToMany(User, { through: UserPlaylistLibray, unique: true});

User.belongsToMany(User, {
  through: Connection,
  as: 'sender',
  foreignKey: 'senderId',
  otherKey: 'receiverId'
});

User.belongsToMany(User, {
  through: Connection,
  as: 'receiver',
  foreignKey: 'receiverId',
  otherKey: 'senderId'
});

Connection.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Connection.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

User.belongsToMany(User, {
  through: Subcribe,
  as: 'subscriber',
  foreignKey: 'subscriberId',
  otherKey: 'userId'
});

User.belongsToMany(User, {
  through: Subcribe,
  as: 'user',
  foreignKey: 'userId',
  otherKey: 'subscriberId'
});

Subcribe.belongsTo(User, { as: 'subscriber', foreignKey: 'subscriberId' });
Subcribe.belongsTo(User, { as: 'user', foreignKey: 'userId' });

module.exports = {
  User,
  Track,
  Album,
  Playlist,
  Genre,
  UserTrack,
  UserTrackPlay,
  PlaylistTrack,
  TrackGenre,
  UserAlbumLibray,
  UserTrackLibray,
  Connection,
  Subcribe
};


