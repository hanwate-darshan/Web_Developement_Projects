## - Installed Required files
 npm i express nodemon mongoose cors jsonwebtoken bcryptjs cookie-parser dotenv

## - Setup Folders
create required folders ----->> models , config , routes , controllers , middlewares 


## - setup Database - ATLAS setup 

- config
  - db.js

```
import mongoose from "mongoose"

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected!!")
    } catch (error) {
        console.log(`DataBase Connection Error ${error}`)
    }
}

export default connectDB;
```
## - Create Database model 

- models
   - user.data.models

```
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    userName:{
        type:String,
        required:true,
        unique:true
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
    image:{
        type:String,
        default:""
    }

},{timestamps:true})

const User = mongoose.model("User",userSchema);
```


## - Create authentication api

- controllers
   - auth.controllers.js
```
import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signUp = async (req,res) => {
    try {
        const {userName,email,password} = req.body;

        const checkUserByUserName = await User.findOne({userName})
        if (checkUserByUserName) {
            return res.status(400).json({message:"username is already Exists !!"})
        }
        
        const checkUserByEmail = await User.findOne({email})
        if (checkUserByEmail) {
            return res.status(400).json({message:"Email is already Exists !!"})
        }
        
        // six character password
        if(password.length < 6){
            return res.status(400).json({message:"Password Must Be Atleast 6 Charcters !!"})

        }

        //Hashed password using Bcrypt JS
        const hassedPassword = await bcrypt.hash(password,10)


        // create user
        const user = await User.create({
            userName,
            email,
            password : hassedPassword
        })

        // token
        const token = await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"None",
            secure:false
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.error(500).json({message:`signup error ${error}`})
    }
}




export const Login = async (req,res) => {
    try {
        const {email,password} = req.body;

        
        
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message:"User Does not  Exists !!"})
        }
        
        
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect Password !!"})
            
        }


        

        // token
        const token = await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"None",
            secure:false
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.error(500).json({message:`Login error ${error}`})
    }
}






export const LogOut = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Logout Successfully !! "})
    } catch (error) {
        return res.error(500).json({message:`Login error ${error}`})
        
    }
}

```

- routes
   - auth.routes.js  

 ```
import express from "express"
import { Login, LogOut, signUp } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post('/signup',signUp)
authRouter.post('/login',Login)
authRouter.get('/logout',LogOut)

export default authRouter;
 ```


-config 
   - token.js
   
```
import jwt from "jsonwebtoken"
// Generate Token
const genToken = async (userId) => {
    try {
        const token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    } catch (error) {
        console.log(`genToken ${error}`)
    }
}

export default genToken;
```



  