import {useEffect, useState} from "react";
import type {Workout} from "../types/interface.ts";
import "../styles/WorkoutsGrid.css"



export default function WorkoutsGrid() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = async(workoutId: string) => {

        const isConfirmed = window.confirm("Do you wanna delete this workout?");
        if (!isConfirmed) return;

        try {

            const response = await fetch(`http://localhost:3000/api/workouts/${workoutId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setWorkouts((prevWorkouts) => prevWorkouts.filter((ex) => ex._id !== workoutId));
            }
            else {
                alert("Error while deleting workout")
            }
        } catch(error) {
            alert("No connection to server")
        }
    }

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/workouts');
                if (!response.ok) {
                    console.error('Network response was not ok:', response.status);
                    return;
                }

                const data = await response.json();
                setWorkouts(data);
            } catch (error) {
                console.error('Error fetching workouts:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchWorkouts();
    }, []);

    return (
        <div className="workout-collection">
            {loading ? (
                <p>Loading Workouts</p>
            ) : (
                workouts.length === 0 ? (
                    <p>No workouts found. Time to add some!</p>
                ) : (
                    <div className="workout-list">
                        {workouts.map((workout) => (
                            <div key={workout._id} className="workout-entry">
                                <strong>
                                    {workout.name}
                                </strong>
                                <div className="workout-entry-btns">
                                    <button className="button-detail">
                                        Start
                                    </button>
                                    <button className="button-delete" onClick={() => handleDelete(workout._id!)}>
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
}