import { isValidObjectId } from "mongoose";
import { date, number, object, string, TypeOf } from "zod";
import { categoryIdSchema } from "./categories.schemas";


export const transactionIdSchema = string().refine(string => isValidObjectId(string))
export const transactionSchema = object({
    categoryId: categoryIdSchema,
    amount: number(),
    date: date(),
    note: string().optional()
})

export const createTransactionSchema = object({
    body: transactionSchema
})
export type CreateTransactionType = TypeOf<typeof createTransactionSchema>

export const getTransactionSchema = object({
    params: object({
        transactionId: transactionIdSchema
    }),
})
export type GetTransactionType = TypeOf<typeof getTransactionSchema>

export const updateTransactionSchema = getTransactionSchema.merge(createTransactionSchema)
export type UpdateTransactionType = TypeOf<typeof updateTransactionSchema>

