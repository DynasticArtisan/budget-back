import ApiError from "../exeptions/api.error";
import Users from "../models/users.model";

class UsersService {
  async createUser(login: string, password: string) {
    const exist = await Users.findOne({ login });
    if (exist) {
      throw ApiError.BadRequest("Пользователь с таким логином уже существует");
    }
    const user = await Users.create({ login, password });
    if (!user) {
      throw ApiError.BadRequest("Не удалось создать пользователя");
    }
    return user;
  }
  async authorize(login: string, password: string) {
    const user = await Users.findOne({ login });
    if (!user) {
      throw ApiError.Forbiden("Неверный логин или пароль");
    }
    const valid = await user.verify(password)
    if(!valid){
      throw ApiError.Forbiden("Неверный логин или пароль");
    }
    return user;
  }
  async getUser(userId: string){
    const user = await Users.findById(userId)
    if(!user){
      throw ApiError.NotFound("Пользователь не найден")
    }
    return user
  }
}
export default new UsersService();
