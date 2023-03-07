const { User } = require("../models/models");
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
    const role = "User";
    if (!nickname || !email || !password) {
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
      const existingUser = await User.findAll({ where: { email } });
      if (existingUser && existingUser.id !== id) {
        return {
          errorCode: 409,
          errorMessage: 'Данный Email занят!'
        };
      }
    }
  
    // Составляем объект с полями для обновления
    const updateFields = {};
    if (nickname) {
      updateFields.nickname = nickname;
    }
    if (email) {
      updateFields.email = email;
    }
    if (password) {
      const password_hash = await bcrypt.hash(password, 10);
      updateFields.password = password_hash;
    }
    if (img) {
      const findUser = await User.findByPk(id);
      fs.unlinkSync(`uploads/images/${findUser.img}`)
        updateFields.img = img;
    }
  
    // Обновляем пользователя только с указанными полями
    const user= await User.update(
      updateFields,
      {
        where: { id }
    }
    );
  
    return user;
  }
  

  async deleteUser(id) {
    const findUser = await User.findByPk(id);
    fs.unlink(`uploads/images/${findUser.img}`, ()=>{
      console.log('deleted');
    });
    const user = await User.destroy({where: {id:id}});
    if(!user){
        return {
            errorCode: 404,
            errorMessage: 'Пользователь не найден'
          };
        }
        return user;
      }
}
module.exports = new userService();


