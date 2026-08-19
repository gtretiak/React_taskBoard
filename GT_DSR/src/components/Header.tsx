import "../../styles/Header.css"
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    function handleLogout() {
        navigate("/login");
    }
    return (
        <header className="header">
        <div>
        <h1>George Targets</h1>
        <p>Probably one of the best task boards ever...</p>
        </div>
        <nav className="nav">
            <NavLink to="/tasks">Tasks</NavLink>
            <br />
            <NavLink to="/login">Login</NavLink>
            <br />
            <NavLink to="/register">Register</NavLink>
            <br />
            <button type="button" onClick={handleLogout}>Logout</button>
        </nav>
        </header>
    );
}
export default Header;