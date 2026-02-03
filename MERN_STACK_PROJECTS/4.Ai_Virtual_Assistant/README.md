### npm i express mongoose dotenv nodemon jsonwebtoken bcryptjs cookie-parser cloudinary multer 


### create a folder such as ----> models , controllers , routes , config , middleware 


### connect Database first step:

- config ---> db.js

```
import mongoose from "mongoose"
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected !!")
    } catch (error) {
        console.log(`database error ${error}`)
    }
}

export default connectDB;

```

### now create database model for particuler project according to that

- models  ---> user.model.js

```
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    assistantName:{
        type:String
    },
    assistantImage:{
        type:String
    },
    history:[
        {type:String}
    ]


},{timestamps:true})


const User = mongoose.model("User",userSchema)

export default User;

```


### now setup authentication----

- config ---> token.js (create token) then add to the controllers

```
import jwt from "jsonwebtoken"
const genToken = async (userId) => {
    try {
        const token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"10d"})
        return token
    } catch (error) {
        console.log(error)
    }
}
export default genToken;
```


- controllers ----> auth.controller.js

```
import genToken from "../config/token.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signUP = async (req,res) => {
    try {
        const {name , email,password} = req.body
        
        const existEmail = await User.findOne({email});
        if(existEmail){
            return res.status(400).json({message:`Email Already Exists`})
        }
        
        if(password.length < 6){
            return res.status(400).json({message:`Password Must be Atleast 6 Character`})
        }
        
        const hassedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password:hassedPassword
        })

        const token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:false
        })

        return res.status(201).json(user)


    } catch (error) {
        return res.status(500).json({message:`signup error ${error}`})
    }
}





export const Login = async (req,res) => {
    try {
        const { email,password} = req.body
        
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:`Email Doesn't Exists`})
        }
        
        const isMatch = await bcrypt.compare(password,user.password)
        
        if(!isMatch){
            return res.status(400).json({message:`Incorrect Password`})
            
        }


        const token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:false
        })

        return res.status(200).json(user)


    } catch (error) {
        return res.status(500).json({message:`login error ${error}`})
    }
}



export  const LogOut = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:`Logout Successfully`})
    } catch (error) {
        
        return res.status(200).json({message:`Logout error ${error}`})
    }
}

```



### ye sab hone ke baad iska routes banao

- routes --> auth.routes.js

```
import express from "express"
import { Login, LogOut, signUP } from "../controllers/auth.controller.js";

const authRouter  = express.Router();

userRouter.post("/signup",signUP)
userRouter.post("/login",Login)
userRouter.get("/logout",LogOut)

export default authRouter;

```


### index.js 


```

import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config()
const app = express()
const port = process.env.PORT;

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`)
})



```




### so this is the complete authentication tutorial...



### now move to the frontend and create frontend pages



- user.context.jsx

