const express = require('express');
const router = express.Router();
const { createWorkoutLog, getWorkoutLogs, getWorkoutsWithLogs, getWorkoutsWithLogsByRange} = require('../controllers/workoutLogController');

router.post('/', createWorkoutLog);
router.get('/', getWorkoutLogs);
router.get('/full', getWorkoutsWithLogs)
router.get('/range', getWorkoutsWithLogsByRange)

module.exports = router;