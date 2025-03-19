const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/user.js'); 
const app = express();
const cors = require('cors');
require('dotenv').config();
const constring = process.env.constring;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
// Test route
app.get('/', (req, res) => {
    res.send("hello from server");
});

// Signup route
app.post('/signup', async (req, res) => {
    const { uid, password } = req.body;

    try {
        const existingUser = await User.findOne({ uid });
        if (existingUser) {
            return res.status(400).json({ message: 'User ID already exists!' });
        }
        const newUser = await User.create({ uid, password });
        res.status(200).json({ message: 'Signup successful!', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during signup.' });
    }
});

//Login route
app.post('/login', async (req, res) => {
    const { uid, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ uid });

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Check if password matches
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password!' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during login.' });
    }
});

mongoose.connect('constring')
.then(() =>{
    console.log("connected to database");
    app.listen(4000, ()=>{
        console.log("listening on port 4000");
    });
})
.catch(() =>{
    console.log("Connection failed");
})