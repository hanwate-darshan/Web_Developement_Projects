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