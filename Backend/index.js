import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://skill-hive-three.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("API running ...");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRoute)

app.listen(port, () => {
  console.log(`server run port ${port}`);
  connectDb();
});
