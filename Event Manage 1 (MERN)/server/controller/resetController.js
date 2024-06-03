import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import UserModel from '../models/UserModel'; // Import your user model
import Schema from '../models/userSchema.js';

const resetPassword = (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    // Verify the JWT token
    jwt.verify(token, "yogesh", (err, decoded) => {
        if (err) {
            // If there's an error with the token, return an error response
            return res.status(400).json({ Status: "Error with token" });
        } else {
            // Hash the new password
            bcrypt.hash(password, 10)
                .then(hash => {
                    // Update the user's password in the database
                    Schema.findByIdAndUpdate(id, { password: hash }, { new: true })
                        .then(user => {
                            if (!user) {
                                // If user is not found, return an error response
                                return res.status(404).json({ Status: "User not found" });
                            }
                            // If password is updated successfully, send success response
                            return res.status(200).json({ Status: "Password updated successfully" });
                        })
                        .catch(err => {
                            // If there's an error during database operation, return an error response
                            return res.status(500).json({ Status: "Error updating password", Error: err });
                        });
                })
                .catch(err => {
                    // If there's an error while hashing the password, return an error response
                    return res.status(500).json({ Status: "Error hashing password", Error: err });
                });
        }
    });
};

export default resetPassword;
