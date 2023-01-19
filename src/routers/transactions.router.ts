import {Router} from 'express'
import transactionsController from '../controllers/transactions.controller'
import ValidateHandler from '../middlewares/validate.middleware'
import { createTransactionSchema, getTransactionSchema, updateTransactionSchema } from '../schemas/transactions.schemas'

const TransactionsRouter = Router()

TransactionsRouter.get("/", transactionsController.getTransactions)
TransactionsRouter.post("/", ValidateHandler(createTransactionSchema), transactionsController.createTransaction)
TransactionsRouter.put("/:transactionId", ValidateHandler(updateTransactionSchema), transactionsController.updateTransaction)
TransactionsRouter.delete("/:transactionId", ValidateHandler(getTransactionSchema), transactionsController.deleteTransaction)

export default TransactionsRouter