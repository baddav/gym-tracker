const express = require('express');
const router = express.Router();
const { createExercise, getExercise, updateExercise } = require('../controllers/exerciseController');

router.post('/', createExercise);
router.get('/', getExercise);
router.put('/:id', updateExercise);

module.exports = router;