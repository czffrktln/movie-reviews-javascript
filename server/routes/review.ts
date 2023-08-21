import express, { Request, Response } from "express"
import mongoose from "mongoose"
import { z } from "zod"
import { verify } from "../middlewares/verify"
import { Review, ReviewType } from "../models/Review"
import { User } from "../models/User"
import { verifyToken } from "../middlewares/verifyToken"

const router = express.Router()

const { ObjectId } = mongoose.Types

const reviewZodSchema = z.object({
    user: z.string().transform((val) => new ObjectId(val)),
    movieId: z.string(),
    message: z.string(), 
    createdAt: z.date().optional(), 
    updatedAt: z.date().optional(), 
})
type reviewZodType = z.infer <typeof reviewZodSchema>

router.get('/movie/:id', async (req:Request, res:Response) => {
    const id = req.params.id
    const reviews = await Review.find({movieId: id}).populate('user').sort({createdAt: -1})
    return res.status(200).json(reviews)
})

router.get('/user/:id', async (req:Request, res:Response) => {
    try {
        const id = req.params.id
        const foundUser = await User.findOne({ _id: id })
        if (!foundUser) throw new Error("User not found.")
        const reviews = await Review.find({user: foundUser.id}).populate('user').sort({createdAt: -1})
        return res.status(200).json(reviews)
    } catch (error) {
        return res.sendStatus(400)
    }
})

router.post('/', verify(reviewZodSchema), verifyToken, async (req:Request, res:Response) => {
    if ( !res.locals.user ) return res.status(403).json("User not found.")
    const data = req.body as reviewZodType
    const newReview = await Review.create<ReviewType>(data)
    return res.status(201).json(newReview)
})

router.delete('/:id', verifyToken, async (req:Request, res:Response) => {
    if ( !res.locals.user ) return res.status(403).json("User not found.")
    try {
        const id = req.params.id
        const findReview = await Review.findByIdAndDelete(id)
        if (!findReview) throw new Error("Review not found.")
        return res.status(200).json("Review deleted.")
    } catch (error) {
        return res.status(404).json("Review not found.")
    }
})

export default router