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

const updateExercise = async (req, res) => {

    const {id} = req.params;

    try {
        const updatedExercise = await Exercise.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )

        if (!updatedExercise) {
            return res.status(404).json({message: "Exercise not found"});
        }

        res.status(200).json(updatedExercise);
    } catch (error) {
        res.status(400).json({message: error.message });
    }
}
module.exports = { createExercise, getExercise: getExercises, updateExercise };