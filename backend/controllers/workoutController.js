const Workout = require('../models/workouts');

const createWorkout = async (req, res) => {
    try {
        const newWorkout = new Workout(req.body);
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch(error) {
        res.status(400).json({message: error.message });
    }
};
module.exports = { createWorkout };