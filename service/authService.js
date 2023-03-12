const { User } = require("../models/association");
const bcrypt = require('bcrypt');
const { v4 }= require('uuid');
const MailService = require('./mailService')

const tokenService = require('./tokenService');
const UserDto = require('../dtos/user-dto')
class authService {

  async signIn(body, img) {
    const { nickname, email, password } = body;
    if (!nickname || !email || !password || !img) {
      throw Object.assign(new Error("Пожалуйста, заполните все поля!"), { statusCode: 400 });
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw Object.assign(new Error(`Пользователь с ${email} уже существует`), { statusCode: 409 });
    }
    const role = "User";
    const password_hash = await bcrypt.hash(password, 10);
    const activationLink = v4()
    const newUser = await User.create({
      nickname,
      email,
      password: password_hash,
      img: img.filename,
      role,
      activationLink
    });
    try {
      await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
    } catch (error) {
      console.log(error);
    }    


    const payload = new UserDto(newUser);
    const tokens = tokenService.generateToken({...payload});
    
    await tokenService.saveToken(payload.id,tokens.refreshToken)

    return {...tokens, user:payload};
  }

  async logIn(body){
    
  }
  async logoutUser(body){
     
  }
  async activate(body){

  }
  async refresh(body){
    
  }
}
module.exports = new authService();


