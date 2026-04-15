import WorkoutsGrid from "../components/WorkoutsGrid.tsx";
import '../styles/Workouts.css'

export default function Workouts (){
    return (
        <div className="workout-page">
            <div className="create-button">
                <button>
                    <strong>Create</strong>
                </button>
            </div>
            <WorkoutsGrid/>
        </div>
    )
};