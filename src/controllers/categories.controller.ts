import { NextFunction, Request, Response } from "express";
import { CreateCategoryType, GetCategoryType, UpdateCategoryType } from "../schemas/categories.schemas";
import categoriesService from "../services/categories.service";

class CategoriesController {
    async getCategories(req: Request, res: Response, next: NextFunction){
        try {
            const myId = res.locals.userId as string
            const categories = await categoriesService.getUserCategories(myId)
            res.json(categories)
        } catch (e) {
            next(e)
        }
    }
    
    async createCategory(req: Request<{},{},CreateCategoryType['body']>, res: Response, next: NextFunction){
        try {
            const myId = res.locals.userId as string
            const {title, type} = req.body
            const category = await categoriesService.createUserCategory(myId, title, type )
            res.json(category)
        } catch (e) {
            next(e)
        }
    }

    async updateCategory(req: Request<UpdateCategoryType['params'],{},UpdateCategoryType['body']>, res: Response, next: NextFunction){
        try {
            const myId = res.locals.userId as string
            const {categoryId} = req.params
            const {title, type} = req.body
            const category = await categoriesService.updateUserCategory(categoryId, myId, title, type)
            res.json(category)
        } catch (e) {
            next(e)
        }
    }

    async deleteCategory(req: Request<GetCategoryType['params']>, res: Response, next: NextFunction){
        try {
            const myId = res.locals.userId as string
            const {categoryId} = req.params
            const category = await categoriesService.deleteUserCategory(categoryId, myId)
            res.json(category)
        } catch (e) {
            next(e)
        }
    }
}   

export default new CategoriesController()