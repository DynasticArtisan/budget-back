import { Document, model, ObjectId, Schema, Types } from "mongoose";

interface CategoriesDoc extends Document {
  userId: ObjectId;
  title: string;
  type: string;
}

const CategoriesSchema = new Schema<CategoriesDoc>({
  userId: {
    type: Types.ObjectId,
    ref: "Users",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Categories = model<CategoriesDoc>("Categories", CategoriesSchema);
export default Categories;
