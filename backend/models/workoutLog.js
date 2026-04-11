const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
    exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true},
    sets: { ype: Number, required: true, min: [1, 'You have to do at least 1 set']},
    reps: { type: Number, required: true, min: [1, 'You have to do at least 1 rep']},
    weight: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);