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

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};

const deleteWorkout = async(req, res) => {
    const {id} = req.params;

    try {
        const deletedWorkout = await Workout.findByIdAndDelete(id);

        if (!deletedWorkout) {
            return res.status(404).json({message: "Workout not found"});
        }

        res.status(200).json(deletedWorkout);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
module.exports = { createWorkout, getWorkout: getWorkouts, deleteWorkout };