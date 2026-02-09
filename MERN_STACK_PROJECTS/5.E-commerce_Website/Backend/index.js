import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
dotenv.config()


const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    connectDB()
  console.log(`Example app listening on port ${port}`)
})
