const fs = require("fs");
const authService = require("../service/authService");

class authController {
  async signIn(req, res, next){
      const { body, file } = req;
      try {
        const user = await authService.signIn(body, file);

        res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:true})

        res.status(200).send(user);
      } catch (error) {
        if (file) {
          await fs.promises.unlink(`uploads/images/${file.filename}`);
        }
        next(error);
      }
    }
  async logIn(req, res, next){
    try {
    }
    catch (error) {
    }
  }
  async logout(req, res, next){
    try {
    }
    catch (error) {
    } 
  }
  async activate(req, res, next){
    try {
    }
    catch (error) {
    }
  }
  async refresh(req, res, next){
    try {
    }
    catch (error) {
    }
  }
}
module.exports = new authController();
