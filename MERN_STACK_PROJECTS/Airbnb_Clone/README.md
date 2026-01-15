## cd Backend 
- npm i express nodemon express bcryptjs dotenv cors jsonwebtoken cookie-parser

## create folder
- config , models , routes , controllers , .env(file)

## connect to the database

- create cluster
- create models

- config ---> db.js

- models ---> user.model.js

- controller---> auth.controller.js

- routes ----> auth.routes.js



config---> token.js (code)



## database setup for backend


- model ---> user.model.js

```
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    },
    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    }
    

},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User;

```

- config ---> db.js

```
import mongoose from "mongoose";


const connectDB = async ()=>{
     try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected !!")
     } catch (error) {
        console.log("database connection error !!")
     }
}

export default connectDB;
```




## steps for authentication in backend



- controllers ----> auth.controller.js

- route ---> auth.routes.js

- index.js ---> use middleware   ===>  app.use("api/auth",authRouter)

- auth.controller.js

   - create signup (
      
      config : token.js
      index.js : app.use(express.json())
                 app.use(cookieParser())

   )
   - create login 
   - create signout



## now all files looks like


## - config 

- db.js

```
import mongoose from "mongoose";


const connectDB = async ()=>{
     try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected !!")
     } catch (error) {
        console.log("database connection error !!")
     }
}

export default connectDB;

```


- token.js

```

import jwt from "jsonwebtoken"

const genToken = async (userId) =>{
    try {
        let token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    } catch (error) {
        console.log("token error")
    }
}

export default genToken;

```


# - controller

- auth.controller.js


```
import cookieParser from "cookie-parser";
import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"


// SignUp controller
export const SignUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "user is already exists" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    let token = await genToken(user._id)
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_DEVELOPMENT = "production",
        sameSite : "strict",
        maxAge:7 * 24 * 60 * 60 * 1000

    })
    return res.status(201).json(user)
     
  } catch (error) {
     return res.status(500).json({message:`signup error ${error}`})
  }
};











// Login Controller
export const Login = async (req,res) =>{
    try {
        let {  email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user is not exist" });
    }

   
    let isMatch = await bcrypt.compare(password , user.password)
    if(!isMatch){
        return res.status(400).json({message:"incorrect password"})
    }

    let token = await genToken(user._id)
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_DEVELOPMENT = "production",
        sameSite : "strict",
        maxAge:7 * 24 * 60 * 60 * 1000

    })
    return res.status(201).json(user)
     
    } catch (error) {
        return res.status(500).json({message:`login error ${error}`})
    }
}





// LogOut controller

export const logOut = async (req,res) => {

    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Logout Successfully"})
    } catch (error) {
        return res.status(500).json({message:`SignOut error ${error}`})
    }
    
}

```


# - models


```
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    },
    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    }
    

},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User;

```



# -routes


```
import express from "express"
import { Login, logOut, SignUp } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/signup",SignUp)
authRouter.post("/login",Login)
authRouter.post("/logout",logOut)

export default authRouter;

```



# - .env


```
PORT = 3000

MONGODB_URL = "mongodb+srv://snapchat12snapgg_db_user:snapchat12@cluster0.8eztmfk.mongodb.net/AirbnbClone"

JWT_SECRET = "13DHDJFDNFDKF78437383DJ"

NODE_DEVELOPMENT = "development"

```


# - index.js


```
import express from 'express'
import dotenv from "dotenv"
import connectDB from './config/db.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
const port = process.env.PORT || 6000

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)



app.listen(port, () => {
    connectDB()
  console.log(`Example app listening on port ${port}`)
})


```


## move to frontend setup vite and tailwind css

## connect frontend to the backend

- using cors





## check that user has valid token or not
## middleware folder

- isAuth.js

```
import jwt from "jsonwebtoken"

const isAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies
        if(!token){
            res.status(400).json({message:"user does not have a token"})
        }

        let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
         if(!verifyToken){
            res.status(400).json({message:"user does not have a valid token"})
        }

        req.userId = verifyToken.userId
        next()
    } catch (error) {
        res.status(500).json({message:`isAuth error ${error}`})
    }
}

export default isAuth;

```


