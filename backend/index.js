// Load the .env variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); // Use mongoose, NOT mongodb!
const cors = require('cors');

// Load the routes
const exerciseRoutes = require('./routes/exerciseRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const workoutLogRoutes = require('./routes/workoutLogRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use('/api/exercises', exerciseRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/workoutLogs', workoutLogRoutes);

// Use connection string from .env file
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