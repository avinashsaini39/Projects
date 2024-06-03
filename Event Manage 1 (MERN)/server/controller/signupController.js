// import express from 'express';
import bcrypt from 'bcrypt';
// import User from '../models/User.js';
import Schema from '../models/userSchema.js'; 

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email is already registered
    const existingUser = await Schema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = new Schema({ name, email, password: hashedPassword });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return success response
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
