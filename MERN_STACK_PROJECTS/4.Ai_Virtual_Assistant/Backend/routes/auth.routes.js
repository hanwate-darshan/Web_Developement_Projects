import express from "express"
import { Login, LogOut, signUP } from "../controllers/auth.controller.js";

const authRouter  = express.Router();

authRouter.post("/signup",signUP)
authRouter.post("/login",Login)
authRouter.get("/logout",LogOut)

export default authRouter