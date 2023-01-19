import jwt from 'jsonwebtoken'
import config from 'config'
import ApiError from "../exeptions/api.error"
import usersService from "./users.service"
import AuthModel from "../models/auth.model"

const REFRESHSECRET = config.get<string>("REFRESHSECRET");
const ACCESSSECRET = config.get<string>("ACCESSSECRET");

class AuthService {
    async login(login: string, password: string){
        const { _id: userId } = await usersService.authorize(login, password)
        const { accessToken, refreshToken} = await this.generateTokens(String(userId))
        const session = await AuthModel.findOneAndUpdate({ userId }, { refreshToken })
        if(!session){
            await AuthModel.create({ userId, refreshToken })
        }
        return {
            userId,
            accessToken,
            refreshToken
        }

    }
    async refresh(refreshToken: string){
        const userId = this.validateRefreshToken(refreshToken)
        if(!userId){
            throw ApiError.Forbiden("Невалидный токен")
        }
        const auth = await AuthModel.findOne({ refreshToken })
        if(!auth){
            throw ApiError.Forbiden("Сессия не найдена")
        }
        await usersService.getUser(String(auth.userId))
        const tokens = await this.generateTokens(userId)
        auth.refreshToken = tokens.refreshToken
        await auth.save()
        return {
            userId,
            ...tokens
        }

    }
    async logout(refreshToken: string){
        const auth = await AuthModel.findOneAndDelete({ refreshToken })
        if(!auth){
            throw ApiError.NotFound("Сессия не найдена")
        }
        return 
    }
    async generateTokens(userId: string){
        const accessToken = await jwt.sign(userId, ACCESSSECRET)
        const refreshToken = await jwt.sign(userId, REFRESHSECRET)
        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(accessToken: string){
        try {
            return jwt.verify(accessToken, ACCESSSECRET) as string
        } catch (error) {
            return null
        }
    }
    validateRefreshToken(refreshToken: string){
        try {
            return jwt.verify(refreshToken, REFRESHSECRET) as string
        } catch (error) {
            return null
        }
    }
}

export default new AuthService()