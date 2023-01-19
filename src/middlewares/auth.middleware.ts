import { NextFunction, Request, Response } from "express";
import ApiError from "../exeptions/api.error";
import authService from "../services/auth.service";

export default function AuthHandler(req: Request, res: Response, next: NextFunction){
    try {
        const accessToken = (req.headers.authorization || "").replace(
            /^Bearer\s/,
            ""
        );
        if (!accessToken) {
          return next(ApiError.Unauthorized("Требуется авторизация"));
        }
        const userId = authService.validateAccessToken(accessToken)
        if(userId){
          return res.status(401).json({ message: "Токен доступа устарел", expired: true })
        }
        res.locals.userId = userId
        next()
    } catch (e) {
        next(e)
    }
}