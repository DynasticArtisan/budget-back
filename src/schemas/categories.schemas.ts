import { isValidObjectId } from "mongoose";
import { object, string, TypeOf } from "zod";

export const categoryIdSchema = string().refine(string => isValidObjectId(string))
export const categorySchema = object({
    title: string(),
    type: string()
})

export const createCategorySchema = object({
    body: categorySchema
})
export type CreateCategoryType = TypeOf<typeof createCategorySchema>

export const getCategorySchema = object({
    params: object({
        categoryId: categoryIdSchema
    }),
})
export type GetCategoryType = TypeOf<typeof getCategorySchema>

export const updateCategorySchema = getCategorySchema.merge(createCategorySchema)
export type UpdateCategoryType = TypeOf<typeof updateCategorySchema>

