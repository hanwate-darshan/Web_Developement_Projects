# Real time chat application -

to check that user is authorized or not.

for that purpose create a middleware 

token --> userId ---> return userId

## middleware 

- isAuth.js

```
import jwt from "jsonwebtoken"
const isAuth = async (req,res,next) => {
    try {
        let token = req.cookies.token

        if(!token){
           return  res.status(400).json({message:`Token is not found`})
        }

        let verifyToken = await jwt.verify(token,process.env.JWT_SECRET)
        req.userId = verifyToken.userId
        next()

    } catch (error) {
        return res.status(500).json({message:`isAuth Error ${error}`})
    }
}
export default isAuth;

```


## create a new controller for users

- controllers 

 - user.controllers.js
    - in this controllers we write user related controllers like search user , fetch users like this.

 ```
import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"

export const getCurrentUser = async (req,res) => {
    try {
        let userId = req.userId
        let user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found "})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(200).json({message:`user controller error ${error}`})
        
    }
}


export const editProfile = async (req,res) => {
    try {
        let {name} = req.body
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }
        let user = await User.findByIdAndUpdate(req.userId,{
            name,
            image

        },{new:true})

        if(!user){
            return res.status(400).json({message:"user is not found"})
        }

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({message:"Profile Error"})
    }
}


export const getOtherUser = async (req,res) =>{
    try{
        let users = await User.find({
            _id:{$ne:req.userId}
        }).select("-password")
        return res.status(200).json(users)
    }catch(error){
        return res.status(500).json({message:` get othprofile error ${error}`})
    }
}

 ```


 # now create route for user controllers

 - routes 

 - user.routes.js

 ```
import express from "express"
import { editProfile, getCurrentUser ,  getOtherUser} from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";


const userRouter = express.Router();

userRouter.get('/current',isAuth,getCurrentUser)
userRouter.get('/others',isAuth,getOtherUser)
userRouter.put('/profile',isAuth,upload.single("image"),editProfile)


export default userRouter;

 ```


## now update it to the index page

- index.js

```

import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.routes.js";
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
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  connectDB()
  console.log(`Example app listening on port ${port}`)
})


```

## har Route ko Update karna padata hai
