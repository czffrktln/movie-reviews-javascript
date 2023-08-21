import mongoose, { Schema, InferSchemaType } from "mongoose"

const userSchema = new Schema ({
    sub: String, 
    email: {type: String, required: true},
    picture: String,
    name: String
})

export type UserType = InferSchemaType<typeof userSchema>
export const User = mongoose.model('User', userSchema)