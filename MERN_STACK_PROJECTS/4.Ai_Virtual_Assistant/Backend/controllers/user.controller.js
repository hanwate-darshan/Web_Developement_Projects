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
        // const assistantImage;

        // if(req.file){
        //     assistantImage = await uploadOnCloudinary
        // }


    } catch (error) {
        
    }
}