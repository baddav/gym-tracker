import WorkoutsGrid from "../components/WorkoutsGrid.tsx";
import WorkoutModal from "../components/WorkoutModal.tsx";
import {useState} from "react";
import '../styles/Button.css'

export default function Workouts (){
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div className="workout-page">
            <div className="create-button">
                <button onClick={() => setIsModalOpen(true)}>
                    <strong>Create</strong>
                </button>
            </div>
            <WorkoutsGrid/>

            {isModalOpen && (
                <WorkoutModal onClose={() => setIsModalOpen(false)}/>
                )}
        </div>
    )
};