import mongoose, { Schema, InferSchemaType } from "mongoose"

const reviewSchema = new Schema ({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  movieId: {type: String, required: true},
  message: {type: String, required: true}, 
},{timestamps: { createdAt: true, updatedAt: true }})

export type ReviewType = InferSchemaType<typeof reviewSchema> & {updatedAt: Date, createdAt: Date}
export const Review = mongoose.model('Review', reviewSchema)