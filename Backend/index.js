import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser'
import connectDb from './config/db.js'
import authRouter from "./routes/authRoute.js";

dotenv.config();
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("API running ...");
});

app.use('/api/auth', authRouter)

app.listen(port, () => {
  console.log(`server run port ${port}`);
  connectDb()
});


