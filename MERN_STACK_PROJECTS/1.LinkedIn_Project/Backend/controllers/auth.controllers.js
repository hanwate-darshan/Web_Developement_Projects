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
        return res.status(500).json({message:`sign-up error ${error}`})
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