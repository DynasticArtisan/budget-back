import { Document, model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

interface UsersDoc extends Document {
  login: string;
  password: string;
  verify(password: string) :Promise<boolean>
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

UserSchema.pre("save",async function(next){
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
  return next();
})

UserSchema.method("verify", async function(password: string){
  return await bcrypt.compare(password, (this as UsersDoc).password).catch((e) => false);
})


const Users = model<UsersDoc>("Users", UserSchema);

export default Users;
