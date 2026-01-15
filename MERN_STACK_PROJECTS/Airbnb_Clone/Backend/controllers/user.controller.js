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