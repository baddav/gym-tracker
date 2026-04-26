const Workout = require('../models/workouts');
const WorkoutLog = require('../models/workoutLog');

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

        await WorkoutLog.deleteMany({ workoutId: id});

        const deletedWorkout = await Workout.findByIdAndDelete(id);

        if (!deletedWorkout) {
            return res.status(404).json({message: "Workout not found"});
        }

        res.status(200).json({
            message: "Workout and associated logs deleted successfully",
            deletedWorkout
        });

    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
module.exports = { createWorkout, getWorkout: getWorkouts, deleteWorkout };