const express = require('express');
const router = express.Router();
const { createWorkoutLog, getWorkoutLogs } = require('../controllers/workoutLogController');

router.post('/', createWorkoutLog);
router.get('/', getWorkoutLogs);

module.exports = router;