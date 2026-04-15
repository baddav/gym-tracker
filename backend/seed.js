require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('./models/exercise');
const Workouts = require('./models/workouts');

const seedExercises = [
    {
        name: "Barbell Bench Press",
        muscleGroup: "Chest",
        description: "Flat bench, clean execution, bar lightly touches the chest.",
        difficulty: "Medium"
    },
    {
        name: "Barbell Squats",
        muscleGroup: "Legs",
        description: "Weight on the heels, straight back, go below 90 degrees.",
        difficulty: "Hard"
    },
    {
        name: "Deadlifts",
        muscleGroup: "Back",
        description: "Barbell close to the shin, build tension in the core before lifting.",
        difficulty: "Hard"
    },
    {
        name: "Pull-ups",
        muscleGroup: "Back",
        description: "Wide grip, pull chin over the bar.",
        difficulty: "Hard"
    },
    {
        name: "Overhead Press",
        muscleGroup: "Shoulders",
        description: "Press barbell overhead while standing, keep core tight.",
        difficulty: "Medium"
    },
    {
        name: "Dumbbell Bicep Curls",
        muscleGroup: "Arms",
        description: "Alternating, no swinging from the back.",
        difficulty: "Easy"
    },
    {
        name: "Tricep Pushdowns (Cable)",
        muscleGroup: "Arms",
        description: "Keep elbows close to the body, pull rope apart at the bottom.",
        difficulty: "Easy"
    },
    {
        name: "Leg Press",
        muscleGroup: "Legs",
        description: "Feet shoulder-width apart, don't lock knees completely at the top.",
        difficulty: "Medium"
    }
];

const seedWorkouts = [
    {
        name: "Full Body Strength",
        notes: "Focus on compound lifts, 3 sets of 5 reps each."
    },
    {
        name: "Upper Body Hypertrophy",
        notes: "Higher reps for muscle growth, 4 sets of 10-12 reps."
    },
    {
        name: "Leg Day",
        notes: "Emphasize lower body strength and hypertrophy."
    }
];

const runSeed = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected!");

        console.log("Deleting old exercises and workouts...");
        await Exercise.deleteMany({});
        await Workouts.deleteMany({});

        console.log("Adding new exercises and workouts...");
        await Exercise.insertMany(seedExercises);
        await Workouts.insertMany(seedWorkouts);

        console.log("Success! The database has been seeded.");
        process.exit(0);
    } catch (error) {
        console.error("Error while seeding:", error);
        process.exit(1);
    }
};

runSeed();