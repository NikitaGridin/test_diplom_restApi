const { sequelize } = require("./db");
const { DataTypes } = require("@sequelize/core");

const Track = sequelize.define(
  "track",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    date_create: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  { timestamps: false }
);

const Album = sequelize.define(
  "album",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false  },
    date_create: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  { timestamps: false }
);

const Ep = sequelize.define(
  "ep",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false  },
    date_create: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  { timestamps: false }
);

const Single = sequelize.define(
  "single",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false  },
    date_create: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  { timestamps: false }
);

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, allowNull: false  },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false  },
    date_create: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  { timestamps: false }
);
const Playlist = sequelize.define(
  "playlist",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false  },
    date_create: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  { timestamps: false }
);
const Genre = sequelize.define(
  "genre",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false  },
  },
  {
    timestamps: false,
  }
);

const Status = sequelize.define(
  "status",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false  },
  },
  {
    timestamps: false,
  }
);

const UserTrack = sequelize.define('UserTrack', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  trackId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Track,
      key: 'id'
    }
  },
  date_create: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
},
{ timestamps: false });

const ListeningTrack = sequelize.define('ListeningTrack', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  trackId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Track,
      key: 'id'
    }
  },
  date_listen: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
},
{ timestamps: false });

const AlbumAdded = sequelize.define('AlbumAdded', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  albumId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Album,
      key: 'id'
    }
  }
},
{ timestamps: false });

const EpAdded = sequelize.define('EpAdded', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  epId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ep,
      key: 'id'
    }
  }
},
{ timestamps: false });

const SingleAdded = sequelize.define('SingleAdded', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  singleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Single,
      key: 'id'
    }
  }
},
{ timestamps: false });

const TrackAdded = sequelize.define('TrackAdded', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  trackId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Track,
      key: 'id'
    }
  }
},
{ timestamps: false });

const PublicationInfo = sequelize.define('PublicationInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  albumId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Album,
      key: 'id'
    }
  },  
  epId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Ep,
      key: 'id'
    }
  },
  singleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Single,
      key: 'id'
    }
  },
  trackId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Track,
      key: 'id'
    }
  },
  statusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Status,
      key: 'id'
    }
  },
  date_create: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  date_publicate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  }
},
{ timestamps: false });

Album.hasMany(Track,{allowNull: true,onDelete: "cascade"});
Track.belongsTo(Album);

Ep.hasMany(Track,{allowNull: true,onDelete: "cascade"});
Track.belongsTo(Ep);

Single.hasMany(Track,{allowNull: true,onDelete: "cascade"});
Track.belongsTo(Single, {onDelete: "cascade"});

User.belongsToMany(Track, { through: UserTrack, onDelete: "cascade", unique: true});
Track.belongsToMany(User, { through: UserTrack , onDelete: "cascade", unique: true});

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

Track.belongsToMany(Genre, { through: "TrackGenre" , unique: true});
Genre.belongsToMany(Track, { through: "TrackGenre", unique: true});

User.belongsToMany(Track, { through: ListeningTrack});
Track.belongsToMany(User, { through: ListeningTrack});

User.belongsToMany(Album, { through: AlbumAdded,onDelete: "cascade"});
Album.belongsToMany(User, { through: AlbumAdded,onDelete: "cascade"});

User.belongsToMany(Ep, { through: EpAdded,onDelete: "cascade"});
Ep.belongsToMany(User, { through: EpAdded,onDelete: "cascade"});

User.belongsToMany(Single, { through: SingleAdded,onDelete: "cascade"});
Single.belongsToMany(User, { through: SingleAdded,onDelete: "cascade"});

User.belongsToMany(Single, { through: TrackAdded,onDelete: "cascade"});
Track.belongsToMany(User, { through: TrackAdded,onDelete: "cascade"});

Album.hasMany(PublicationInfo,{ foreignKey: {
  allowNull: true
}});
PublicationInfo.belongsTo(Album)

Ep.hasMany(PublicationInfo,{ foreignKey: {
  allowNull: true
}});
PublicationInfo.belongsTo(Ep)

Single.hasMany(PublicationInfo,{ foreignKey: {
  allowNull: true
}});
PublicationInfo.belongsTo(Single)

Track.hasMany(PublicationInfo,{ foreignKey: {
  allowNull: false
}});
PublicationInfo.belongsTo(Track)

module.exports = {
  Track,
  Album,
  User,
  Playlist,
  Ep,
  Single,
  Genre,
  UserTrack,
  ListeningTrack,
  AlbumAdded,
  EpAdded,
  SingleAdded,
  PublicationInfo,
  Status,
  TrackAdded
};
