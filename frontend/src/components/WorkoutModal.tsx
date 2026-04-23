import { useState } from 'react';
import '../styles/WorkoutModal.css'

interface WorkoutModalProps {
    onClose: () => void;
}

export default function WorkoutModal({onClose}:WorkoutModalProps) {
    const [workoutName, setWorkoutName] = useState("");
    const [workoutNotes, setWorkoutNotes] = useState("");

    const handleSave = async () => {
        if (!workoutName.trim()) {
            alert("pls enter a workout name!")
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

            if (response.ok) {
                console.log("Workout succesfully postet");
                onClose();
            } else {
                console.log("Failed to post new workout")
                alert("Something went wrong with posting")
            }
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

                <div className="modal-actions">
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                    <button className="save-button" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}