import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import courseRoute from "./routes/courseRoute.js";

dotenv.config();
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://skill-hive-three.vercel.app"],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
app.use(cors({
  origin: ["http://localhost:5173", "https://skill-hive-three.vercel.app"],
  credentials: true,
}));
app.get("/", (req, res) => {
  res.send("API running ...");
});

app.set("trust proxy", 1)

app.use("/api/auth", authRouter);
app.use("/api/user", userRoute)
app.use('/api/course', courseRoute)

app.listen(port, () => {
  console.log(`server run port ${port}`);
  connectDb();
});
