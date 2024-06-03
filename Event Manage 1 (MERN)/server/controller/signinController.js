// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Schema from '../models/userSchema.js';

// export const SignIn = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await Schema.findOne({ email });

//     // Check if user exists
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.JWT_SECRET, // Use a secret key for signing
//       { expiresIn: '1h' } // Set token expiration time
//     );

//     // User logged in successfully
//     res.status(200).json({ message: 'User logged in successfully', token });
//   } catch (error) {
//     console.error('Error generating JWT token:', error); // Log the error
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };



import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library
import Schema from '../models/userSchema.js'; 

const JWT_SECRET = 'yogesh'; // Replace 'your_secret_key_here' with your actual secret key

// Sign-in controller
export const SignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await Schema.findOne({ email });

    // Check if user exists   
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '2d' }
    );


//     // User logged in successfully, send token in response
res.status(200).json({ message: 'User logged in successfully', token ,data:user});
} catch (error) {
  console.error('Error generating JWT token:', error); // Log the error
  res.status(500).json({ message: 'Internal server error' });
}
}
