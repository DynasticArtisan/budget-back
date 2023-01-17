import { Document, model, ObjectId, Schema, Types } from "mongoose";

interface TransactionDoc extends Document {
  userId: ObjectId;
  categoryId: ObjectId;
  amount: number;
  date: Date;
  note?: string;
}

const TransactionSchema = new Schema<TransactionDoc>({
  userId: {
    type: Types.ObjectId,
    ref: "Users",
    required: true,
  },
  categoryId: {
    type: Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
  },
});

const Transactions = model<TransactionDoc>("Transactions", TransactionSchema);
export default Transactions;
