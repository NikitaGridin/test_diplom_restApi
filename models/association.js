const { User } = require('./user.model')
const { Track } = require('./track.model')
const { Album } = require('./album.model')
const { Playlist } = require('./playlist.model')
const { Genre } = require('./genre.model')
const { UserTrack } = require('./userTrack.model')
const { UserTrackPlay } = require('./userTrackPlay.model')
const { PlaylistTrack } = require('./playlistTrack.model')
const { TrackGenre } = require('./trackGenre.model')
const { UserAlbumLibray } = require('./userAlbumLibray.model')
const { UserTrackLibray } = require('./userTrackLibray.model')
const { Connection } = require('./connection.model')
const { Subcribe } = require('./subcribe.model')
const { UserPlaylistLibray } = require('./userPlaylistLibray.model')
const { AlbumGenre } = require('./albumGenre.model')


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
  Subcribe,
  UserPlaylistLibray
};


