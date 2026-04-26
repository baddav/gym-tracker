const express = require('express');
const router = express.Router();
const { createWorkoutLog, getWorkoutLogs, getWorkoutsWithLogs} = require('../controllers/workoutLogController');

router.post('/', createWorkoutLog);
router.get('/', getWorkoutLogs);
router.get('/full', getWorkoutsWithLogs)

module.exports = router;