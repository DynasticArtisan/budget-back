import { NextFunction, Request, Response } from "express";
import { CreateTransactionType, GetTransactionType, UpdateTransactionType } from "../schemas/transactions.schemas";
import transactionsService from "../services/transactions.service";


class TransactionsController {
    async getTransactions(req: Request, res: Response, next: NextFunction){
        try {
            const myId = res.locals.userId as string
            const transactions = await transactionsService.getUserTransactions(myId)
            res.json(transactions)
        } catch (e) {
            next(e)
        }
    }
    
    async createTransaction(req: Request<{},{},CreateTransactionType['body']>, res: Response, next: NextFunction){
        try {
            const myId = res.locals.userId as string
            const { categoryId, amount, date, note } = req.body
            const category = await transactionsService.createUserTransaction(myId, categoryId, amount, date, note)
            res.json(category)
        } catch (e) {
            next(e)
        }
    }

    async updateTransaction(req: Request<UpdateTransactionType['params'],{},UpdateTransactionType['body']>, res: Response, next: NextFunction){
        try {
            const myId = res.locals.userId as string
            const { transactionId } = req.params
            const { categoryId, amount, date, note } = req.body
            const category = await transactionsService.updateUserTransaction(transactionId, myId, categoryId, amount, date, note)
            res.json(category)
        } catch (e) {
            next(e)
        }
    }

    async deleteTransaction(req: Request<GetTransactionType['params']>, res: Response, next: NextFunction){
        try {
            const myId = res.locals.userId as string
            const { transactionId } = req.params
            const category = await transactionsService.deleteUserTransaction(transactionId, myId)
            res.json(category)
        } catch (e) {
            next(e)
        }
    }
}   

export default new TransactionsController()