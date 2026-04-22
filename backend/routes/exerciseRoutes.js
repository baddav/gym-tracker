const express = require('express');
const router = express.Router();
const { createExercise, getExercise, updateExercise, deleteExercise } = require('../controllers/exerciseController');

router.post('/', createExercise);
router.get('/', getExercise);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);

module.exports = router;