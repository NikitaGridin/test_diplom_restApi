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
      if (!user) {
        throw Object.assign(new Error("Пользователь не найден!"), { statusCode: 404 });
      }
      res.send(user).status(200);
    } catch (error) {
      next(error);
    }
  }
  async createUser(req, res, next) {
    const { body, file } = req;
    try {
      const user = await userService.createUser(body, file);
      if (user.errorCode) {
        throw Object.assign(new Error(user.errorMessage), { statusCode: user.errorCode });
      }
      res.status(200).send(user);
    } catch (error) {
      if (file) {
        await fs.promises.unlink(`uploads/images/${file.filename}`);
      }
      next(error);
    }
  }
  
  async updateUser(req, res, next) {
    const { body, file, params } = req;
    try {
      const user = await userService.updateUser(body,params.id,file)
      if(user.errorCode){
        throw Object.assign(new Error(user.errorMessage), { statusCode: user.errorCode });
      }
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
    if(user.errorCode){
      throw Object.assign(new Error(user.errorMessage), { statusCode: user.errorCode });
    }
    res.status(200).send('Пользователь удалён!');
  } catch (error) {
    next(error);
  }

  }
}
module.exports = new userController();


