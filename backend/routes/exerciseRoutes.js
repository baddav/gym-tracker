const express = require('express');
const router = express.Router();
const { createExercise, getExercise } = require('../controllers/exerciseController');

router.post('/', createExercise);
router.get('/', getExercise);

module.exports = router;