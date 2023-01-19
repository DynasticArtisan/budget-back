import { NextFunction, Request, Response } from "express";
import { AuthorizeType, RegisterType } from "../schemas/auth.schemas";
import authService from "../services/auth.service";

class AuthController {
    async register(req: Request<{},{},RegisterType>, res: Response, next: NextFunction){
        try {
            const {login, password} = req.body
            const {accessToken, refreshToken} = await authService.register(login, password)
            res.cookie("refreshToken", refreshToken, { httpOnly: true }).json({ accessToken })
        } catch (e) {
            next(e)
        }
    }
    async login(req: Request<{},{},AuthorizeType>, res: Response, next: NextFunction){
        try {
            const {login, password} = req.body
            const {accessToken, refreshToken} = await authService.login(login, password)
            res.cookie("refreshToken", refreshToken, { httpOnly: true }).json({ accessToken })
        } catch (e) {
            next(e)
        }
    }
    async refresh(req: Request, res: Response, next: NextFunction){
        try {
            const { accessToken, refreshToken } = await authService.refresh(req.cookies.refreshToken)
            res.cookie("refreshToken", refreshToken, { httpOnly: true }).json({ accessToken })
        } catch (e) {
            next(e)
        }
    }
    async logout(req: Request, res: Response, next: NextFunction){
        try {
            await authService.logout(req.cookies.refreshToken)
            res.clearCookie("refreshToken").json({ message: "Хорошего дня" })
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()