import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

/* ---------- Middlewares ---------- */

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

/* ---------- Routes ---------- */
app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);
app.use("/api/listing", listingRouter);

/* ---------- Server ---------- */
app.listen(port, async () => {
  await connectDB();
  console.log(`Server running on port ${port}`);
});
