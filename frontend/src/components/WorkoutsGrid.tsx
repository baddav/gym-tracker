import {useEffect, useState} from "react";
import type { WorkoutWithLogs } from "../types/interface.ts";
import "../styles/WorkoutsGrid.css"

export default function WorkoutsGrid() {
    const [workoutsWithLogs, setWorkoutsWithLogs] = useState<WorkoutWithLogs[]>([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = async(workoutId: string) => {
        const isConfirmed = window.confirm("Do you wanna delete this workout?");
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3000/api/workouts/${workoutId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setWorkoutsWithLogs((prevWorkouts) => prevWorkouts.filter((workout) => workout._id !== workoutId));
            }
            else {
                alert("Error while deleting workout")
            }
        } catch(error) {
            alert("No connection to server")
        }
    }

    useEffect(() => {

        const fetchWorkoutsWithLogs = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/workoutLogs/full');
                if (!response.ok) {
                    console.error('Network response was not ok:', response.status);
                    return;
                }

                const data = await response.json();
                setWorkoutsWithLogs(data);
            } catch (error) {
                console.error('Error fetching workoutsWithLogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkoutsWithLogs();

        const intervalId = setInterval(() => {
            fetchWorkoutsWithLogs();
        }, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="workout-collection">
            {loading ? (
                <p>Loading Workouts</p>
            ) : (
                workoutsWithLogs.length === 0 ? (
                    <p>No workouts found. Time to add some!</p>
                ) : (
                    <div className="workout-list">
                        {workoutsWithLogs.map((workout) => (
                            <div key={workout._id} className="workout-entry">
                                <div className="workout-entry-header">
                                    <strong>
                                        {workout.name}
                                    </strong>
                                    <div className="workout-entry-btns">
                                        <button className="button-delete" onClick={() => handleDelete(workout._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="workoutLogs-collection">
                                    {workout.logs.map((log) =>(
                                        <div key={log._id} className="workoutLog-entry">
                                            <strong>
                                                Exercise: {log.exerciseId.name}
                                            </strong>
                                            <div className="exercise-stats">
                                                <span><strong>Sets:</strong> {log.sets}</span>
                                                <span><strong>Reps:</strong> {log.reps}</span>
                                                <span><strong>Weight:</strong> {log.weight} kg</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    )
}