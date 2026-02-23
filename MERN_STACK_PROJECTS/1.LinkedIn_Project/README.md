# Linkedin workflow -


### create folders such as 
- config
- middleware
- controllers
- models
- routes


### firstly setup database 
- setup mongodb atlas service
- setuping files

- config ---> db.js

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


- models ----> user.models.js

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
            ref:"User"

         } 
    ]
},{timestamps:true})

const User = mongoose.model("User",userSchema)
export default User

```


### authentication for backend

- config ----> token.js

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

- controllers ---> auth.controllers.js

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

- routes----> auth.routes.js

```
import express from "express"
import { login, logOut, signUP } from "../controllers/auth.controllers.js";

let authRouter = express.Router();


authRouter.post("/signup",signUP)
authRouter.post("/login",login)
authRouter.get("/logout",logOut)


export default authRouter;

```


- index.js

```
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/users.routes.js"

dotenv.config()

const app = express()
const port = process.env.PORT 

// MIDDLEWARES
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(cookieParser())

// ROUTES
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

// SERVER
app.listen(port, () => {
  connectDB()
  console.log(`Server running on port ${port}`)
})


```




### now move to the frontend 
- setup react project


### create context js for central 

- context ----> AuthContext.jsx

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

- main.jsx

```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'
import UserContext from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContext>
     <UserContext>
    <App />
     </UserContext>
    </AuthContext>
    </BrowserRouter>
  </StrictMode>
)


```

### now create pages 

- signup.jsx

```

import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { userDataContext } from "../context/UserContext.jsx";

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
    let {userData , setuserData} = useContext(userDataContext)


    
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

           setuserData(result.data)
           navigate("/")

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

- login.jsx

```

import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { userDataContext } from "../context/UserContext.jsx";


const Login = () => {
   
  
    const [email, setEmailName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    
    let {userData,setuserData} = useContext(userDataContext)

       
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
            
            setuserData(result.data)
            navigate("/")

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



### now move to the backend and check that if particular user is authenticate or not.

- middleware.js ---> isAuth.js

```
import jwt from "jsonwebtoken"

const isAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies
        if (!token) {
            return res.status(400).json({message:"user doesn't have token"})
        }
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:"user doesn't have valid token"})
        }

       

        req.userId = verifyToken.userId;
        next()
    } catch (error) {
        return res.status(500).json({message:`is auth error ${error}`})
    }
}

export default isAuth;

```

- controllers ----> user.controllers.js

```
import User from "../models/user.model.js"

export const getCurrentUser = async (req,res) => {
    try {
        let id = req.userId
        // console.log(id);
        const user = await User.findById(id).select("-password")
        if (!user) {
            return res.status(400).json({message:"user does not found !! "})
        }
        
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({message:"get current user error !! "})
        console.log(error)
    }
}

