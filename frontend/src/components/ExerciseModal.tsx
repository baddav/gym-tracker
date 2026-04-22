import { useState, useEffect } from 'react';
import '../styles/ExerciseModal.css'

interface ExerciseModalProps {
    onClose: () => void;
    initialData?: any;
}

export default function ExerciseModal({onClose, initialData}:ExerciseModalProps) {
    const [exerciseName, setExerciseName] = useState("");
    const [exerciseDescription, setExerciseDescription] = useState("");
    const [exerciseMuscleGroup, setExerciseMuscleGroup] = useState("");
    const [exerciseDifficulty, setExerciseDifficutly] = useState("");

    const isEditing = !!initialData;

    useEffect(() => {
        if (initialData) {
            setExerciseName(initialData.name);
            setExerciseDescription(initialData.description);
            setExerciseMuscleGroup(initialData.muscleGroup);
            setExerciseDifficutly(initialData.difficulty);
        }
    }, [initialData]);

    const handleSave = async () => {
        if (!exerciseName.trim()|| !exerciseDescription.trim() || !exerciseMuscleGroup.trim() || !exerciseDifficulty.trim()) {
            alert("pls enter a exercise name!")
            return;
        }

        const exerciseData = {
            name: exerciseName,
            description: exerciseDescription,
            muscleGroup: exerciseMuscleGroup,
            difficulty: exerciseDifficulty,
        };

        try {
            const url = isEditing
                ? `http://localhost:3000/api/exercises/${initialData._id}`
                : 'http://localhost:3000/api/exercises';

            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exerciseData)
            });


            if (response.ok) {
                console.log(`Exercise succesfully ${isEditing ? 'updated' : 'posted'}`);
                onClose();
            } else {
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
                <h2>{isEditing ? 'Edit Exercise' : 'New Exercise'}</h2>

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

                <select name="muscleGroups" value={exerciseMuscleGroup} onChange={(e) => setExerciseMuscleGroup(e.target.value)}>
                    <option value="" disabled>Select Muscle Group...</option>
                    <option value="Chest">Chest</option>
                    <option value="Back">Back</option>
                    <option value="Legs">Legs</option>
                    <option value="Shoulders">Shoulders</option>
                    <option value="Arms">Arms</option>
                    <option value="Core">Core</option>
                </select>

                <select name="difficulty" value={exerciseDifficulty} onChange={(e) => setExerciseDifficutly(e.target.value)}>
                    <option value="" disabled>Select a difficulty...</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>


                <div className="modal-actions">
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                    <button className="save-bautton" onClick={handleSave}>{isEditing ? 'Update' : 'Save'}</button>
                </div>
            </div>
        </div>
    )
}