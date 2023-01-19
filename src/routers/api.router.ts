import {Router} from 'express'
import AuthHandler from '../middlewares/auth.middleware'
import AuthRouter from './auth.router'
import CategoriesRouter from './categories.router'
import TransactionsRouter from './transactions.router'

const ApiRouter = Router()

ApiRouter.use("/auth", AuthRouter)
ApiRouter.use("/categories", AuthHandler, CategoriesRouter)
ApiRouter.use("/transactions", AuthHandler, TransactionsRouter)

export default ApiRouter