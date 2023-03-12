const userService = require("../service/userService");
const fs = require("fs");

class userController {
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
  async getOneUser(req, res,next) {
    try {
      const user = await userService.getOneUser(req.params.id)
      res.send(user).status(200);
    } catch (error) {
      next(error);
    }
  }
  
  async updateUser(req, res, next) {
    const { body, file, params } = req;
    try {
      const user = await userService.updateUser(body,params.id,file)
      res.status(200).send('Данные успешно изменены!');
    } catch (error) {
      if (file) {
        await fs.promises.unlink(`uploads/images/${file.filename}`);
      }
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    const {id} = req.params;
  try {
    const user = await userService.deleteUser(id)
    res.status(200).send('Пользователь удалён!');
  } catch (error) {
    next(error);
  }

  }
}
module.exports = new userController();


