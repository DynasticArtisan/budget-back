import {Router} from 'express'
import authController from '../controllers/auth.controller'

const AuthRouter = Router()

AuthRouter.post("/register", authController.register)
AuthRouter.post("/", authController.login)
AuthRouter.get("/", authController.refresh)
AuthRouter.delete("/", authController.logout)

export default AuthRouter