import express from 'express'
import dotenv from "dotenv"
import connectDB from './config/db.js'
import authRouter from './routes/auth.routes.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 6000

app.use("/api/auth",authRouter)

app.listen(port, () => {
    connectDB()
  console.log(`Example app listening on port ${port}`)
})
