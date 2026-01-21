import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config()

const app = express();
const port = process.env.PORT 

// 🔹 Middleware
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true

}))
app.use(express.json());
app.use(cookieParser());

// 🔹 Routes
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  connectDB()
  console.log(`Example app listening on port ${port}`)
})
