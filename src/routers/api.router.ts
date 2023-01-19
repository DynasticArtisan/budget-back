import {Router} from 'express'
import AuthRouter from './auth.router'
import CategoriesRouter from './categories.router'
import TransactionsRouter from './transactions.router'

const ApiRouter = Router()

ApiRouter.use("/auth", AuthRouter)
ApiRouter.use("/categories", CategoriesRouter)
ApiRouter.use("/transactions", TransactionsRouter)

export default ApiRouter