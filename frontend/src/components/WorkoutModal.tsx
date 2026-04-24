import { useState } from 'react';
import '../styles/WorkoutModal.css'
import ExerciseSearch from "./ExerciseSearch";
import type { PendingExercise, Exercise } from "../types/interface"

interface WorkoutModalProps {
    onClose: () => void;
}

export default function WorkoutModal({onClose}:WorkoutModalProps) {
    const [workoutName, setWorkoutName] = useState("");
    const [workoutNotes, setWorkoutNotes] = useState("");
    const [selectedExercises, setSelectedExercises] = useState<PendingExercise[]>([]);

    const handleAddExercise = (exercise: Exercise ) => {
        const newPendingExercise: PendingExercise = {
            exerciseId: exercise._id!,
            name: exercise.name,
            sets: 1,
            reps: 1,
            weight: 0,
        };

        setSelectedExercises([...selectedExercises, newPendingExercise]);
        console.log("exercise wurde hinzugefügt")
    }

    const handleSave = async () => {
        if (!workoutName.trim()) {
            alert("pls enter a workout name!")
            return;
        }

        if (selectedExercises.length === 0) {
            alert("Please add at least one exercise!")
            return;
        }

        const newWorkout = {
            name: workoutName,
            notes: workoutNotes,
            date: new Date().toISOString()
        };

        try {
            const response = await fetch('http://localhost:3000/api/workouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newWorkout)
            });

            if (!response.ok) {
                alert("Failed to create workout")
                return;
            }

            const savedWorkout = await response.json();
            const newWorkoutId = savedWorkout._id;

            const logPromises = selectedExercises.map(ex => {
                const workoutLogData = {
                    workoutId: newWorkoutId,
                    exerciseId: ex.exerciseId,
                    sets: ex.sets,
                    reps: ex.reps,
                    weight: ex.weight
                };

                return fetch('http://localhost:3000/api/workoutlogs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(workoutLogData)
                });
            });

            await Promise.all(logPromises);
            console.log("Workout and all exercises successfully posted!");
            onClose();

        } catch(error) {
            console.error("Error connecting to the server:", error);
            alert("Could not connect to the backend");
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>New Workout</h2>

                <input
                    type="text"
                    placeholder="Workout Name (e.g. Push Day)"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                />

                <textarea
                    placeholder="Notes (optional)"
                    value={workoutNotes}
                    onChange={(e) => setWorkoutNotes(e.target.value)}
                />

                <ExerciseSearch onSelectedExercise={handleAddExercise}/>

                {selectedExercises.map((selectedExercise) => (
                    <div key={selectedExercise.exerciseId} className="selected-exercises">
                        <strong>{selectedExercise.name}</strong>
                        <input type="number" id="sets-input" min="1" max="20"/>
                        <input type="number" id="reps-input" min="1" max="100" />
                        <input type="number" id="weight-input" min="1" max="500" />
                    </div>
                ))}

                <div className="modal-actions">
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                    <button className="save-button" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}