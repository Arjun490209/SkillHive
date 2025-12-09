import express from "express";
import {login, logOut, resetPassword, sendOtp, signUp, verifyOtp} from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post("/signup", signUp)
authRouter.post('/login', login)
authRouter.get('/logout', logOut)

// ! Forgot Password
authRouter.post('/sendOtp', sendOtp)
authRouter.post('/verifyOtp', verifyOtp)
authRouter.post('/resetPassword', resetPassword)


export default authRouter