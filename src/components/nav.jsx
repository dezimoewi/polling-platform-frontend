import { Link } from "react-router-dom";
import DarkModeToggle from "./darkMode";

function Navbar() {
  return (
    <header className="navbar">
      <h1 className="logo">PollingApp</h1>
      <nav>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/join">Join Session</Link></li>
        </ul>
      </nav>
      <div className="hamburger-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          fill="#000000"
        >
          <path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z" />
        </svg>
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Navbar;
