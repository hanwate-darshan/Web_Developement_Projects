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




## - now create a and setup frontend

## - now create login and signup page

## - Signup Page:

```

import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import axios from "axios"
import { serverURL } from "../main";



const SignUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      let result = await axios.post(`${serverURL}/api/auth/signup`,
        {
          userName, email, password
        }, { withCredentials: true }
      )
      console.log(result)
    } catch (error) {
      console.log(`frontend signup error ${error}`)
    }
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex justify-center items-center px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="h-40 bg-linear-to-r from-pink-500 to-purple-500 flex justify-center items-center rounded-b-[30%]">
          <h1 className="text-3xl font-bold text-white">
            Welcome to
            <span className="text-blue-200"> Nano</span>Chat
          </h1>
        </div>

        {/* Form */}
        <form className="p-8 flex flex-col gap-5" onSubmit={handleSignUp}>

          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="Username"
            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          <input
            value={email}
            onChange={(e) => setUserName(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          {/* Password */}
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-11 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            <span
              className="absolute right-3 top-3 text-gray-500 text-xl cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <FaEye /> : <IoMdEyeOff />}
            </span>
          </div>

          <button
            type="submit"
            className="mt-4 w-full h-11 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition cursor-pointer"
          >
            Create Account
          </button>

          <p
            className="text-sm text-center text-gray-500 mt-2 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already have an account?{" "}
            <span className="text-pink-500 font-bold hover:underline">
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default SignUp;


```


## - cors -->
   - index.js

```
import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  connectDB()
  console.log(`Example app listening on port ${port}`)
})

```


## - Login Page


```

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

import { serverURL } from "../main.jsx";
import axios from "axios"

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
  
  
    const handleLogin = async (e) => {
      e.preventDefault()
      setLoading(true)
      try {
        let result = await axios.post(`${serverURL}/api/auth/login`,
          {
             email, password
          }, { withCredentials: true }
        )
        setErr("")
        setLoading(false)
        setEmail("")
        setPassword("")
        console.log(result)
      } catch (error) {
        console.log(`frontend Login error ${error}`)
        setLoading(false)
        setErr(error.response.data.message)
      }
    }

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex justify-center items-center px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="h-40 bg-linear-to-r from-pink-500 to-purple-500 flex justify-center items-center rounded-b-[30%]">
          <h1 className="text-3xl font-bold text-white">
            Login to 
            <span className="text-blue-200"> Nano</span>Chat
          </h1>
        </div>

        {/* Form */}
        <form className="p-8 flex flex-col gap-5" onSubmit={handleLogin}>

         
          <input
           value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          {/* Password */}
          <div className="relative">
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-11 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            <span
              className="absolute right-3 top-3 text-gray-500 text-xl cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <FaEye /> : <IoMdEyeOff />}
            </span>
          </div>
           

           {err && <p className="text-red-500 text-center font-semibold">{err}</p>}

          <button
          disabled={loading}
            type="submit"
            className="mt-4 w-full h-11 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition cursor-pointer"
          >
            {loading?"Loading..":"Login"}
          </button>

          <p
            className="text-sm text-center text-gray-500 mt-2 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            want to create a new acccount ?{" "}
            <span className="text-pink-500 font-bold hover:underline">
              Sign Up
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;

```

---

## - Creating Authentication Middleware

  ### - basically in this step ----> cookies ---> token ---> userId se hame pata chalega ki user authorized hai ya nahi hai
   #### - find token ---> verify token ---> req.userId = verifyToken.userId


- middleware
   - isAuth.js

```
import jwt from "jsonwebtoken"
const isAuth = async (req,res,next) => {
    try {
        let token = req.cookies.token

        if(!token){
            res.status(400).json({message:`Token is not found`})
        }

        let verifyToken = await jwt.verify(token,process.env.JWT_SECRET)
        req.userId = verifyToken.userId
        next()

    } catch (error) {
        return res.status(500).json({message:`isAuth Error ${error}`})
    }
}
```

#### - to get current User details - create controllers


- controllers
   - user.controllers.js

```

```

- routes
  - user.routes.js

```
import express from "express"
import { getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";


const userRouter = express.Router();

userRouter.post('/current',isAuth,getCurrentUser)


export default userRouter;
```


### setup redux toolkit --

npm i @reduxjs/toolkit
npm i react-redux


#### create a folder --> redux ---> store.js

```
import {configureStore} from "@reduxjs/toolkit"
export  const store = configureStore({
    
})

```




- main.jsx
```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux"
import { store } from './redux/store.js';
export const serverURL = "http://localhost:3000";

createRoot(document.getElementById('root')).render(
  

  <BrowserRouter>
  <Provider store={store}>
  <App />
  </Provider>
  </BrowserRouter>
  
)


```

-- redux 
  - store.js
  ```

  ```


  - userSlice.js

  ```
  import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{ userData:null , profileData:null },
    reducers:{ setUserData:(state,action)=>{ state.userData = action.payload  }}
})
export const { setUserData } = userSlice.actions;

export default userSlice.reducer
  ```




## Image Setup :

### config ---> cloudinary.js
#### go to cloudinary website and get api key
```
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    })


    try {
        const uploadResult = await cloudinary.uploader.upload(filePath)
        fs.unlinkSync(filePath)
        return uploadResult.secure_url
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log(error)
    }
}

export default uploadOnCloudinary;
```

## now setup multer ---> middleware

- multer.js

```
import multer from "multer"

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

export const upload = multer.MulterError({storage})

```

- controllers
 
 user.controllers.js

```

```


- routes

  - user.routes.js


```
import express from "express"
import { editProfile, getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";


const userRouter = express.Router();

userRouter.get('/current',isAuth,getCurrentUser)
userRouter.put('/profile',isAuth,upload.single("image"),editProfile)


export default userRouter;

```
