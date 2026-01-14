import User from "../models/user.model"

export const SignUp = async (req,res) =>{
    try {

       let {name, username,password} = req.body
       let existUser = await User.findOne({email})
       if (existUser) {
           return res.status(400).json({message:"your is already exists"})
       }
        
       
    } catch (error) {
        
    }
}