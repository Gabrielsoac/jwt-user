import { model, Schema } from "mongoose";

type TUserSchema = {
    name: string,
    email: string,
    password: string
}

const userSchema = new Schema<TUserSchema>(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true} 
    }
);

userSchema.index(
    {email: 1},
    {unique: true}
)

export const UserModel = model<TUserSchema>(
    'User',
    userSchema
)
