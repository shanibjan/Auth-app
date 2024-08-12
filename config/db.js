import mongoose from "mongoose";
import colors from 'colors';


const connectDB = async()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`connected to MongoDB Database ${conn.connection.host}`.bgGreen);
  } catch (error) {
    console.log(`Error in MongoDB ${error}`.bgRed);
  }
}

export default connectDB;