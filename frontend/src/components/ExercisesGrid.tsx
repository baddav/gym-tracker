import {useEffect, useState} from "react";
import type {Exercise} from "../types/interface.ts";
import '../styles/ExercisesGrid.css'

export default function ExercisesGrid() {

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);

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
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    )
};