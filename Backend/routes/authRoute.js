import express from "express";
import {googleAuth, login, logOut, resetPassword, sendOtp, signUp, verifyOtp} from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post("/signup", signUp)
authRouter.post('/login', login)
authRouter.get('/logout', logOut)

// ! Forgot Password
authRouter.post('/sendOtp', sendOtp)
authRouter.post('/verifyOtp', verifyOtp)
authRouter.post('/resetPassword', resetPassword)
authRouter.post('/googleAuth', googleAuth)


export default authRouter