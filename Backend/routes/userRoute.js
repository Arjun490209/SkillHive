import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { getCurrentUser } from '../controllers/userController.js'

const userRoute = express.Router()

userRoute.get('/get-current-user', isAuth, getCurrentUser )


export default userRoute