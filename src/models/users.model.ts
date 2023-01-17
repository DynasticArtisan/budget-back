import { Document, model, Schema } from "mongoose";

interface UsersDoc extends Document {
  login: string;
  password: string;
}

const UserSchema = new Schema<UsersDoc>({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = model<UsersDoc>("Users", UserSchema);
export default Users;
