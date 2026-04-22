import '../styles/ExercisesGrid.css';
import ExercisesGrid from "../components/ExercisesGrid.tsx";
import ExerciseModal from "../components/ExerciseModal.tsx";
import {useState} from "react";
import type {Exercise} from "../types/interface.ts";

export default function Exercises() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

    const handleCreate = () => {
        setSelectedExercise(null);
        setIsModalOpen(true);
    }

    const handleEdit = (exercise: Exercise) => {
        setSelectedExercise(exercise);
        setIsModalOpen(true)
    }

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedExercise(null)
    }

    return (
        <div className="exercise-page">
            <div className="create-button">
                <button onClick={handleCreate}>
                    <strong>Create</strong>
                </button>
            </div>

            <ExercisesGrid onEditClick={handleEdit}/>

            {isModalOpen && (
                <ExerciseModal initialData={selectedExercise} onClose={handleClose}/>
            )}
        </div>

    )
};