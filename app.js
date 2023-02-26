const express = require('express');
const app = express();

const db = require('./db');
const routes = require('./routes/routes')

const {Track, Album, User,Ep} = require('./models')

const cors = require('cors');

app.use(express.json());
app.use(cors())

app.use("/api", routes);


//Получаем все альбомы
app.get("/a",(req, res)=>{
Ep.findAll({include : [User, Track]}).then(albums =>{
  res.json(albums)
}).catch(error =>{
  res.json(`Ошибка при получении запроса ${error}`)
})
})

//Получаем все треки
app.get("/t",(req, res)=>{
  Track.findAll({ include: [{ model: User, through: { attributes: []} }] }).then(tracks =>{
    res.json(tracks)
  }).catch(error =>{
    res.json(`Ошибка при получении запроса ${error}`)
  })
  })

  //Создание трека
  app.post("/t",(req,res)=>{
    const {title, id} = req.body;
    Track.create({title:title}).then(track => {
      track.addUsers(id);
    }).then(track =>{
      res.json("Песня добавлена")
    }).catch(error =>{
      res.json(`Ошибка при получении запроса ${error}`)

    })
  })
//создание альбома
  app.post('/a', (req, res) => {
    const {idUser, titleAlbum, track} = req.body;

      User.findOne({ where: { id: idUser } })
      .then((user) => {
        if (!user) {
          res.json(`User with idUser ${idUser} not found.`);
          return;
        }
        if (track.length < 1) {
          res.json(`Добавьте треки`);
          return;
        }
        const albumData = {
          title: titleAlbum,
          tracks: track,
        };
        user.createAlbum(albumData, { include: [Track] })
          .then((album) => {
            const tracks = album.tracks;
            tracks.forEach((track) => {
              user.addTrack(track
                // , { through: { listened: false } }
                );
            });
            res.json(`Album and tracks have been created for user ${idUser}.`);
          })
          .catch((error) => {
            res.json(`Error creating album and tracks for user ${idUser}:`, error);
          });
      })
      .catch((error) => {
        res.json("Error finding user:", error);
      });


  })


app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });