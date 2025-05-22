import mongoose from "mongoose"

export const ConnectDB = async ()=>{
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connected")
    } catch (error) {
        console.log("error in connecting",error)
    }
}