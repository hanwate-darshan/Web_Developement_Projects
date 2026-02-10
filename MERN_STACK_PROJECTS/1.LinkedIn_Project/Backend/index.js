import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/users.routes.js"

dotenv.config()

const app = express()
const port = process.env.PORT 

// MIDDLEWARES
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(cookieParser())

// ROUTES
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

// SERVER
app.listen(port, () => {
  connectDB()
  console.log(`Server running on port ${port}`)
})
