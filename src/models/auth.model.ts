import { Document, model, ObjectId, Schema, Types } from "mongoose";

interface AuthDoc extends Document {
    userId: ObjectId,
    refreshToken: string
}

const AuthSchema = new Schema<AuthDoc>({
    userId: {
        type: Types.ObjectId,
        required: true,
        unique: true
    },
    refreshToken: {
        type: String,
        required: true
    }
})

const AuthModel = model<AuthDoc>("Auth", AuthSchema)

export default AuthModel