```

- create route for this 

- routes ----> user.route.js

```
import express from "express"
import { getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";

let userRouter = express.Router();

userRouter.get("/currentuser",isAuth,getCurrentUser)

export default userRouter;
```


- index.js

```
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/users.routes.js"

dotenv.config()

const app = express()
const port = process.env.PORT 

// MIDDLEWARES
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(cookieParser())

// ROUTES
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

// SERVER
app.listen(port, () => {
  connectDB()
  console.log(`Server running on port ${port}`)
})

```


### now getting current user in frontend

- context ---> User.Context.jsx

```

import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext.jsx'
import axios from 'axios'
export const userDataContext = createContext()
const UserContext = ({children}) => {

    const [userData, setuserData] = useState([])
let {serverUrl} = useContext(authDataContext)

    const getCurrentUser = async () =>{
        try {
            let result = await axios.get(serverUrl + "/api/user/currentuser",{
                withCredentials:true
            })
            // console.log(result)
            setuserData(result.data)
        } catch (error) {
            console.log(error)
             setuserData(null)
        }
    }



    useEffect(()=>{
        getCurrentUser()
    },[])

    const value = {
         userData, setuserData
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

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'
import UserContext from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContext>
     <UserContext>
    <App />
     </UserContext>
    </AuthContext>
    </BrowserRouter>
  </StrictMode>
)


```

### now protect the routes 

- app.jsx

```

import { Navigate, Route, Router, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import { useContext } from "react"
import { userDataContext } from "./context/UserContext.jsx"


function App() {
  
  let {userData} = useContext(userDataContext)


  return (
    <>
     <Routes>
      <Route path="/" element={userData ? <Home />: <Navigate  to="/login"  />} />
      <Route path="/signup" element={userData? <Navigate to="/" />:<Signup />} />
      <Route path="/login" element={userData?  <Navigate to="/" />:<Login />} />
      {/* <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} /> */}
    </Routes>
    </>
  )
}

export default App



```

### handling profile image

- setup cloudinary ---> visit cloudinary website 




- config ----> cloudinary.js

```
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


const uploadOnCloudinary = async (filePath) => {
     cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET
    });
    try {
        if(!filePath){
            return null
        }

        const uploadResult = await cloudinary.uploader.upload(filePath)
        fs.unlinkSync(filePath)
        return uploadResult.secure_url;
        
        
        
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log(`cloudinary error ${error}`)
    }
}

export default uploadOnCloudinary;


```

- multer image ko dega frontend se and diskstrogae mai dalega public folder mai

- middleware ---> multer.js

```
import multer from "multer"

const upload = multer({storage})

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

export default upload;

```


### image handling in frontend

- firstly create an input and give that input to reference for that useRef() function.
#### this is a code for selecting input image
```
  const profileImage = useRef()
  const coverImage = useRef()

   {/* Profile image input */}
        <input type="file" accept="image/*" hidden ref={profileImage}/>


        {/* Cover Image Input  */}
        <input type="file" accept="image/*" hidden ref={coverImage} />


        <div onClick={()=>profileImage.current.click()> <div>
        <div onClick={()=>coverImage.current.click()> <div>
  ```


- handling frontend and backend image 

```

// profile image
  const[frontEndProfileImage,setFrontEndProfileImage] = useState(userData.profileImage || dp)
  const[backEndProfileImage,setBackEndProfileImage] = useState(null)
  // cover image
  const[frontEndCoverImage,setFrontEndCoverImage] = useState(userData.coverImage || null)
  const[backEndCoverImage,setBackEndCoverImage] = useState(null)


   const handleProfileImage = async (e) => {
    let file = e.target.files[0]
    setBackEndProfileImage(file)

    setFrontEndProfileImage(URL.createObjectURL(file))
  }


        {/* Profile image input */}
        <input type="file" accept="image/*" hidden ref={profileImage} onChange={handleProfileImage}/>


        {/* Cover Image Input  */}
        <input type="file" accept="image/*" hidden ref={coverImage} onChange={handleCoverImage}/>

  {/* Cover */}
        <div className="relative w-full h-44 bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl mt-10" onClick={()=>coverImage.current.click()}>
          <img src={frontEndCoverImage} className="w-full" />
          <CiCamera className="absolute top-3 right-3 text-white text-4xl p-1 rounded-full cursor-pointer" />
        </div>

        {/* Profile */}
        <div className="w-18 h-18 rounded-full overflow-hidden border-4 border-white shadow-lg absolute top-45 left-14 cursor-pointer" onClick={()=>profileImage.current.click()}>
          <img
            src={frontEndProfileImage }
            alt=""
            className="w-full h-full object-cover"
          />
          <FaCirclePlus className="absolute right-1 bottom-1 text-blue-500 bg-white rounded-full" />
        </div>


```


### after creating edit profile page -->

### now update it in controller and routes

- controller ----> usercontroller.js

```

export const updateProfile = async (req,res) => {
    try {
        let {firstName , lastName , userName , headline , location , gender } = req.body;
        let skills = req.body.skills ? JSON.parse(req.body.skills) : []
        let education = req.body.education ? JSON.parse(req.body.education) : []
        let experience = req.body.experience ? JSON.parse(req.body.experience) : []
        let profileImage;
        let coverImage;



        if(req.files?.profileImage){
           profileImage = await uploadOnCloudinary(req.files.profileImage[0].path);
        }

        if(req.files?.coverImage){
           coverImage = await uploadOnCloudinary(req.files.coverImage[0].path);
        }

        let user = await User.findByIdAndUpdate(req.userId,{
            firstName , lastName , userName , headline , location , gender , skills , education ,experience , profileImage ,coverImage
        },{new:true}).select("-password")

        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:`update profile error ${error}`  })
    }
}

```


- routes ----> user.routes.js

```
import express from "express"
import { getCurrentUser, updateProfile } from "../controllers/user.controllers.js";
import isAuth  from "../middlewares/isAuth.js";
import upload  from "../middlewares/multer.js";


let userRouter = express.Router();

userRouter.get("/currentuser",isAuth,getCurrentUser)
userRouter.put("/updateprofile",isAuth,upload.fields([
    {name:"profileImage",maxCount:1},
    {name:"coverImage",maxCount:1}
]),updateProfile)

export default userRouter;

```

- EditProfile.jsx

```

import React, { useContext, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { userDataContext } from "../context/UserContext.jsx";
import dp from "../assets/empty-dp.webp";
import { FaCirclePlus } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import axios from "axios";
import { authDataContext } from "../context/AuthContext.jsx";


const EditProfile = () => {
  let { userData, setUserData, edit, setEdit } =
    useContext(userDataContext);

  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [userName, setUserName] = useState(userData?.userName || "");
  const [headline, setHeadline] = useState(userData?.headline || "");
  const [location, setLocation] = useState(userData?.location || "");
  const [gender, setGender] = useState(userData?.gender || "");

  const [skills, setSkills] = useState(userData?.skills || []);
  const [newSkills, setNewSkills] = useState("");

  const {serverUrl} = useContext(authDataContext)



  // ******image handling***********
  const profileImage = useRef()
  const coverImage = useRef()
  // profile image
  const [frontEndProfileImage, setFrontEndProfileImage] = useState(userData.profileImage || dp)
  const [backEndProfileImage, setBackEndProfileImage] = useState(null)
  // cover image
  const [frontEndCoverImage, setFrontEndCoverImage] = useState(userData.coverImage || null)
  const [backEndCoverImage, setBackEndCoverImage] = useState(null)

  const handleProfileImage = async (e) => {
    let file = e.target.files[0]
    setBackEndProfileImage(file)

    setFrontEndProfileImage(URL.createObjectURL(file))
  }
  const handleCoverImage = async (e) => {
    let file = e.target.files[0]
    setBackEndCoverImage(file)

    setFrontEndCoverImage(URL.createObjectURL(file))
  }



  const [experience, setExperience] = useState(
    userData?.experience || []
  );
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    description: "",
  });

  const [education, setEducation] = useState(
    userData?.education || []
  );
  const [newEducation, setNewEducation] = useState({
    college: "",
    degree: "",
    fieldOfStudy: "",
  });

  /* ================= FUNCTIONS ================= */

  const addSkill = () => {
    if (newSkills && !skills.includes(newSkills)) {
      setSkills([...skills, newSkills]);
    }
    setNewSkills("");
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addEducation = () => {
    if (
      newEducation.college &&
      newEducation.degree &&
      newEducation.fieldOfStudy
    ) {
      setEducation([...education, newEducation]);
    }
    setNewEducation({
      college: "",
      degree: "",
      fieldOfStudy: "",
    });
  };

  const removeEducation = (edu) => {
    setEducation(education.filter((e) => e !== edu));
  };

  const addExperience = () => {
    if (
      newExperience.title &&
      newExperience.company &&
      newExperience.description
    ) {
      setExperience([...experience, newExperience]);
    }
    setNewExperience({
      title: "",
      company: "",
      description: "",
    });
  };

  const removeExperience = (exp) => {
    setExperience(experience.filter((e) => e !== exp));
  };




  let [saving,setSaving] = useState(false)

  // save profile function

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      let formData = new FormData()
      formData.append("firstName", firstName)
      formData.append("lastName", lastName);
      formData.append("userName", userName);
      formData.append("headline", headline);
      formData.append("location", location);
      formData.append("gender", gender);
      formData.append("skills",JSON.stringify(skills));
      formData.append("education",JSON.stringify(education));
      formData.append("experience",JSON.stringify(experience));

      if(backEndProfileImage){
        formData.append("profileImage",profileImage)
      }

      if(backEndCoverImage){
        formData.append("coverImage",coverImage)
      }

      let result = await axios.put(serverUrl + "/api/user/updateprofile",{
        formData
      },{withCredentials:true})


      setUserData(result.data)
      

      setEdit(false)
      setSaving(false)


    } catch (error) {
          console.log(error)
          setSaving(false)
    }
  }



  







  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 ">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm "></div>

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 mt-30 ">





        {/* Profile image input */}
        <input type="file" accept="image/*" hidden ref={profileImage} onChange={handleProfileImage} />


        {/* Cover Image Input  */}
        <input type="file" accept="image/*" hidden ref={coverImage} onChange={handleCoverImage} />



        {/* Close */}
        <div
          className="absolute right-4 top-4"
          onClick={() => setEdit(false)}
        >
          <RxCross2 className="text-2xl cursor-pointer hover:scale-110 transition" />
        </div>

        {/* Cover */}
        <div className="relative w-full h-44 bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl mt-10 overflow-hidden" onClick={() => coverImage.current.click()}>
          <img src={frontEndCoverImage} className="w-full" />
          <CiCamera className="absolute top-3 right-3 text-white text-4xl p-1 rounded-full cursor-pointer" />
        </div>

        {/* Profile */}
        <div className="w-18 h-18 rounded-full overflow-hidden border-4 border-white shadow-lg absolute top-45 left-14 cursor-pointer" onClick={() => profileImage.current.click()}>
          <img
            src={frontEndProfileImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <FaCirclePlus className="absolute right-1 bottom-1 text-blue-500 bg-white rounded-full" />
        </div>

        {/* ================= BASIC ================= */}
        <div className="flex flex-wrap gap-4 mt-16">

          {[
            { value: firstName, set: setFirstName, label: "First Name" },
            { value: lastName, set: setLastName, label: "Last Name" },
            { value: userName, set: setUserName, label: "Username" },
            { value: headline, set: setHeadline, label: "Headline" },
            { value: location, set: setLocation, label: "Location" },
            { value: gender, set: setGender, label: "Gender" },
          ].map((item, i) => (
            <input
              key={i}
              value={item.value}
              onChange={(e) => item.set(e.target.value)}
              placeholder={item.label}
              className="w-full md:w-[48%] border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ))}
        </div>

        {/* ================= SKILLS ================= */}
        <div className="mt-8">
          <h1 className="text-lg font-semibold mb-3">Skills</h1>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
              >
                {skill}
                <RxCross2
                  className="cursor-pointer"
                  onClick={() => removeSkill(skill)}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <input
              value={newSkills}
              onChange={(e) => setNewSkills(e.target.value)}
              placeholder="Add skill"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            />
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* ================= EDUCATION ================= */}
        <div className="mt-8">
          <h1 className="text-lg font-semibold mb-3">Education</h1>

          {education.map((edu, i) => (
            <div
              key={i}
              className="flex justify-between items-center border p-3 rounded-lg mb-2"
            >
              <div>
                <div>{edu.college}</div>
                <div className="text-sm text-gray-500">{edu.degree}</div>
                <div className="text-sm text-gray-500">
                  {edu.fieldOfStudy}
                </div>
              </div>
              <RxCross2
                className="cursor-pointer"
                onClick={() => removeEducation(edu)}
              />
            </div>
          ))}

          <div className="flex flex-wrap gap-2">
            <input
              placeholder="College"
              value={newEducation.college}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  college: e.target.value,
                })
              }
              className="w-full md:w-[32%] border rounded-lg px-3 py-2"
            />
            <input
              placeholder="Degree"
              value={newEducation.degree}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  degree: e.target.value,
                })
              }
              className="w-full md:w-[32%] border rounded-lg px-3 py-2"
            />
            <input
              placeholder="Field"
              value={newEducation.fieldOfStudy}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  fieldOfStudy: e.target.value,
                })
              }
              className="w-full md:w-[32%] border rounded-lg px-3 py-2"
            />
          </div>

          <button
            onClick={addEducation}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* ================= EXPERIENCE ================= */}
        <div className="mt-8">
          <h1 className="text-lg font-semibold mb-3">Experience</h1>

          {experience.map((exp, i) => (
            <div
              key={i}
              className="flex justify-between items-center border p-3 rounded-lg mb-2"
            >
              <div>
                <div>{exp.title}</div>
                <div className="text-sm text-gray-500">{exp.company}</div>
                <div className="text-sm text-gray-500">
                  {exp.description}
                </div>
              </div>
              <RxCross2
                className="cursor-pointer"
                onClick={() => removeExperience(exp)}
              />
            </div>
          ))}

          <div className="flex flex-wrap gap-2">
            <input
              placeholder="Title"
              value={newExperience.title}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  title: e.target.value,
                })
              }
              className="w-full md:w-[32%] border rounded-lg px-3 py-2"
            />
            <input
              placeholder="Company"
              value={newExperience.company}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  company: e.target.value,
                })
              }
              className="w-full md:w-[32%] border rounded-lg px-3 py-2"
            />
            <input
              placeholder="Description"
              value={newExperience.description}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  description: e.target.value,
                })
              }
              className="w-full md:w-[32%] border rounded-lg px-3 py-2"
            />
          </div>

          <button
            onClick={addExperience}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Save */}
        <button className="w-full mt-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 cursor-pointer mb-7"
       disabled={saving}
       
       onClick={()=>handleSaveProfile()}>
          {saving ? "saving...":"Save Profile"}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;

































































