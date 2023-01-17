import ApiError from "../exeptions/api.error";
import Categories from "../models/categories.model";

class CategoriesService {
  async createUserCategory(userId: string, title: string, type: string) {
    const exist = await Categories.findOne({ userId, title, type });
    if (exist) {
      throw ApiError.BadRequest("Категория с таким названием уже существует");
    }
    const category = await Categories.create({ userId, title, type });
    if (!category) {
      throw ApiError.BadRequest("Не удалось создать категорию");
    }
    return category;
  }

  async getUserCategories(userId: string) {
    return await Categories.find({ userId });
  }

  async updateUserCategory(
    categoryId: string,
    userId: string,
    title: string,
    type: string
  ) {
    const exist = await Categories.findOne({ userId, title, type });
    if (exist) {
      throw ApiError.BadRequest("Категория с таким названием уже существует");
    }
    const category = await Categories.findOneAndUpdate(
      { _id: categoryId, userId },
      { userId, title, type },
      { new: true }
    );
    if (!category) {
      throw ApiError.BadRequest("Не удалось найти категорию");
    }
    return category;
  }

  async deleteUserCategory(categoryId: string, userId: string) {
    const category = await Categories.findOneAndDelete({
      _id: categoryId,
      userId,
    });
    if (!category) {
      throw ApiError.BadRequest("Не удалось найти категорию");
    }
    return category;
  }
}
export default new CategoriesService();
