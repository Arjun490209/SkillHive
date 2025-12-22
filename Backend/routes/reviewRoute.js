import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { createReview, getReview } from '../controllers/reviewController.js'

const reviewRouter = express.Router()

reviewRouter.post("/create-review",isAuth, createReview )
reviewRouter.get('/get-review',getReview)



export default reviewRouter