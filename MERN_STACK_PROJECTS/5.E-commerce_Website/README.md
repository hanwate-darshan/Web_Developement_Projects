# E-commerce Website


### npm install required package

```

npm i nodemon express mongoose bcryptjs cors multer cloudinary dotenv jsonwebtoken cookie-parser

```


### setup files

- setup files index.js

```

import express from "express"
import dotenv from "dotenv"
dotenv.config()


const app = express()

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


```


### initail files

- routes
- middleware
- controllers
- models
- config



### adding mongodb

- config ---> db.js

```

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected !!")
    } catch (error) {
        console.log("DB Error !!")
    }
    
}
export default connectDB;

```

- models ---> user.models.js


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
    cartData:{
        type:Object,
        default:{}
    }

},{timestamps:true,minimize:false})

const User = mongoose.model("User",userSchema)
export default User;

```














### now create simple authentication SignUp , Login and google Authentication


- npm i validator ---> iski help se hame pata chalta hai ki user ka email validate hai kya nahi.


- config ---> token.js

```
import jwt from "jsonwebtoken"

export const gentoken = async (userId) => {

    try {
        let token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    } catch (error) {
        console.log("token error")
    }
    
}

```

- controller ---> auth.controller.js

```
import User from "../models/user.model.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import { gentoken } from "../config/token.js"

export const signUp = async (req,res) => {
    try {
        const {name , email , password} = req.body
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:`User already exists..`})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:`Enter Valid Email..`})
            
        }
        
        if(password.length < 8){
            return res.status(400).json({message:`Password must be 8 characters..`})
        }

        let hassedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name , email , password:hassedPassword
        })

        let token = await gentoken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({user})
    } catch (error) {
        return res.status(400).json({message:`sign-up error ${error}`})
    }
}





export const Login = async (req,res) => {
    try {
        const { email , password} = req.body
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:`User is not found..`})
        }

        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:`Incorrect Password`})
        }

   
        let token = await gentoken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({user})
    } catch (error) {
        return res.status(400).json({message:`login error ${error}`})
    }
}


export const LogOut = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Logout Sucessfully !!"})
    } catch (error) {
        return res.status(500).json({message:"Logout error "})
        
    }
}

```

- routes ---> auth.routes.js

```
import express from "express"
import { Login, LogOut, signUp } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",Login)
authRouter.get("/logout",LogOut)

export default authRouter
```


- index.js

```
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


```

