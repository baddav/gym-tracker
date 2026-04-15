import { useState } from 'react';
import '../styles/WorkoutModal.css'

interface WorkoutModalProps {
    onClose: () => void;
}

export default function WorkoutModal({onClose}:WorkoutModalProps) {
    const [workoutName, setWorkoutName] = useState("");
    const [workoutNotes, setWorkoutNotes] = useState("");

    const handleSave = () => {
        console.log("POST Request: Speichere", workoutName, workoutNotes);
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
                    <button className="save-bautton" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}