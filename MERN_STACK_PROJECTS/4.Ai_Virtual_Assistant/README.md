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



## Authorization :
### abhi iske baad authorization ka middleware banana hai

- middleware ---> isAuth.js

```
import jwt from "jsonwebtoken"
const isAuth = async (req,res,next) => {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({message:`token not found `})
        }

        const verifyToken = await jwt.verify(token,process.env.JWT_SECRET)

        req.userId = verifyToken.userId
        next()

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:`isAuth error ${error}`})
    }
}

export default isAuth
```






### create new controller 

- controller ---> user.controller.js

```
import User from "../models/user.model.js"

export const getCurrentUser = async (req,res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:`user not found`})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({message:`get current user error ${error}`})
        
    }
    
}

```


### now create route for this

route ---> user.routes.js

```
import express from "express"
import { getCurrentUser } from "../controllers/user.controller.js";

const userRouter  = express.Router();


userRouter.get("/current",isAuth,getCurrentUser)

export default userRouter

```


- index.js

```
import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.routes.js";

const app = express()
const port = process.env.PORT;

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`)
})

```

### now setup cloudinary image and image handling 

- config ----> cloudinary.js

```
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
    const uploadResult = await cloudinary.uploader.upload(filePath)
    fs.unlinkSync(filePath)
    return uploadResult.secure_url
} catch (error) {
        fs.unlinkSync(filePath)
        return res.status(500).json({message:"cloudinary error"})
        
    }
}

export default uploadOnCloudinary
```


- middleware -----> multer.js

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

const upload = multer({storage})

export default upload;
```

### now move to the frontend

fetch current user api

- userContext.jsx

