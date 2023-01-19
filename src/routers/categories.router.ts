import {Router} from 'express'
import categoriesController from '../controllers/categories.controller'
import ValidateHandler from '../middlewares/validate.middleware'
import { createCategorySchema, getCategorySchema, updateCategorySchema } from '../schemas/categories.schemas'

const CategoriesRouter = Router()

CategoriesRouter.get("/", categoriesController.getCategories)
CategoriesRouter.post("/", ValidateHandler(createCategorySchema), categoriesController.createCategory)
CategoriesRouter.put("/:categoryId", ValidateHandler(updateCategorySchema), categoriesController.updateCategory)
CategoriesRouter.delete("/:categoryId", ValidateHandler(getCategorySchema), categoriesController.deleteCategory)

export default CategoriesRouter