import Users from "../models/users.model";

class UsersService {
  async createUser(login: string, password: string) {
    const exist = await Users.findOne({ login });
    if (exist) {
      return false;
    }
    const user = await Users.create({ login, password });
    if (!user) {
      return false;
    }
    return user._id;
  }
  async authorize(login: string, password: string) {
    const user = await Users.findOne({ login, password });
    if (!user) {
      return false;
    }
    return user;
  }
}
export default new UsersService();
