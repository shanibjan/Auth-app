import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from 'cors';
import authRoutes from './routes/authRoute.js'
import userModel from "./models/userModel.js";



//configure env
dotenv.config();

//database confg
connectDB();

//rest object
const app = express()

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoutes);

//rest api
app.get('/', (req,res) =>{
  res.send({
    message:'welcome to ecom'
  })
})

app.get('/api/users', async (req, res) => {
  try {
    const users = await userModel.find();  // Fetches all users
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


//PORT
const PORT = process.env.PORT || 7000;

app.listen(PORT,()=>{
  console.log(`server running successfully on ${PORT}`.bgGreen);
})