require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('./models/exercise');
const Workouts = require('./models/workouts');
const WorkoutLog = require('./models/workoutLog');

const seedExercises = [
    { name: "Barbell Bench Press", muscleGroup: "Chest", description: "Flat bench, clean execution, bar lightly touches the chest.", difficulty: "Medium" },
    { name: "Barbell Squats", muscleGroup: "Legs", description: "Weight on the heels, straight back, go below 90 degrees.", difficulty: "Hard" },
    { name: "Deadlifts", muscleGroup: "Back", description: "Barbell close to the shin, build tension in the core before lifting.", difficulty: "Hard" },
    { name: "Pull-ups", muscleGroup: "Back", description: "Wide grip, pull chin over the bar.", difficulty: "Hard" },
    { name: "Overhead Press", muscleGroup: "Shoulders", description: "Press barbell overhead while standing, keep core tight.", difficulty: "Medium" },
    { name: "Dumbbell Bicep Curls", muscleGroup: "Arms", description: "Alternating, no swinging from the back.", difficulty: "Easy" },
    { name: "Tricep Pushdowns (Cable)", muscleGroup: "Arms", description: "Keep elbows close to the body, pull rope apart at the bottom.", difficulty: "Easy" },
    { name: "Leg Press", muscleGroup: "Legs", description: "Feet shoulder-width apart, don't lock knees completely at the top.", difficulty: "Medium" }
];

const seedWorkouts = [
    { name: "Full Body Strength", notes: "Focus on compound lifts, 3 sets of 5 reps each." },
    { name: "Upper Body Hypertrophy", notes: "Higher reps for muscle growth, 4 sets of 10-12 reps." },
    { name: "Leg Day", notes: "Emphasize lower body strength and hypertrophy." },
    { name: "Push Day", notes: "Chest, shoulders, and triceps focus." },
    { name: "Pull Day", notes: "Back and biceps focus, heavy pulls." }
];

const runSeed = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Deleting old data...");
        await Exercise.deleteMany({});
        await Workouts.deleteMany({});
        await WorkoutLog.deleteMany({});

        console.log("Adding new exercises and workouts...");
        const insertedExercises = await Exercise.insertMany(seedExercises);
        const insertedWorkouts = await Workouts.insertMany(seedWorkouts);

        // Find the exercises to link them up
        const benchPress = insertedExercises.find(ex => ex.name === "Barbell Bench Press");
        const squats = insertedExercises.find(ex => ex.name === "Barbell Squats");
        const deadlifts = insertedExercises.find(ex => ex.name === "Deadlifts");
        const bicepCurls = insertedExercises.find(ex => ex.name === "Dumbbell Bicep Curls");
        const pullUps = insertedExercises.find(ex => ex.name === "Pull-ups");
        const overheadPress = insertedExercises.find(ex => ex.name === "Overhead Press");
        const tricepPushdowns = insertedExercises.find(ex => ex.name === "Tricep Pushdowns (Cable)");

        // Find the workouts to link them up
        const fullBody = insertedWorkouts.find(w => w.name === "Full Body Strength");
        const upperBody = insertedWorkouts.find(w => w.name === "Upper Body Hypertrophy");
        const legDay = insertedWorkouts.find(w => w.name === "Leg Day");
        const pushDay = insertedWorkouts.find(w => w.name === "Push Day");
        const pullDay = insertedWorkouts.find(w => w.name === "Pull Day");

        // Create the workout logs using the _ids
        const seedWorkoutLogs = [
            // Full Body
            { workoutId: fullBody._id, exerciseId: benchPress._id, sets: 3, reps: 5, weight: 80 },
            { workoutId: fullBody._id, exerciseId: squats._id, sets: 3, reps: 5, weight: 100 },

            // Upper Body
            { workoutId: upperBody._id, exerciseId: benchPress._id, sets: 4, reps: 10, weight: 65 },
            { workoutId: upperBody._id, exerciseId: bicepCurls._id, sets: 3, reps: 12, weight: 15 },

            // Leg Day
            { workoutId: legDay._id, exerciseId: squats._id, sets: 4, reps: 8, weight: 90 },
            { workoutId: legDay._id, exerciseId: deadlifts._id, sets: 3, reps: 5, weight: 120 },

            // Push Day
            { workoutId: pushDay._id, exerciseId: benchPress._id, sets: 4, reps: 8, weight: 75 },
            { workoutId: pushDay._id, exerciseId: overheadPress._id, sets: 3, reps: 10, weight: 45 },
            { workoutId: pushDay._id, exerciseId: tricepPushdowns._id, sets: 3, reps: 12, weight: 25 },

            // Pull Day
            { workoutId: pullDay._id, exerciseId: deadlifts._id, sets: 3, reps: 5, weight: 110 },
            { workoutId: pullDay._id, exerciseId: pullUps._id, sets: 3, reps: 8, weight: 0 },
            { workoutId: pullDay._id, exerciseId: bicepCurls._id, sets: 4, reps: 10, weight: 12 }
        ];

        await WorkoutLog.insertMany(seedWorkoutLogs);

        console.log("Success! The database has been seeded with exercises, workouts, and logs.");
        process.exit(0);
    } catch (error) {
        console.error("Error while seeding:", error);
        process.exit(1);
    }
};

runSeed();