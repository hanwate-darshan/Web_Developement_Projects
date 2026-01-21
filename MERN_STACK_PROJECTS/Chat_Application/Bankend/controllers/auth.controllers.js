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
        return res.status(500).json({message:`signup error ${error}`})
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
        return res.status(500).json({message:`Login error ${error}`})
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