```
import React, { createContext, useState } from 'react'
export const userDataContext = createContext()
import axios from "axios"
import { useEffect } from 'react';

const UserContext = ({children}) => {
    const serverUrl = `http://localhost:3000`;

    const [userData,setUserData] = useState(null)
    
    const handleCurrentUser = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
        setUserData(result.data)
        console.log(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        handleCurrentUser()
    },[])

    const value = {
        serverUrl , userData,setUserData
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



### check authorization user if not then move to the home page:


- app.jsx

```
import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Customized from './pages/Customized.jsx'
import { userDataContext } from './context/UserContext.jsx'
import Home from './pages/Home.jsx'


const App = () => {
  const {userData,setUserData} = useContext(userDataContext)
  return (
    <div>
      <Routes>
        <Route path="/" element={(userData?.assistantImage && userData?.assistantName)? <Home /> : <Navigate to={"/customize"} />} />
        <Route path="/signup" element={!userData? <SignUp />: <Navigate to={"/"} />} />
        <Route path="/login" element={!userData? <Login /> : <Navigate to={"/"} />} />
        <Route path="/customize" element={userData?<Customized />:<Navigate to={"/login"} />} />
      </Routes>
    </div>
  )
}

export default App

```


- SignUp.jsx

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
  const {serverUrl ,  userData,setUserData} = useContext(userDataContext)
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
      
      setUserData(result.data)
      setLoading(false)
      navigate("/customize")

      
    } catch (error) {
      console.log(error)
      setUserData(null)
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


- Login.jsx

```
import React, { useState } from "react";
import authBg from "../assets/authBg.png";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import {useNavigate} from "react-router-dom"
import { useContext } from "react";
import { userDataContext   } from "../context/UserContext.jsx";
import axios from "axios"


const Login = () => {

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {serverUrl,userData,setUserData} = useContext(userDataContext)
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

      
      setUserData(result.data)
      setLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error)
      setErr(error.response.data.message)
      setLoading(false)
      setUserData(null)
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




### now create a customization page :


- pages ---> customized.jsx

```


import React, { useState } from "react";
import Card from "../components/Card.jsx";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image4.png";
import image4 from "../assets/image5.png";
import image5 from "../assets/image6.jpeg";
import image6 from "../assets/image7.jpeg";
import image7 from "../assets/authBg.png";
import { RiImageAiFill } from "react-icons/ri";

const Customized = () => {
  const [frontendImage, setFrontendImage] = useState(null)
  const [BackendImage, setBackendImage] = useState(null)
  return (
    <div
      className="w-full min-h-screen overflow-auto 
      flex flex-col items-center justify-start
      bg-linear-to-t from-black to-[#0a0a69]
      px-4 py-10"
    >
      {/* Heading */}
      <h1
        className="text-2xl sm:text-3xl md:text-4xl 
        font-bold text-white text-center mb-10"
      >
        Select your{" "}
        <span className="text-blue-400 drop-shadow-lg">
          Assistant Image
        </span>
      </h1>

      {/* Cards Wrapper */}
      <div
        className="w-full max-w-6xl 
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        gap-6 place-items-center"
      >
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* AI Custom Card */}
        <div
          className="w-35 h-55 sm:w-37.5 sm:h-60 
          bg-[#090945] border-2 border-blue-800 
          rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40
          hover:border-blue-400 flex items-center justify-center"
        >
          <RiImageAiFill className="text-5xl text-white" />
        </div>
      </div>

      {/* Button */}
      <button
        className="mt-12 px-10 py-3 rounded-full 
        bg-blue-500 hover:bg-blue-600 
        text-white font-semibold text-lg
        shadow-lg shadow-blue-500/40
        transition-all duration-300 active:scale-95 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Customized;


```


- components ---> Card.jsx

```

import React from "react";

const Card = ({ image }) => {
  return (
    <div
      className="
        w-35 h-55
        sm:w-37.5 sm:h-60
        md:w-40 md:h-62.5
        lg:w-42.5 lg:h-67.5

        bg-[#090945]
        border-2 border-blue-800
        rounded-2xl
        overflow-hidden
        cursor-pointer

        transition-all duration-300 ease-in-out
        hover:scale-105
        hover:shadow-2xl hover:shadow-blue-600/40
        hover:border-blue-400
      "
    >
      <img
        src={image}
        alt="assistant"
        className="
          w-full h-full object-cover
          transition-all duration-300 ease-in-out
          hover:brightness-110
        "
      />
    </div>
  );
};

export default Card;


```


###  now setup frontend image and backend image 

```
  const [frontendImage, setFrontendImage] = useState(null)
  const [BackendImage, setBackendImage] = useState(null)



  <input type="file" accept="image/*" hidden ref={inputImage}/>



  <div
          className="w-35 h-55 sm:w-37.5 sm:h-60 
          bg-[#090945] border-2 border-blue-800 
          rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40
          hover:border-blue-400 flex items-center justify-center"
          onClick={()=>inputImage.current.click()}
 >


let inputImage = useRef()

```


### complete image setup

```


import React, { useRef, useState } from "react";
import Card from "../components/Card.jsx";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image4.png";
import image4 from "../assets/image5.png";
import image5 from "../assets/image6.jpeg";
import image6 from "../assets/image7.jpeg";
import image7 from "../assets/authBg.png";
import { RiImageAiFill } from "react-icons/ri";

const Customized = () => {
  const [frontendImage, setFrontendImage] = useState(null)
  const [BackendImage, setBackendImage] = useState(null)
  let inputImage = useRef()


  const handleImage = (e) =>{
      const file = e.target.files[0]
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
  }
  return (
    <div
      className="w-full min-h-screen overflow-auto 
      flex flex-col items-center justify-start
      bg-linear-to-t from-black to-[#0a0a69]
      px-4 py-10"
    >
      {/* Heading */}
      <h1
        className="text-2xl sm:text-3xl md:text-4xl 
        font-bold text-white text-center mb-10"
      >
        Select your{" "}
        <span className="text-blue-400 drop-shadow-lg">
          Assistant Image
        </span>
      </h1>

      {/* Cards Wrapper */}
      <div
        className="w-full max-w-6xl 
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        gap-6 place-items-center"
      >
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* AI Custom Card */}
   



        <div
          className="w-35 h-55 sm:w-37.5 sm:h-60 
          bg-[#090945] border-2 border-blue-800 
          rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40
          hover:border-blue-400 flex items-center justify-center"
          onClick={()=>inputImage.current.click()}
          >
          {!frontendImage && <RiImageAiFill className="text-5xl text-white" />}
            {frontendImage && <img src={frontendImage} className="h-full object-cover" /> }
          
        </div>
      </div>


      <input type="file" accept="image/*" hidden ref={inputImage}   onChange={handleImage} />



      {/* Button */}
      <button
        className="mt-12 px-10 py-3 rounded-full 
        bg-blue-500 hover:bg-blue-600 
        text-white font-semibold text-lg
        shadow-lg shadow-blue-500/40
        transition-all duration-300 active:scale-95 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Customized;


```

### ham context ki madat se bhi kar sakte hai ye sab 





- context ----> UserContext.jsx

```

import React, { createContext, useState } from 'react'
export const userDataContext = createContext()
import axios from "axios"
import { useEffect } from 'react';

const UserContext = ({children}) => {
    const serverUrl = `http://localhost:3000`;

    const [userData,setUserData] = useState(null)
     const [frontendImage, setFrontendImage] = useState(null)
      const [BackendImage, setBackendImage] = useState(null)
      const [selectedImage,setSelectedImage] = useState(null)
    
    const handleCurrentUser = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
        setUserData(result.data)
        console.log(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        handleCurrentUser()
    },[])

    const value = {
        serverUrl , userData , setUserData , frontendImage, setFrontendImage , BackendImage, setBackendImage , selectedImage ,setSelectedImage
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


- Customized.jsx


```
import React, { useContext, useRef, useState } from "react";
import Card from "../components/Card.jsx";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image4.png";
import image4 from "../assets/image5.png";
import image5 from "../assets/image6.jpeg";
import image6 from "../assets/image7.jpeg";
import image7 from "../assets/authBg.png";
import { RiImageAiFill } from "react-icons/ri";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const Customized = () => {
 
  let inputImage = useRef()
   const { serverUrl , userData , setUserData , frontendImage, setFrontendImage , BackendImage, setBackendImage , selectedImage ,setSelectedImage} = useContext(userDataContext)

   const navigate = useNavigate()

  const handleImage = (e) =>{
      const file = e.target.files[0]
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
  }
  return (
    <div
      className="w-full min-h-screen overflow-auto 
      flex flex-col items-center justify-start
      bg-linear-to-t from-black to-[#0a0a69]
      px-4 py-10"
    >
      {/* Heading */}
      <h1
        className="text-2xl sm:text-3xl md:text-4xl 
        font-bold text-white text-center mb-10"
      >
        Select your{" "}
        <span className="text-blue-400 drop-shadow-lg">
          Assistant Image
        </span>
      </h1>

      {/* Cards Wrapper */}
      <div
        className="w-full max-w-6xl 
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        gap-6 place-items-center"
      >
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* AI Custom Card */}
   



        <div
          className= {`w-35 h-55 sm:w-37.5 sm:h-60 
          bg-[#090945] border-2 border-blue-800 
          rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40
          hover:border-blue-400 flex items-center justify-center ${selectedImage == "input" ? "border-8 border-white-800":null} `}

          onClick={()=>{
            inputImage.current.click()
            setSelectedImage("input")
          }}
          >
          {!frontendImage && <RiImageAiFill className="text-5xl text-white" />}
            {frontendImage && <img src={frontendImage} className="h-full object-cover" /> }
          
        </div>
      </div>


      <input type="file" accept="image/*" hidden ref={inputImage}   onChange={handleImage} />



      {/* Button */}

      {selectedImage && <button  
      onClick={()=>navigate("/customize2")}
        className="mt-12 px-10 py-3 rounded-full 
        bg-blue-500 hover:bg-blue-600 
        text-white font-semibold text-lg
        shadow-lg shadow-blue-500/40
        transition-all duration-300 active:scale-95 cursor-pointer"
      >
        Next
      </button>}
      
    </div>
  );
};

export default Customized;


```











#### now create a controller for update profile :


- controller ----> user.controller.js

```
import User from "../models/user.model.js"
import uploadOnCloudinary from "../config/cloudinary.js"

export const getCurrentUser = async (req,res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:`user not found`})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({message:`get current user error ${error}`})
        
    }
    
}


export const updateAssistant = async (req,res) => {
    try {
        const {AssistantName,imageUrl} = req.body
        
        // input image photo
        let assistantImage;
        if(req.file){
            assistantImage = await uploadOnCloudinary (req.file.path)
        }else{ // existing image
            assistantImage = imageUrl
        }

        const user = await User.findByIdAndUpdate(req.userId,{
            AssistantName,assistantImage
        },{new:true}).select("-password")

        return res.status(200).json(user)

    } catch (error) {
        return res.status(400).json({message:`update assistant error ${error}`})
    }
}
```

- route ----> user.routes.js

```
import express from "express"
import { getCurrentUser, updateAssistant } from "../controllers/user.controller.js";
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"

const userRouter  = express.Router();


userRouter.get("/current",isAuth,getCurrentUser)
userRouter.post("/update",isAuth,upload.single("AssistantImage"),updateAssistant)

export default userRouter



```



### now fetch this api in frontend













### home.jsx code handleLogout login 

```


import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { userData , serverUrl , setUserData } = useContext(userDataContext);
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      setUserData(null)
      navigate("/login")
    } catch (error) {
      console.log(error)
      setUserData(null)
    }
  }


  return (
    <div
      className="w-full min-h-screen 
      bg-linear-to-br from-black via-[#06063a] to-[#0a0a69]
      flex flex-col items-center px-4 py-8"
    >
      {/* Top Action Bar */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-10">
        <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-wide ">
          Dashboard
        </h1>

        <div className="flex gap-3">
          <button
            className="px-5 py-2 rounded-full
            bg-blue-500/90 hover:bg-blue-600
            text-white text-sm font-semibold
            transition-all duration-300 active:scale-95 cursor-pointer"
            onClick={handleLogOut}
          >
            Customize
          </button>

          <button
            className="px-5 py-2 rounded-full
            bg-red-500/90 hover:bg-red-600
            text-white text-sm font-semibold
            transition-all duration-300 active:scale-95 cursor-pointer"
            onClick={()=>navigate("/customize")}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Assistant Showcase */}
      <div
        className="w-full max-w-sm sm:max-w-md md:max-w-lg
        bg-white/10 backdrop-blur-xl
        border border-white/20
        rounded-3xl shadow-2xl
        flex flex-col items-center
        p-6 gap-6"
      >
        {/* Image */}
        <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden relative">
          <img
            src={userData?.assistantImage}
            alt="Assistant"
            className="w-full h-full object-cover"
          />

          {/* Glow overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Name */}
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          I’m{" "}
          <span className="text-blue-400 tracking-wide">
            {userData?.assistantName}
          </span>
        </h2>

        {/* Sub text */}
        <p className="text-sm text-gray-300 text-center max-w-xs">
          Your personalized virtual assistant is ready to help you anytime.
        </p>

        {/* Action */}
        <button
          className="mt-2 w-full py-3 rounded-xl
          bg-blue-500 hover:bg-blue-600
          text-white font-semibold
          shadow-lg shadow-blue-500/40
          transition-all duration-300 active:scale-95"
        >
          Start Conversation
        </button>
      </div>
    </div>
  );
};

export default Home;




```


### now all the frontend file looks like this


- customized.jsx

```
import React, { useContext, useRef, useState } from "react";
import Card from "../components/Card.jsx";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image4.png";
import image4 from "../assets/image5.png";
import image5 from "../assets/image6.jpeg";
import image6 from "../assets/image7.jpeg";
import image7 from "../assets/authBg.png";
import { RiImageAiFill } from "react-icons/ri";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";

const Customized = () => {

  let inputImage = useRef()
  const { serverUrl, userData, setUserData, frontendImage, setFrontendImage, BackendImage, setBackendImage, selectedImage, setSelectedImage } = useContext(userDataContext)

  const navigate = useNavigate()

  const handleImage = (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  return (
    <div
      className="w-full min-h-screen overflow-auto 
      flex flex-col items-center justify-start
      bg-linear-to-t from-black to-[#0a0a69]
      px-4 py-10 relative"
    >

      {/* Heading */}
      <IoArrowBackCircle onClick={() => navigate("/")} className="absolute top-10 left-10 text-white  text-5xl  transition-all duration-300  hover:scale-95 cursor-pointer" />
      <h1
        className="text-2xl sm:text-3xl md:text-4xl 
        font-bold text-white text-center mb-10"
      >
        Select your{" "}
        <span className="text-blue-400 drop-shadow-lg">
          Assistant Image
        </span>
      </h1>

      {/* Cards Wrapper */}
      <div
        className="w-full max-w-6xl 
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        gap-6 place-items-center"
      >
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* AI Custom Card */}




        <div
          className={`w-35 h-55 sm:w-37.5 sm:h-60 
          bg-[#090945] border-2 border-blue-800 
          rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40
          hover:border-blue-400 flex items-center justify-center ${selectedImage == "input" ? "border-8 border-white-800" : null} `}

          onClick={() => {
            inputImage.current.click()
            setSelectedImage("input")
          }}
        >
          {!frontendImage && <RiImageAiFill className="text-5xl text-white" />}
          {frontendImage && <img src={frontendImage} className="h-full object-cover" />}

        </div>
      </div>


      <input type="file" accept="image/*" hidden ref={inputImage} onChange={handleImage} />



      {/* Button */}

      {selectedImage && <button
        onClick={() => navigate("/customize2")}
        className="mt-12 px-10 py-3 rounded-full 
        bg-blue-500 hover:bg-blue-600 
        text-white font-semibold text-lg
        shadow-lg shadow-blue-500/40
        transition-all duration-300 active:scale-95 cursor-pointer"
      >
        Next
      </button>}

    </div>
  );
};

export default Customized;

```

- customized2.jsx

```
import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import { IoArrowBackCircle } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Customized1 = () => {
  const {userData,backendImage,selectedImage,serverUrl,setUserData} = useContext(userDataContext)
  // const [AssistantName, setAssistantName] = useState(userData?.AssistantName || " ")
  const [assistantName, setAssistantName] = useState(userData?.assistantName)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleUpdateAssistant = async () => {
    setLoading(true)
    try {
      let formData = new FormData()
      formData.append("assistantName",assistantName)
      if(backendImage){
        formData.append("assistantImage",backendImage)
      }else{
        formData.append("imageUrl",selectedImage)
      }
      let result = await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
      console.log(result.data)
      setUserData(result.data)
      setLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (



    <div
      className="w-full min-h-screen overflow-auto 
      flex flex-col items-center justify-center
      bg-linear-to-t from-black to-[#0a0a69]
      px-4 py-10 relative"
    >
      <IoArrowBackCircle onClick={()=>navigate("/customize")} className="absolute top-15 left-15 text-white  text-5xl  

        transition-all duration-300 
        hover:scale-95 cursor-pointer" />
      {/* Heading */}
      <h1
        className="text-2xl sm:text-3xl md:text-4xl 
        font-bold text-white text-center mb-10"
      >
        Enter Your{" "}
        <span className="text-blue-400 drop-shadow-lg">
          Assistant Name
        </span>
      </h1>

      {/* Input */}
      <input
      onChange={(e)=>setAssistantName(e.target.value)}
      value={assistantName}
        type="text"
        placeholder="eg. Gemini"
        className="w-full max-w-md px-6 py-4 rounded-xl
        bg-[#090945] border-2 border-blue-700
        text-white placeholder-gray-400
        outline-none focus:border-blue-400
        focus:ring-2 focus:ring-blue-500
        transition-all duration-300"
      />
 

       {assistantName && 
      <button
        className="mt-12 px-8 py-3 rounded-full 
        bg-blue-500 hover:bg-blue-600 
        text-white font-semibold text-lg
        shadow-lg shadow-blue-500/40
        transition-all duration-300 
        active:scale-95 cursor-pointer"
        disabled={loading}
        onClick={handleUpdateAssistant}
      >
        {!loading ? "Finally Create Your Assistant":"Loading..."}
      </button>}



      
    </div>
  );
};

export default Customized1;















```

- home.jsx

```






















import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { userData , serverUrl , setUserData } = useContext(userDataContext);
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      setUserData(null)
      navigate("/signup")
    } catch (error) {
      console.log(error)
      setUserData(null)
    }
  }


  return (
    <div
      className="w-full min-h-screen 
      bg-linear-to-br from-black via-[#06063a] to-[#0a0a69]
      flex flex-col items-center px-4 py-8"
    >
      {/* Top Action Bar */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-10">
        <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-wide ">
          Dashboard
        </h1>

        <div className="flex gap-3">
          <button
            className="px-5 py-2 rounded-full
            bg-blue-500/90 hover:bg-blue-600
            text-white text-sm font-semibold
            transition-all duration-300 active:scale-95 cursor-pointer"
            onClick={()=>navigate("/customize")}
            >
            Customize
          </button>

          <button
            className="px-5 py-2 rounded-full
            bg-red-500/90 hover:bg-red-600
            text-white text-sm font-semibold
            transition-all duration-300 active:scale-95 cursor-pointer"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Assistant Showcase */}
      <div
        className="w-full max-w-sm sm:max-w-md md:max-w-lg
        bg-white/10 backdrop-blur-xl
        border border-white/20
        rounded-3xl shadow-2xl
        flex flex-col items-center
        p-6 gap-6"
      >
        {/* Image */}
        <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden relative">
          <img
            src={userData?.assistantImage}
            alt="Assistant"
            className="w-full h-full object-cover"
          />

          {/* Glow overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Name */}
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          I’m{" "}
          <span className="text-blue-400 tracking-wide">
            {userData?.assistantName}
          </span>
        </h2>

        {/* Sub text */}
        <p className="text-sm text-gray-300 text-center max-w-xs">
          Your personalized virtual assistant is ready to help you anytime.
        </p>

        {/* Action */}
        <button
          className="mt-2 w-full py-3 rounded-xl
          bg-blue-500 hover:bg-blue-600
          text-white font-semibold
          shadow-lg shadow-blue-500/40
          transition-all duration-300 active:scale-95"
        >
          Start Conversation
        </button>
      </div>
    </div>
  );
};

export default Home;




```


### now setup google gemini 


## setting up gemini api :

- gemini.js

```

```