// import React, { useContext, useState } from 'react'
// import { RxCross2 } from "react-icons/rx";
// import { userDataContext } from '../context/UserContext.jsx';
// import dp from "../assets/empty-dp.webp";
// import { FaCirclePlus } from "react-icons/fa6";
// import { CiCamera } from "react-icons/ci";

// const EditProfile = () => {
//     let { userData, setUserData, edit, setEdit } = useContext(userDataContext)

//     const [firstName, setFirstName] = useState(userData.firstName || " ")
//     const [lastName, setLastName] = useState(userData.lastName || " ")
//     const [userName, setUserName] = useState(userData.userName || " ")
//     const [headline, setHeadline] = useState(userData.headline || " ")
//     const [location, setLocation] = useState(userData.location || " ")
//     const [gender, setGender] = useState(userData.gender || " ")
//     const [skills, setSkills] = useState(userData.skills || [])
//     const [newSkills, setNewSkills] = useState(" ")
//     const [experience, setExperience] = useState(userData.experience || [])
//     const [newExperience, setNewExperience] = useState({
//         college: " ",
//         degree: " ",
//         fieldOfStudy: " "
//     })

//     const [education, setEducation] = useState(userData.education || [])
//     const [newEducation, setNewEducation] = useState({
//         title:" ",
//         comapany:" ",
//         description:""
//     })



