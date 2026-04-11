const express = require('express');
const router = express.Router();
const { createWorkout, getWorkout } = require('../controllers/workoutController');

router.post('/', createWorkout);
router.get('/', getWorkout);

module.exports = router;