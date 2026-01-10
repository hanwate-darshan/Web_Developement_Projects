# Mern Stack Project Setup

## Steps to Setup 
---
## 1) Create Two folders : 
  
  - Frontend
  - Backend
    
## 2) Start With Backend :    

 - initialized the Backend 
   - npm init -y
 - Installed required Package
   
   - npm i express
   - npm i mongoose
   - npm i nodemon

## 3) Create a file index.js :    

  - index.js

    - express.js code :
      
      ```
       const express = require('express')
       const app = express()
       const port = 3000

       app.get('/', (req, res) => {
       res.send('Hello World!')
       })

       app.listen(port, () => {
       console.log(`Example app listening on port ${port}`)
       })

      ```

## 4)  Create .env file  : 
    
- create .env file : 
  - for storing sensitive information 

    - npm i dotenv

     ```
     import dotenv from "dotenv"
     dotenv.config()
     ```

    ```
    PORT = 3000
    ```

## 5) Create Necessary folders : 

   - models 
   - routes
   - controllers
   - middlewares
   - config

## 6) Setup MongoDB atlas : 

    config ---> db.js

    ---

    import mongoose  from "mongoose";

    const connectDB = () =>{
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected !!")
    } catch (error) {
        console.log("DB Error !!")
    }
    }
    export default connectDB;
    
 
## 6) Setup MongoDB atlas : 

    models ---->

     user.model.js

## 6) Setup Authentication :   
  - npm i jsonwebtoken
  - npm i bcryptjs 
  - npm i cookie-parser


## 7) create a sign up 

  - controllers
     - auth.controllers.js
```
           user generation code 

import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signUP = async (req,res) =>{
try {
    let {firstName , lastName , userName , email , password} = req.body;
        let existEmail = await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"Email already Exist !"})
        }

        let existUserName = await User.findOne({userName});
        if (existUserName) {
            return res.status(400).json({message:"Username already exists !"})
        }


        let hassedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password:hassedPassword
        })

        return res.status(201).json(user)
        

      } catch (error) {
        return res.status(500).json({message:error})
      }
}



```

  - routes
     - auth.routes.js
        
          ```
            import express from "express"
            import { signUP } from "../controllers/auth.controllers.js";

            let authRouter = express.Router();


             authRouter.post("/post",signUP)
             authRouter.post("/login",signUP)

             export default authRouter;

          ```
       
  - index.js
     - use middleware - app.use("/api/auth",authRouter)
        
          

## 8) create a cookie for the authentication 


- now all the files are looks like 

### backend
 
### - config : 
   - db.js
```
       import mongoose  from "mongoose";

       const connectDB = () =>{
       try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected !!")
        } catch (error) {
          console.log("DB Error !!")
         }
         }
          export default connectDB;
```
 
token.js

```
import jwt from "jsonwebtoken"

const generateToken = async (userId) =>{

    try {
        let token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    } catch (error) {
        console.log(error)
    }


}

export default generateToken;

```



### controllers 

- auth.controllers.js


```
import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signUP = async (req,res) =>{
      try {
        let {firstName , lastName , userName , email , password} = req.body;
        let existEmail = await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"Email already Exist !"})
        }

        let existUserName = await User.findOne({userName});
        if (existUserName) {
            return res.status(400).json({message:"Username already exists !"})
        }
         
        if(password.length < 8){
            return res.status(400).json({message:"Password must be atleady 8 letters"})
        }

        let hassedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password:hassedPassword
        })
        
        let token = await generateToken(user._id)
        res.cookie("token",token,{ 
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:process.env.NODE_ENVIRONMENT === "production"
        })

        return res.status(201).json(user)
        

      } catch (error) {
        return res.status(500).json({message:"sign-up error"})
        console.log(error)
        
      }
}



export const login = async (req,res) =>{
    
    try {
        let {  email , password} = req.body;
        // existEmailUser -----> instread of writing this we write simply ---> user
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User Does not exist !"})
        }
         
        
       let isPassMatched = await bcrypt.compare(password,user.password)
        
       if(!isPassMatched){
        return res.status(400).json({message:"incorrect password"})
       }

        
        
        let token = await generateToken(user._id)
        res.cookie("token",token,{ 
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:process.env.NODE_ENVIRONMENT === "production"
        })

        return res.status(200).json(user)
    
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"login error"});
    }
}


export  const logOut = async (req,res)=> {
     try {
        res.clearcookie("token")
        return res.status(200),json({message:"Logout successfully !!"})
     } catch (error) {
        
     }
}

```

