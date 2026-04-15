import { useState } from 'react';
import '../styles/ExerciseModal.css'

interface ExerciseModalProps {
    onClose: () => void;
}

export default function ExerciseModal({onClose}:ExerciseModalProps) {
    const [exerciseName, setExerciseName] = useState("");
    const [exerciseDescription, setExerciseDescription] = useState("");
    const [exerciseMuscleGroup, setExerciseMuscleGroup] = useState("");
    const [exercsieDifficulty, setExerciseDifficutly] = useState("");

    const handleSave = async () => {
        if (!exerciseName.trim()|| !exerciseDescription.trim() || !exerciseMuscleGroup.trim() || !exercsieDifficulty.trim()) {
            alert("pls enter a exercise name!")
            return;
        }

        const newExercise = {
            name: exerciseName,
            description: exerciseDescription,
            muscleGroup: exerciseMuscleGroup,
            difficulty: exercsieDifficulty,
        };

        try {
            const response = await fetch('http://localhost:3000/api/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newExercise)
            });

            if (response.ok) {
                console.log("Exercise succesfully postet");
                onClose();
            } else {
                console.log("Failed to post new exercise")
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
                <h2>New Exercise</h2>

                <input
                    type="text"
                    placeholder="Exercise Name"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                />

                <textarea
                    placeholder="description"
                    value={exerciseDescription}
                    onChange={(e) => setExerciseDescription(e.target.value)}
                />

                <select name="muscleGroups" onChange={(e) => setExerciseMuscleGroup(e.target.value)}>
                    <option value="Chest">Chest</option>
                    <option value="Back">Back</option>
                    <option value="Legs">Legs</option>
                    <option value="Shoulders">Shoulders</option>
                    <option value="Arms">Arms</option>
                    <option value="Core">Core</option>
                </select>

                <select name="difficulty" onChange={(e) => setExerciseDifficutly(e.target.value)}>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>


                <div className="modal-actions">
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                    <button className="save-bautton" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}