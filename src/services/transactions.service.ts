import ApiError from "../exeptions/api.error";
import Transactions from "../models/transactions.model";

class TransactionsService {
  async createUserTransaction(
    userId: string,
    categoryId: string,
    amount: number,
    date: Date,
    note?: string
  ) {
    const transaction = await Transactions.create({
      userId,
      categoryId,
      amount,
      date,
      note,
    });
    if (!transaction) {
      throw ApiError.BadRequest("Не удалось создать транзакцию");
    }
    return transaction;
  }

  async getUserTransactions(userId: string) {
    return await Transactions.find({ userId });
  }

  async updateUserTransaction(
    transactionId: string,
    userId: string,
    categoryId: string,
    amount: number,
    date: Date,
    note?: string
  ) {
    const transaction = await Transactions.findOneAndUpdate(
      { _id: transactionId, userId },
      { categoryId, amount, date, note },
      { new: true }
    );
    if (!transaction) {
      throw ApiError.BadRequest("Не удалось найти транзакцию");
    }
    return transaction;
  }

  async deleteUserTransaction(transactionId: string, userId: string) {
    const transaction = await Transactions.findOneAndDelete({
      _id: transactionId,
      userId,
    });
    if (!transaction) {
      throw ApiError.BadRequest("Не удалось найти транзакцию");
    }
    return;
  }
}
export default new TransactionsService();
