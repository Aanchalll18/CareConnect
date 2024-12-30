

import validator from 'validator';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!email || !name || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing Details!",
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Enter a strong password (at least 8 characters)",
            });
        }

        // Check if the email is already registered
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = {
            name,
            email,
            password: hashedPassword,
        };

        const userData = new userModel(newUser);
        const user = await userData.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expires in 1 hour
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
        });
    } catch (e) {
        console.error("Error in registerUser:", e.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message, // Provide error details for debugging
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist",
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (isMatched) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            return res.status(200).json({
                success: true,
                message: "Password matched",
                token,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
    } catch (e) {
        console.error("Error in loginUser:", e.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message, // Provide error details for debugging
        });
    }
};

export { registerUser,loginUser };
