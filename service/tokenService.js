const jwt = require("jsonwebtoken");
const {Token} = require('../models/token')
class TokenService{
    generateToken(payload){
        const accesToken = jwt.sign(payload, process.env.JWT_ACCES_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return{
            accesToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken){
        const tokeData = await Token.findByPk(userId);
        if(tokeData){
            tokeData.refreshToken = refreshToken;
            return tokeData.save();
        }
        const token = await Token.create({refreshToken, userId})
        return token;
    }
}

module.exports = new TokenService();
