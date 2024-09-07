import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';
import { sendWelcomeEmail } from "../services/emailService.js";

// REGISTER
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone,} = req.body;

    // Validation
    if (!name || !email || !password || !phone  ) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    // Check user
    const existingUser = await userModel.findOne({ email });

    // Existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: 'Already registered, please login',
      });
    }

    

    // Register user
    const hashedPassword = await hashPassword(password);
    sendWelcomeEmail(email, name);

    // Save user
    const user = await new userModel({ name, email, phone, password: hashedPassword}).save();

    res.status(201).send({
      success: true,
      message: 'User registered successfully',
      user,
      JWT,
    });

   

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in registration',
      error,
    });
  }
};

// LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered",
      });
    }

    const match = await comparePassword(password,user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate token
    const token = await JWT.sign({ _id:user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).send({
      success: true,
      message: 'Login successful',
      token,
      user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone,
       
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


//test controller
export const testController =  (req,res) => {
  res.send('protected route'); 
};

//userauthcontroller
export const userAuthController = (req, res) => {
    res.status(200).send({ ok: true });
};
