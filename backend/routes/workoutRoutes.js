const express = require('express');
const router = express.Router();
const { createWorkout } = require('../controllers/workoutController');

router.post('/', createWorkout);

module.exports = router;