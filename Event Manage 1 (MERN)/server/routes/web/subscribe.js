import express from 'express';
import Subscriber from '../../models/website/Subscriber.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // HTML email content with header and footer
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to our Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background-color: #f7f7f7; padding: 10px; border-bottom: 1px solid #ddd;">
            <h2 style="margin: 0; text-align: center; color: #333;">Welcome to Our Newsletter</h2>
          </div>
          <div style="padding: 20px; text-align: left;">
            <p>Hi there,</p>
            <p>Thank you for subscribing to our newsletter. We are excited to have you on board.</p>
            <p>We will get back to you soon with more updates and information.</p>
            <p>Best regards,<br>Your Company Name</p>
          </div>
          <div style="background-color: #f7f7f7; padding: 10px; border-top: 1px solid #ddd; text-align: center;">
            <p style="margin: 0; color: #555;">&copy; 2024 Your Company Name. All rights reserved.</p>
            <p style="margin: 0; color: #555;"><a href="https://yourcompanywebsite.com" style="color: #007bff; text-decoration: none;">Visit our website</a></p>
          </div>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Subscription successful' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    return res.status(500).json({ message: 'An error occurred' });
  }
});

export default router;