//     const addSkill = () => {


//         if (newSkills && !skills.includes(newSkills)) {
//             setSkills([...skills, newSkills])
//         }

//         setNewSkills(" ")

//     }

//     const addEducation = () => {


//         if (newEducation.college && newEducation.degree && newEducation.fieldOfStudy) {
//             setEducation([...education, newEducation])
//         }

//         setNewEducation({
//             college: " ",
//             degree: " ",
//             fieldOfStudy: " "
//         })

//     }


//     const addExperience = () => {


//         if (newExperience.title && newExperience.comapany && newExperience.description) {
//             setExperience([...experience, newExperience])
//         }

//         setNewExperience({
//             title: " ",
//             comapany: " ",
//             description: " "
//         })

//     }

//     const removeEducation = (edu) => {
//         if (education.includes(edu)) {
//             setEducation(education.filter((e) => (
//                 e !== edu)
//             ))
//         }
//     }

//     const removeSkill = (skill) => {
//         if (skills.includes(skill)) {
//             setSkills(skills.filter((s) => (
//                 s !== skill)
//             ))

//         }
//     }

//     const removeExperinece = (exp) => {
//         if (experience.includes(exp)) {
//             setExperience(experience.filter((e) => (
//                 e !== exp)
//             ))

//         }
//     }



