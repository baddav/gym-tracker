import '../styles/ExercisesGrid.css';
import ExercisesGrid from "../components/ExercisesGrid.tsx";
import ExerciseModal from "../components/ExerciseModal.tsx";
import {useState} from "react";

export default function Exercises() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="exercise-page">
            <div className="create-button">
                <button onClick={() => setIsModalOpen(true)}>
                    <strong>Create</strong>
                </button>
            </div>

            <ExercisesGrid/>

            {isModalOpen && (
                <ExerciseModal onClose={() => setIsModalOpen(false)}/>
            )}
        </div>

    )
};