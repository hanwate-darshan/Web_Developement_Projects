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