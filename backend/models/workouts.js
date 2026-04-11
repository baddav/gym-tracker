const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    workoutId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    notes: { type: String, required: false }
},{timestamps:true});

module.exports = mongoose.model('Workout', workoutSchema);