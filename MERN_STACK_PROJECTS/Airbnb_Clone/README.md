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


- controller 

 - user.controller.js

 ```
 import User from "../models/user.model.js"

export const getCurrentUser = async (req,res) => {
    try {
        let user = await User.findById(req.userId).select(-password)
        if(!user){
            res.status(400).json({message:"your does not found"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message:`getCurrentUser Error ${error}`})
        
    }
}
 ```

 - routes

   - user.routes.js


```

import express from "express"
import isAuth from "../middleware/isAuth.jsx";
import { getCurrentUser } from "../controllers/user.controller.jsx";

let userRoute = express.Router();
userRoute.get("/currentuser",isAuth,getCurrentUser)



export default userRoute;
```











## currently i'm not writing middle files directly moves towards image and listing models


## - create a listing model

- models - listing.model.js

```
import mongoose from "mongoose";
import User from "./user.model.js";

const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    image1:{
        type:String,
        required:true
    },
    image2:{
        type:String,
        required:true
    },
    image3:{
        type:String,
        required:true
    },
    rent:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    landMark:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    isBooked:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

const Listing = mongoose.model("Listing",listingSchema)
export default Listing;

```














## image handling using multer and cloudnary


- npm i multer


## - middleware - multer.js

```
import multer from "multer";

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public ")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage})

export default upload;

```

### now setup cloudnary 

visit website copy all the variables in .env files 

and access it
- .env

```
PORT = 3000

MONGODB_URL = "mongodb+srv://snapchat12snapgg_db_user:snapchat12@cluster0.8eztmfk.mongodb.net/AirbnbClone"

JWT_SECRET = "13DHDJFDNFDKF78437383DJ"

NODE_DEVELOPMENT = "development"


CLOUDNARY_CLOUD_NAME = "dmwtpylk4"
CLOUDNARY_API_KEY = "726776492719937"
CLOUDNARY_API_SECRET = "enoZJiEUK6uN8nBgoLiG7kz_qw4"

```

- config  --->> cloudnary.js


```
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET
  });
  try {
    if (!filePath) {
      return null;
    }
    const uploadResult = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath)
    return uploadResult.secure_url
} catch (error) {
      fs.unlinkSync(filePath)
      console.log(error)
  }
};

```




## - now create listing controller

- controller --> listing.controller.js


```
import uploadOnCloudinary from "../config/cloudnary.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

export const addListing = async (req,res) => {
    try {
        let host = req.userId;
        let {title ,description , rent ,city , landMark , category} = req.body
        let image1 = await uploadOnCloudinary(res.files.image1[0].path)
        let image2 = await uploadOnCloudinary(res.files.image2[0].path)
        let image3 = await uploadOnCloudinary(res.files.image3[0].path)


        let listing = await Listing.create({
            title ,description , rent ,city , landMark , category, image1,image2,image3,host
        })

        let user = await User.findByIdAndUpdate(host,{$push:{listing:listing._id}},{new:true})
        if(!user){
            res.status(404).json({message:"user is not found"})
        }

        res.status(201).json(listing)

        


    } catch (error) {
        res.status(500).json({message:`add listing error ${error}`})
    }
}




```

- routes ----> listing.routes.js


```
import express from "express"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"
import { addListing } from "../controllers/listing.controller.js"

let listingRouter = express.Router()


listingRouter.post("/add",isAuth,upload.fields([
    {name:image1,maxCount:1},
    {name:image2,maxCount:1},
    {name:image3,maxCount:1}
]),addListing)

```

- index.js --->

```
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

/* ---------- Middlewares ---------- */

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

/* ---------- Routes ---------- */
app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);
app.use("/api/listing", listingRouter);

/* ---------- Server ---------- */
app.listen(port, async () => {
  await connectDB();
  console.log(`Server running on port ${port}`);
});


```



## - ListingContext.jsx

```
import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

import { AuthDataContext } from './AuthContext'
export const listingDataContext = createContext()

const ListingContext = ({children}) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [frontEndImage1, setfrontEndImage1] = useState(null)
    const [frontEndImage2, setFrontEndImage2] = useState(null)
    const [frontEndImage3, setFrontEndImage3] = useState(null)
    const [backEndImage1, setBackEndImage1] = useState(null)
    const [backEndImage2, setBackEndImage2] = useState(null)
    const [backEndImage3, setBackEndImage3] = useState(null)
    const [rent, setRent] = useState("")
    const [city, setCity] = useState("")
    const [landmark, setLandmark] = useState("")
    const [category, setCategory] = useState("")

      

    let {serverUrl} = useContext(AuthDataContext)

    
    
    const handleAddListing = async () => {
        try {
        let formData = new FormData()
        formData.append("title",title)
        formData.append("image1",backEndImage1)
        formData.append("image2",backEndImage2)
        formData.append("image3",backEndImage3)
        formData.append("description",description)
        formData.append("rent",rent)
        formData.append("city",city)
        formData.append("landmark",landmark)
        formData.append("category",category)
        
  
        let result = await axios.post(serverUrl + "/api/listing/add",formData,{withCredentials:true})
        console.log(result)

     

    } catch (error) {
        console.log(error)
    }
  }

    let value = {
          title, setTitle,
     description, setDescription,
frontEndImage1, setfrontEndImage1,
frontEndImage2, setFrontEndImage2,
frontEndImage3, setFrontEndImage3,
backEndImage1, setBackEndImage1,
backEndImage2, setBackEndImage2,
backEndImage3, setBackEndImage3,
rent, setRent,
city, setCity,
landmark, setLandmark,
category, setCategory
    }
  return (
    <div>
      <listingDataContext.Provider value={value}>

        {children}

      </listingDataContext.Provider>
    </div>
  )
}

export default ListingContext



```