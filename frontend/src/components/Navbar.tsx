import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
    return <nav className="navbar">
        <Link to={"/"} className="nav-title">Gym Tracker</Link>
        <ul>
            <li><NavLink to="/">Workouts</NavLink></li>
            <li><NavLink to="/history">History</NavLink></li>
            <li><NavLink to="/exercises">Exercises</NavLink></li>
        </ul>
        </nav>
}