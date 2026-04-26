const WorkoutLog = require('../models/workoutLog');
const Workout = require('../models/workouts');


const createWorkoutLog = async (req, res) => {
    try {
        const newWorkoutLog = new WorkoutLog(req.body);
        const savedWorkoutLog = await newWorkoutLog.save();
        res.status(201).json(savedWorkoutLog);
    } catch(error) {
        res.status(400).json({message: error.message });
    }
};

const getWorkoutLogs = async (req, res) => {
    try {
        const workoutLogs = await WorkoutLog.find()
            .populate('workoutId', 'name date')
            .populate('exerciseId', 'name');

        res.status(200).json(workoutLogs);
    } catch(error) {
        res.status(500).json({message: error.message });
    }
};

const getWorkoutsWithLogs = async(req, res) => {
    try {
        const workouts = await Workout.find().lean();
        const workoutsWithLogs = await Promise.all(workouts.map(async (workout) => {
            const logs = await WorkoutLog.find({workoutId: workout._id}).populate('exerciseId', 'name').lean();
            return {...workout, logs: logs};
        }));

        res.status(200).json(workoutsWithLogs)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { createWorkoutLog, getWorkoutLogs, getWorkoutsWithLogs };