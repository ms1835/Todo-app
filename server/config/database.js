import mongoose from "mongoose";

export const connectDatabase = async() => { 
    try{
        const { connection } = await mongoose.connect(process.env.DATABASE_URI);
        console.log(`Database connected: ${connection.host}`);
    } catch(err) {
        console.log("Error in database connection: "+err);
    }
}