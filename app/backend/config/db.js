import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connection Successfull")
    }
    catch(error){
        console.error(`Error ${error.message}`)
    }
}

//db.js