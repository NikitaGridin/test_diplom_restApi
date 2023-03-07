const userService = require("../service/userService");
const fs = require("fs");
class userController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send('Что-то пошло не так!');
    }
  }
  async getOneUser(req, res) {
    try {
      const user = await userService.getOneUser(req.params.id)
      res.send(user).status(200);
    } catch (error) {
      res.status(500).send('Что-то пошло не так!');
    }
  }
  async createUser(req, res) {
    try {    
      const user = await userService.createUser(req.body, req.file);
      if(user.errorCode){
        fs.unlink(`uploads/images/${req.file.filename}`, ()=>{
          console.log('deleted');
        });
        res.status(user.errorCode).send(user.errorMessage);
        return;
      }
      res.status(200).send(user);
    } catch (error) {
      
      res.status(500).send(`Что-то пошло не так! ${error}`);
    }
  }
  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.body,req.params.id,req.file.filename)
      if(user.errorCode){
        fs.unlink(`uploads/images/${req.file.filename}`, ()=>{
          console.log('deleted');
        });
        res.status(user.errorCode).send(user.errorMessage);
        return;
      }
      res.status(200).send('Данные успешно изменены!');
    } catch (error) {
      res.status(500).send(`Что-то пошло не так! ${error}`);
    }
  }

  async deleteUser(req, res) {
  try {
    const user = await userService.deleteUser(req.params.id)
    if(user.errorCode){
      return res.status(user.errorCode).send(user.errorMessage);
    }
    fs.unlink(`uploads/images/${user.img}`, ()=>{
      console.log('deleted');
    });
    res.status(200).send('Пользователь успешно удалён!');
  } catch (error) {
    res.status(500).send('Что-то пошло не так!');
  }

  }
}
module.exports = new userController();


