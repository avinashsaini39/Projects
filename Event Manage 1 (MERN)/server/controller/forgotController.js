// import jwt from 'jsonwebtoken';
// import nodemailer from 'nodemailer';
// import Schema from '../models/userSchema.js';

// export const forgotPassword = (req, res) => {
//   const { email } = req.body;

//   Schema.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ Status: 'User not existed' });
//       }

//       const token = jwt.sign({ id: user._id }, 'yogesh', { expiresIn: '2d' });
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'yogeshkumar86077@gmail.com',
//           pass: 'yeis jubq psiv idbl'
//         }
//       });

//       const mailOptions = {
//         from: 'yogeshkumar86077@gmail.com',
//         to: 'yogeshkumar93069@gmail.com',
//         subject: 'Reset Password Link',
//         text: `http://localhost:5000/reset_password/${user._id}/${token}`
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).json({ Status: 'Failed to send email' });
//         } else {
//           console.log('Email sent:', info.response);
//           return res.status(200).json({ Status: 'Success' });
//         }
//       });
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       res.status(500).json({ Status: 'Failed to send password reset link. Please try again.' });
//     });
// };




import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import Schema from '../models/userSchema.js';
import bcrypt from "bcrypt";
export const forgotPassword = (req, res) => {
  const { email } = req.body;

  Schema.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ Status: 'User not existed' });
      }

      const token = jwt.sign({ id: user._id }, 'yogesh', { expiresIn: '2d' });
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'yogeshkumar86077@gmail.com',
          pass: 'yeis jubq psiv idbl'
        }
      });

      const otp = Math.floor(Math.random() * 9000); // Generates a random 6-digit OTP

      user.otp = otp;
      user.save();
      const mailOptions = {
        from: 'yogeshkumar86077@gmail.com',
        to: 'yogeshkumar93069@gmail.com',
        subject: 'Reset Password Link',
        // text: `http://localhost:5000/reset_password/${user._id}/${token}`
        text: `${otp} Please use this otp for resetting your Password`
      };

      transporter.sendMail(mailOptions)
        .then((info) => {
          console.log('Email sent:', info.response);
          return res.status(200).json({ Status: 'Success' });
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).json({ Status: 'Failed to send email' });
        });
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ Status: 'Failed to send password reset link. Please try again.' });
    });
};



export const resetPassword = (req, res) => {
  const { email, otp } = req.body;
  console.log(req.body)

  Schema.findOne({ email })
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ success: false, message: "User not found" });
      }

      console.log("OTP received:", otp);
      console.log("User OTP:", user.otp);

      if (user.otp !== otp) {
        console.log("Invalid OTP");
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      console.log("OTP verified successfully");

      user.otp = undefined;
      return user.save();
    })
    .then(() => {
      console.log("Password reset successfully");
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
      });
    })
    .catch((error) => {
      console.error("Error resetting password:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    });
};
// export const resetPassword = (req, res) => {
//   const { email, otp } = req.body;

//   Schema.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         console.log("User not found");
//         return res.status(404).json({ success: false, message: "User not found" });
//       }

//       console.log("OTP received:", otp);
//       console.log("User OTP:", user.otp);

//       if (user.otp !== otp) {
//         console.log("Invalid OTP");
//         return res.status(400).json({
//           success: false,
//           message: "Invalid OTP",
//         });
//       }

//       console.log("OTP verified successfully");

//       user.otp = undefined;
//       return user.save();
//     })
//     .then(() => {
//       console.log("Password reset successfully");
//       return res.status(200).json({
//         success: true,
//         message: "Password reset successfully",
//       });
//     })
//     .catch((error) => {
//       console.error("Error resetting password:", error);
//       return res.status(500).json({ success: false, message: "Internal Server Error" });
//     });
// };




// export const changePassword = (req, res) => {
//   const { email, password } = req.body;


//   Schema.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         console.log("User not found");
//         return res.status(400).json({ success: false, message: "User not found" });
//       }

//       return bcrypt.hash(password, 10);
//     })
//     .then((hashedPassword) => {
//       console.log("Hashed password:", hashedPassword);
//       Schema.password = hashedPassword;
//       return Schema.save();
//     })
//     .then(() => {
//       console.log("Password changed successfully");
//       return res.status(200).json({ message: "Password changed successfully" });
//     })
//     .catch((error) => {
//       console.error("Error changing password:", error);
//       return res.status(500).json({ message: "Internal Server Error" });
//     });
// };



// export const changePassword = (req, res) => {
//   const { email, password } = req.body;

//   Schema.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         console.log("User not found");
//         return res.status(400).json({ success: false, message: "User not found" });
//       }

//       return bcrypt.hash(password, 10)
//         .then((hashedPassword) => {
//           console.log("Hashed password:", hashedPassword);
//           Schema.password = hashedPassword; // Update the password field of the user instance
//           return Schema.save(); // Save the updated user
//         });
//     })
//     .then(() => {
//       console.log("Password changed successfully");
//       return res.status(200).json({ message: "Password changed successfully" });
//     })
//     .catch((error) => {
//       console.error("Error changing password:", error);
//       return res.status(500).json({ message: "Internal Server Error" });
//     });
// };


// export const changePassword = (req, res) => {
//   const { email, password } = req.body;

//   Schema.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         console.log("User not found");
//         return res.status(400).json({ success: false, message: "User not found" });
//       }

//       return bcrypt.hash(password, 10)
//         .then((hashedPassword) => {
//           console.log("Hashed password:", hashedPassword);
//           Schema.password = hashedPassword; // Update the password field of the user instance
//           return Schema.save(); // Save the updated user
//         });
//     })
//     .then(() => {
//       console.log("Password changed successfully");
//       return res.status(200).json({ message: "Password changed successfully" });
//     })
//     .catch((error) => {
//       console.error("Error changing password:", error);
//       return res.status(500).json({ message: "Internal Server Error" });
//     });
// };


export const changePassword = async (req, res) => {
  const { email, password } = req.body; // Adjusted to use newPassword instead of password
  console.log("Request body:", req.body); // Log the request body
  try {
    console.log("Received request to reset password for email:", email);
    const user = await Schema.findOne({ email });
    console.log("User found:", user); // Log the user object
    if (!user) {
      console.log("User not found");
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the newPassword
    console.log("Hashed password:", hashedPassword); // Log the hashed password
    user.password = hashedPassword;
    await user.save();
    console.log("Password changed successfully");
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
