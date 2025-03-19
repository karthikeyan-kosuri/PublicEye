import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import User from "./model/user.js"; // Ensure this file also uses ES modules

dotenv.config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;
const constring = process.env.constring;

app.use(express.json());
app.use(cors());
// Signup route
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword });

        res.status(200).json({ message: 'Signup successful!' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during signup.' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password!' });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during login.' });
    }
});

// Middleware to verify token
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from headers

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No Token Provided." });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next(); // Continue if token is valid
    } catch (error) {
        res.status(403).json({ message: "Invalid Token!" });
    }
};

// Protected route example
app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: "Welcome to the dashboard!" });
});

mongoose.connect(constring)
  .then(() => {
    console.log("Connected to database");
    app.listen(4000, () => {
      console.log("Server running on port 4000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });