// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();

// Configure the transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  

// Function to send a welcome email
export const sendWelcomeEmail = (toEmail, name) => {
  const mailOptions = {
    from: 'Your App Name <no-reply@yourapp.com>', // sender address
    to: toEmail, // recipient address
    subject: 'Welcome to [Your App Name]!', // Subject line
    text: `Hello ${name}, thank you for registering with us.`, // plain text body
    html: `<p>Hello ${name}, thank you for registering with us.</p>` // HTML body (optional)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// module.exports = { sendWelcomeEmail };