//     return (


//         <div className='w-full h-screen fixed top-0  z-100 flex justify-center items-center'>
//             <div className='bg-black opacity-[0.6] w-full h-full absolute '></div>
//             <div className='w-90% max-w-100 w-150 h-130 bg-white absolute z-200 rounded-lg shadow-2xs p-2'>
//                 {/* cross */}
//                 <div className='absolute right-3 top-3' onClick={() => setEdit(false)}><RxCross2 className='text-2xl cursor-pointer font-bold' /></div>

//                 {/* cover image */}
//                 <div className='w-full h-30 bg-gray-400 rounded-lg mt-9 '>
//                     <img src="" alt="" className='w-full overflow-hidden ' />
//                     <CiCamera className='w-6 h-6 absolute top-13 right-6 cursor-pointer' />
//                 </div>



//                 {/* profile image */}

//                 <div className="w-15 h-15 rounded-full overflow-hidden border absolute top-30 left-6  cursor-pointer">
//                     <img
//                         src={userData?.assistantImage || dp}
//                         alt=""
//                         className="w-full h-full object-cover"
//                     />
//                     <FaCirclePlus className='w-3 h-3 absolute right-2 bottom-1 text-blue-500' />
//                 </div>




//                 <div className='flex flex-col'>
//                     <input type="text" placeholder='firstname' value={firstName} onClick={(e) => setFirstName(e.target.value)} />
//                     <input type="text" placeholder='lastname' value={lastName} onClick={(e) => setLastName(e.target.value)} />
//                     <input type="text" placeholder='username' value={userName} onClick={(e) => setUserName(e.target.value)} />
//                     <input type="text" placeholder='headline' value={headline} onClick={(e) => setHeadline(e.target.value)} />
//                     <input type="text" placeholder='location' value={location} onClick={(e) => setLocation(e.target.value)} />
//                     <input type="text" placeholder='gender (male/female/other)' value={gender} onClick={(e) => setGender(e.target.value)} />
//                 </div>

