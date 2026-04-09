// 1. Load the .env variables immediately
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); // Use mongoose, NOT mongodb!
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 2. Safely use the connection string from your .env file
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Express server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });