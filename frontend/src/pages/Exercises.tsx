import { useState, useEffect } from 'react';
import type { Exercise } from '../types/interface';

export default function Exercises() {

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/exercises');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
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
            <h1>exercises</h1>
            {loading ? (
                <p>Loading exercises...</p>
            ) : (
                exercises.length === 0 ? (
                    <p>No exercises found. Time to add some!</p>
                ) : (
                    <ul>
                        {exercises.map((exercise) => (
                            <li key={exercise._id} style={{ marginBottom: '10px' }}>
                                <strong>{exercise.name}</strong>
                                <span style={{ color: 'gray', marginLeft: '10px' }}>
                                ({exercise.muscleGroup})
                            </span>
                            </li>
                        ))}
                    </ul>
                )
            )}
        </div>
    )
};