```
import React, { createContext } from 'react'
export const userDataContext = createContext()
const UserContext = ({children}) => {
    const serverUrl = `http://localhost:3000`
    const value = {
        serverUrl
    }
  return (
    <div>
        <userDataContext.Provider value={value}>

        {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext


```


- main.jsx

```
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import UserContext from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <UserContext>
    <App />
  </UserContext>
  </BrowserRouter>
  
)


```


- index.js

```
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config()
const app = express()
const port = process.env.PORT;

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`)
})


```








- signUp.jsx

```

import React, { useState } from "react";
import authBg from "../assets/authBg.png";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import {useNavigate} from "react-router-dom"
import { useContext } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios"


const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [Name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {serverUrl} = useContext(userDataContext)
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)


  const handleSignUp = async (e) => {
    e.preventDefault()
    setErr("")
    setLoading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/signup`,{
        Name,email,password                            
      },{withCredentials:true})
      
      setLoading(false)
      console.log(result.data)
    } catch (error) {
      console.log(error)
      setErr(error.response.data.message)
      setLoading(false)
      
    }
  }

  return (
    <div
    
      className="w-full h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form className="w-[90%] max-w-lg bg-white/10 backdrop-blur-xl 
      border border-white/20 shadow-2xl shadow-blue-900/50 
      rounded-3xl flex justify-center items-center flex-col 
      px-8 py-10 gap-6" onSubmit={handleSignUp}>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-white tracking-wide">
          SignUp to{" "}
          <span className="text-blue-400 drop-shadow-lg">
            Virtual Assistant
          </span>
        </h1>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="Enter Your Name"
          className="w-full px-5 py-3 rounded-xl bg-black/40 
          text-white placeholder-gray-300 outline-none 
          border border-transparent focus:border-blue-400 
          focus:ring-2 focus:ring-blue-500 transition"
          required
          value={Name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-5 py-3 rounded-xl bg-black/40 
          text-white placeholder-gray-300 outline-none 
          border border-transparent focus:border-blue-400 
          focus:ring-2 focus:ring-blue-500 transition"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <div className="w-full relative">

        
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="w-full px-5 py-3 rounded-xl bg-black/40 
          text-white placeholder-gray-300 outline-none 
          border border-transparent focus:border-blue-400 
          focus:ring-2 focus:ring-blue-500 transition "
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}

          />
  

           {!showPassword && <ImEye className="absolute top-4 right-5 text-gray-300 text-xl cursor-pointer" onClick={()=>setShowPassword(true)}/> }

            {showPassword && <ImEyeBlocked  className="absolute top-4 right-5 text-gray-300 text-xl cursor-pointer" onClick={()=>setShowPassword(false)}/> }

          
          
          </div>

          {err.length> 0 && <p className="text-red-500">{err}</p>}

        {/* Button */}
        <button
          className="w-full py-3 rounded-xl bg-blue-500 
          hover:bg-blue-600 active:scale-95 
          transition font-semibold text-white shadow-lg 
          shadow-blue-600/40 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <p onClick={()=>navigate("/login")} className="text-gray-300 cursor-pointer">Already have an account ? <span className="font-bold text-blue-300 
          hover:text-blue-400 ">Login</span> </p>
      </form>
    </div>
  );
};

export default SignUp;



```


- login.jsx

```

import React, { useState } from "react";
import authBg from "../assets/authBg.png";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import {useNavigate} from "react-router-dom"
import { useContext } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios"


const Login = () => {

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {serverUrl} = useContext(userDataContext)
  const [err, setErr] = useState("")
  const [loading,setLoading] = useState(false)



  const handleLogin = async (e) => {
    e.preventDefault()
    setErr("")
    setLoading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/login`,{
        email,password                            
      },{withCredentials:true})

      console.log(result.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setErr(error.response.data.message)
      setLoading(false)
      
    }
  }

  return (
    <div
    
      className="w-full h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form className="w-[90%] max-w-lg bg-white/10 backdrop-blur-xl 
      border border-white/20 shadow-2xl shadow-blue-900/50 
      rounded-3xl flex justify-center items-center flex-col 
      px-8 py-10 gap-6" onSubmit={handleLogin}>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-white tracking-wide">
          Login to{" "}
          <span className="text-blue-400 drop-shadow-lg">
            Virtual Assistant
          </span>
        </h1>

        

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-5 py-3 rounded-xl bg-black/40 
          text-white placeholder-gray-300 outline-none 
          border border-transparent focus:border-blue-400 
          focus:ring-2 focus:ring-blue-500 transition"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <div className="w-full relative">

        
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="w-full px-5 py-3 rounded-xl bg-black/40 
          text-white placeholder-gray-300 outline-none 
          border border-transparent focus:border-blue-400 
          focus:ring-2 focus:ring-blue-500 transition "
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}

          />
  

           {!showPassword && <ImEye className="absolute top-4 right-5 text-gray-300 text-xl cursor-pointer" onClick={()=>setShowPassword(true)}/> }

            {showPassword && <ImEyeBlocked  className="absolute top-4 right-5 text-gray-300 text-xl cursor-pointer" onClick={()=>setShowPassword(false)}/> }

          
          
          </div>

          {err.length> 0 && <p className="text-red-500">{err}</p>}

        {/* Button */}
        <button
          className="w-full py-3 rounded-xl bg-blue-500 
          hover:bg-blue-600 active:scale-95 
          transition font-semibold text-white shadow-lg 
          shadow-blue-600/40 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Loading..":"Login"}
        </button>
        <p onClick={()=>navigate("/signup")} className="text-gray-300 cursor-pointer">Want to create an new account ? <span className="font-bold text-blue-300 
          hover:text-blue-400 ">Sign up</span> </p>
      </form>
    </div>
  );
};

export default Login;


```




### abhi iske baad authorization ka middleware banana hai
