import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

const port = process.env.PORT || 4000  

app.use(cors({
  origin:"http:localhost:5173",
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connectDB()
})