const WorkoutLog = require('../models/workoutLog');


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
module.exports = { createWorkoutLog, getWorkoutLogs };