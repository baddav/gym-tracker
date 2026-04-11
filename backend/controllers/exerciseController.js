const Exercise = require('../models/exercise');

const createExercise = async (req, res) => {
    try {
        const newExercise = new Exercise(req.body);
        const savedExercise = await newExercise.save();
        res.status(201).json(savedExercise);
    } catch(error) {
        res.status(400).json({message: error.message });
    }
};

const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};
module.exports = { createExercise, getExercise: getExercises };