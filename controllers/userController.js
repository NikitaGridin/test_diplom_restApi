const { User } = require("../models/models");
const bcrypt = require('bcrypt');
class userController {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
  
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send('Что-то пошло не так!');
    }
  }
  async getOneUser(req, res) {
    try {
      const {id} = req.params;
      const user = await User.findOne(
        {
          where:{id:id}
        }
      );
      if(!user){
        return res.status(404).send('Пользователь не найден!');
      }
      res.send(user).status(200);
    } catch (error) {
      res.status(500).send('Что-то пошло не так!');
    }
  }
  async createUser(req, res) {
    try {
      const { login, email, password } = req.body;

      const user = await User.findOne({ where: { email } });
  
      if (user) {
        return res.status(409).send('Данный Email занят!');
      }
  
      const password_hash = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({ login, email, password: password_hash });
  
      res.status(200).send(newUser);
    } catch (error) {
      res.status(500).send('Что-то пошло не так!');
    }
  }
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { login, email, password } = req.body;
  
      const password_hash = await bcrypt.hash(password, 10);
      const user = await User.findOne({ where: { email } });
      if(user){
        return res.status(409).send('Данный Email занят!');
      }

      await User.update(
        { login, email, password: password_hash },
        { where: { id } }
      );
  
      res.status(200).send('Данные успешно изменены!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Что-то пошло не так!');
    }
  }

  async deleteUser(req, res) {
  try {
    const {id} = req.params;
    const user = await User.destroy({where: {id:id}});
    if(!user){
      return res.status(500).send('Пользователь не найден!');
    }
    res.status(200).send('Пользователь успешно удалён!');
  } catch (error) {
    res.status(500).send('Что-то пошло не так!');
  }

  }
}
module.exports = new userController();