//                 <div>
//                     <h1>Skills</h1>
//                     {skills && <div>
//                         {skills.map((skill, index) => (
//                             <div key={index}><span>{skill}</span><RxCross2 className='text-xl cursor-pointer font-bold' onClick={() => removeSkill(skill)} /></div>
//                         ))}
//                     </div>}

//                     <div >
//                         <input type="text" placeholder='add new skill' value={newSkills} onChange={(e) => setNewSkills(e.target.value)} />
//                         <button>Add</button>
//                     </div>
//                 </div>






//                 <div>
//                     <h1>Education</h1>
//                     {education && <div>
//                         {education.map((edu, index) => (
//                             <div key={index}>

//                                 <div>
//                                     <div>title : {exp.title}</div>
//                                     <div>Company: {exp.comapany}</div>
//                                     <div> Description : {exp.description}</div>
//                                 </div>

//                                 <RxCross2 className='text-xl cursor-pointer font-bold'  /></div>
//                         ))}
//                     </div>}

//                     <div >
//                         <input type="text" placeholder='title' value={newExperience.title} onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })} />

//                         <input type="text" placeholder='comapany' value={newExperience.degree} onChange={(e) => setNewExperience({ ...newExperience, comapany: e.target.value })} />

//                         <input type="text" placeholder='Description' value={newExperience.description} onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })} />
//                         <button onClick={addExperience}>Add</button>
//                     </div>
//                 </div>











//                  <div>
//                     <h1>Experience</h1>
//                     {experience && <div>
//                         {education.map((exp, index) => (
//                             <div key={index}>

//                                 <div>
//                                     <div>College : {edu.college}</div>
//                                     <div>Degree: {edu.degree}</div>
//                                     <div> field of Study : {edu.fieldOfStudy}</div>
//                                 </div>

//                                 <RxCross2 className='text-xl cursor-pointer font-bold' onClick={()=>removeExperinece(exp)} /></div>
//                         ))}
//                     </div>}

//                     <div >
//                         <input type="text" placeholder='college' value={newEducation.college} onChange={(e) => setNewEducation({ ...newEducation, college: e.target.value })} />

//                         <input type="text" placeholder='degree' value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} />

//                         <input type="text" placeholder='field of study' value={newEducation.fieldOfStudy} onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })} />
//                         <button onClick={addEducation}>Add</button>
//                     </div>
//                 </div>



//                  <button>Save Profile</button>




//             </div>

//         </div>
//     )
// }

// export default EditProfile



```

- array data ko string mai convert karna padata hai like skils , education , experience iss sabko string mai convert karna padata hai


### now create post model

- models ---> post.models.js

```
import mongoose from "mongoose"
import User from "./user.model.js"

const postSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    description:{
        type:String,
        default:" "
    },
    image:{
        type:String
    },
    like:[
        {
            type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    ],
    comment:[{
        content:{
            type:String
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }]

},{timestamps:true})

const Post = mongoose.model("Post",postSchema)

export default Post;
```

- controller ---> post.controller.js

```


```

- routes ---> post.routes.js

```

```

- component ---> 