### models 

- user.models.js


```
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
           type:String,
           required:true
    },
    lastName:{
        type:String,
        required:true
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
        required:true,
    },
    profileImage:{
        type:String,
        default:""
    },
    coverImage:{
        type:String,
        default:""
    },
    headline:{
        type:String,
        default:""
    },
    skills:[{
        type:String
    }],
    education:[{
        college:{type:String},    
        degree:{type:String},
        fieldOfStudy:{type:String}
    }],
    location:{
        type:String
    },
    gender:{
        type:String,
        enum:["male","female","other"]
    },
    experience:[{
        title:{type:String},
        comapany:{type:String},
        description:{type:String}
    }],
    connection:[
         {
            type:mongoose.Schema.Types.ObjectId ,
            // ref:User

         } 
    ]
},{timestamps:true})

const User = mongoose.model("User",userSchema)
export default User
```


### routes 

- auth.routes.js

```
import express from "express"
import { login, logOut, signUP } from "../controllers/auth.controllers.js";

let authRouter = express.Router();


authRouter.post("/signup",signUP)
authRouter.post("/login",login)
authRouter.get("/logout",logOut)


export default authRouter;
```


### .env

```
PORT = 3000

MONGODB_URL = "mongodb+srv://snapchat12snapgg_db_user:Darshan123@cluster0.py4md9y.mongodb.net/LinkedIn"

JWT_SECRET = "DDSGSERVSDGGSGDSGGDS#$D"

NODE_ENVIRONMENT = "development"

```

### index.js

```
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

// MIDDLEWARES
app.use(express.json())
app.use(cookieParser())

// ROUTES
app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

// SERVER
app.listen(port, () => {
  connectDB()
  console.log(`Server running on port ${port}`)
})


```

## 9) setup frontend 

- create vite project
- npm i react-router-dom
- npm i react-icons
- setup tailwind css

npm i cors ----> for accepting request from any where 

app.use(cors({origin:"http://localhost:5173",credentials:true}))


### create login and sign-up page

### - pages :

- context :

  - AuthContext.jsx

```

import React, { createContext } from 'react'
export const authDataContext = createContext()

const AuthContext = ({children}) => {
    const serverUrl = "http://localhost:3000"
    let value = {
        serverUrl
    }
  return (
    <div>
        <authDataContext.Provider value={value}>

        {children}
        </authDataContext.Provider>
    </div>
  )
}

export default AuthContext

```

    
###  Login

