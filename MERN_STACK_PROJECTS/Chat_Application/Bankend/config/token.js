import jwt from "jsonwebtoken"
// Generate Token
const genToken = async (userId) => {
    try {
        const token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    } catch (error) {
        console.log(`genToken ${error}`)
    }
}

export default genToken;