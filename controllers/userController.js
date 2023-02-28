const { User, Track, Album,Ep,Single,Genre,UserTrack, ListeningTrack } = require("../models");
const bcrypt = require('bcrypt');
class userController {
  async getAllUsers(req, res) {
    User.findAll().then(users =>{
      res.json(users)
    }).catch(error =>{
      res.json(`Ошибка при получении запроса ${error}`)
    })
  }
  async getOneUser(req, res) {
    User.findOne({
      where:{id: req.params.id},
      attributes: ["id","login"],
        include: [
                  { model: Album},
                  { model: Ep},
                  { model: Single},
                  { model: Track, 
                    include: [
                           {model: Genre, attributes: ["id","title"],
                                  through: { attributes: []},
                                  model: User,attributes: ["login"],
                                  through: { model: ListeningTrack,
                                  attributes: ['id']}}],
                            attributes:["id","title"],
                            through: {model: UserTrack,attributes: []}}] 
                          })
//     Достать недавние прослушивания пользователя
//      User.findOne({
//       where: { id: req.params.id },
//       include: [{
//         model: Track,
//         through: { model: UserTrack, where: { userId: req.params.id }},
//         include: {
//           model: User,
//           attributes: ["login"],
//           through: { model: ListeningTrack, attributes: ['id']},
//         }
//       }]
// })    
    .then(user =>{
      res.json(user)
    }).catch(error =>{
      res.json(`Ошибка при получении запроса ${error}`)
    })

  }
  async createUser(req, res) {
    const {login, email, password} = req.body;
    User.findAll({where: {email: email}}).then(user =>{
      if(user.length > 1){
        res.json("Данный email занят");
        return;
      }
      else{
        bcrypt.hash(password, 10).then(pass =>{
          const password_hash = pass;
          User.create({login: login, email: email, password:password_hash }).then(user =>{
            res.json(user)
            return;
          })
        })
        .catch(error=>{
          res.json(`Ошибка при получении запроса ${error}`)
          return;
        })
      }
    })
  }
  async updateUser(req, res) {
    const {id} = req.params;
    const {login, email, password} = req.body;
        bcrypt.hash(password, 10).then(pass =>{
          const password_hash = pass;
            User.update({
            login:login,
            email:email,
            password:password_hash
          },
          {
          where :{id:id}
          }).then(user =>{
            res.json("Данные изменены");
          })
          .catch(error=>{
            res.json(`Ошибка при получении запроса ${error}`)
            return;
          })
          })}

  async deleteUser(req, res) {
  const {id} = req.params;
   User.destroy({where: {id: id}}).then(user =>{
    res.json("Deleted")
   })
  }
}
module.exports = new userController();
