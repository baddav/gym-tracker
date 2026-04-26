const express = require('express');
const router = express.Router();
const { createWorkout, getWorkout, deleteWorkout } = require('../controllers/workoutController');

router.post('/', createWorkout);
router.get('/', getWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;