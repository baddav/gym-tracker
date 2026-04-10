import { Link } from 'react-router-dom';

export const Navbar = () => {
    return <nav className="navbar">
        <ul>
            <li><Link to="/">Workouts</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/exercises">Exercises</Link></li>
        </ul>
        </nav>
}