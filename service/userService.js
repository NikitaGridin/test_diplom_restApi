const { User, Album } = require("../models/models");
const bcrypt = require('bcrypt');
const fs = require("fs");

class userService {
  async getAllUsers() {
      const users = await User.findAll();
      return users;
  }
  async getOneUser(id) {
      const user = await User.findOne(
        {
          where:{id:id}
        }
      );
      return user;
  }
  async createUser(body, img) {
    const { nickname, email, password } = body;
    if (!nickname || !email || !password || !img) {
      return {
        errorCode: 400,
        errorMessage: "Пожалуйста, заполните все поля!",
      };
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      return {
        errorCode: 409,
        errorMessage: "Данный Email занят!",
      };
    }
    const role = "User";
    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      nickname,
      email,
      password: password_hash,
      img: img.filename,
      role,
    });
  
    return newUser;
  }
  
  async updateUser(body, id, img) {
    const { nickname, email, password } = body;
  
    // Проверяем, что email не занят другим пользователем
    if (email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id !== id) {
        return {
          errorCode: 409,
          errorMessage: 'Данный Email занят!'
        };
      }
    }
  
    // Составляем объект с полями для обновления
    const updateFields = {};
    if (nickname) updateFields.nickname = nickname;
    if (email) updateFields.email = email;
    if (password) {
      const password_hash = await bcrypt.hash(password, 10);
      updateFields.password = password_hash;
    }
    if (img) {
      const findUser = await User.findByPk(id);
      await fs.promises.unlink(`uploads/images/${findUser.img}`);
      updateFields.img = img.filename;
    }
      // Обновляем пользователя только с указанными полями
      const [numRows, updatedUser] = await User.update(updateFields, {
      where: { id },
      returning: true
      });

      if (numRows === 0) {
      return {
      errorCode: 400,
      errorMessage: 'Не указаны поля для обновления'
      };
      }

      return updatedUser;
    }
  
  async deleteUser(id) {
    const findAlbums = await Album.findAll({where: {userId:id}});
    if(findAlbums){
      findAlbums.forEach(element => {
        fs.promises.unlink(`uploads/images/${element.img}`);
      });
    }
    const findUser = await User.findByPk(id);
    if (findUser && findUser.img) {
      await fs.promises.unlink(`uploads/images/${findUser.img}`);
    }
    const deletedUser = await User.destroy({where: {id:id}});
    if(!deletedUser){
        return {
            errorCode: 404,
            errorMessage: 'Пользователь не найден'
          };
        }
        return deletedUser;
      }
}
module.exports = new userService();


