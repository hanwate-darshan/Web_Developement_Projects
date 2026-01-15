import express from "express"
import isAuth from "../middleware/isAuth.jsx";
import { getCurrentUser } from "../controllers/user.controller.jsx";

let userRoute = express.Router();
userRoute.get("/currentuser",isAuth,getCurrentUser)



export default userRoute;