import {useEffect, useState} from "react";
import type {Exercise} from "../types/interface.ts";
import '../styles/ExercisesGrid.css'
import '../styles/Button.css'

interface ExerciseGridProps {
    onEditClick: (exercise: Exercise) => void;
}

export default function ExercisesGrid({ onEditClick }: ExerciseGridProps) {

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = async(exerciseId: string) => {
        const isConfirmed = window.confirm("Do you wanna delete this exercise?");
        if(!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3000/api/exercises/${exerciseId}`, {
                method: 'DELETE',
            });

            if (response.ok) {

                setExercises((prevExercises) => prevExercises.filter((ex) => ex._id !== exerciseId));
            }
            else {
                alert("Error while deleting exercise")
            }
        } catch(error) {
            alert("No connection to server")
        }
    }

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/exercises');
                if (!response.ok) {
                    console.error('Network response was not ok:', response.status);
                    return;
                }

                const data = await response.json();
                setExercises(data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    return (
        <div className="exercise-collection">
            {loading ? (
                <p>Loading exercises...</p>
            ) : (
                exercises.length === 0 ? (
                    <p>No exercises found. Time to add some!</p>
                ) : (
                    <div className="exercise-list">
                        {exercises.map((exercise) => (
                            <div key={exercise._id} className="exercise-entry">
                                <strong>{exercise.name}</strong>
                                <div className="exercise-entry-btns">
                                    <button className="button-detail" onClick={() => onEditClick(exercise)}>
                                        Details
                                    </button>
                                    <button className="button-delete" onClick={() => handleDelete(exercise._id!)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                )
            )}
        </div>
    )
};