```
import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";


const Login = () => {
   
  
    const [email, setEmailName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    
       
    let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext)

    const handleLogin = async (e) =>{
        setLoading(true)
        e.preventDefault();
        try {
            let result = await axios.post(serverUrl + "/api/auth/login",{
                email,
                password
            },{withCredentials:true})
            console.log(result)
            setErr("")
            setLoading(false)
           
            setEmailName("")
            setPassword("")
            

        } catch (error) {
            // console.log(error)
            setLoading(false)
            setErr(error.response.data.message)
        }
    }

  return (
    <div className="w-full min-h-screen bg-[#f3f2ef] flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-6xl px-6 py-6">
        <img src={logo} alt="LinkedIn Logo" className="h-8 cursor-pointer" />
      </div>

      {/* Signup Card */}
      <div className="w-[90%] max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Join LinkedIn
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Make the most of your professional life
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          

         

          <input
          onChange={(e)=>setEmailName(e.target.value)}
          value={email}
            type="email"
            placeholder="Email"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#0A66C2]"
            required
          />

          <input
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
            type="password"
            placeholder="Password (6+ characters)"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#0A66C2]"
            required
          />

          <p className="text-xs text-gray-500">
            By clicking Agree & Join, you agree to the LinkedIn User Agreement,
            Privacy Policy, and Cookie Policy.
          </p>
           {err && <p className="text-red-500"> {err} </p>}
          <button
            disabled={loading}
            type="submit"
            className="bg-[#0A66C2] text-white py-2 rounded-full font-semibold hover:bg-[#004182] transition cursor-pointer"
          >
           {loading ? "Loading..": "Login" } 
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <span className="text-gray-600">want to create a new account</span>{" "}
          <a href="#" className="text-[#0A66C2] font-semibold hover:underline" onClick={()=>navigate("/signup")}>
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login

```


### signup.jsx

```

import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";

const Signup = () => {
    
    
    const [firstName, setfirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmailName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    
   
    
    let navigate = useNavigate()
    
    let {serverUrl} = useContext(authDataContext)





    const handleSignUp = async (e) =>{
        setLoading(true)
        e.preventDefault();
        try {
            let result = await axios.post(serverUrl + "/api/auth/signup",{
                firstName,
                lastName,
                userName,
                email,
                password
            },{withCredentials:true})
            console.log(result)
            setErr("")
            setLoading(false)
            setfirstName("")
            setLastName("")
            setEmailName("")
            setPassword("")
            setUserName("")

        } catch (error) {
            // console.log(error)
            setLoading(false)
            setErr(error.response.data.message)
        }
    }

  return (
    <div className="w-full min-h-screen bg-[#f3f2ef] flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-6xl px-6 py-6">
        <img src={logo} alt="LinkedIn Logo" className="h-8 cursor-pointer" />
      </div>

      {/* Signup Card */}
      <div className="w-[90%] max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Join LinkedIn
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Make the most of your professional life
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input
            onChange={(e)=>setfirstName(e.target.value)}
            value={firstName}
            type="text"
            placeholder="First name"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#0A66C2]"
            required
          />

          <input
          onChange={(e)=>setLastName(e.target.value)}
          value={lastName}
            type="text"
            placeholder="Last name"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#0A66C2]"
            required
          />

          <input
          onChange={(e)=>setUserName(e.target.value)}
          value={userName}
            type="text"
            placeholder="Username"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#0A66C2]"
            required
          />

          <input
          onChange={(e)=>setEmailName(e.target.value)}
          value={email}
            type="email"
            placeholder="Email"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#0A66C2]"
            required
          />

          <input
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
            type="password"
            placeholder="Password (6+ characters)"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#0A66C2]"
            required
          />

          <p className="text-xs text-gray-500">
            By clicking Agree & Join, you agree to the LinkedIn User Agreement,
            Privacy Policy, and Cookie Policy.
          </p>
           {err && <p className="text-red-500"> {err} </p>}
          <button
            disabled={loading}
            type="submit"
            className="bg-[#0A66C2] text-white py-2 rounded-full font-semibold hover:bg-[#004182] transition cursor-pointer"
          >
           {loading ? "Loading..": "Agree & Join" } 
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <span className="text-gray-600">Already on LinkedIn?</span>{" "}
          <a href="#" className="text-[#0A66C2] font-semibold hover:underline" onClick={()=>navigate("/login")}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;


```

### app.jsx 


```
import { Route, Router, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"


function App() {
  

  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </>
  )
}

export default App


```

### main.jsx

```

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContext>

    <App />
    </AuthContext>
    </BrowserRouter>
  </StrictMode>,
)



```

## move to the backend check middleware


- middleware

  - isAuthenticate
     