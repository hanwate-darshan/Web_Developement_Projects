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