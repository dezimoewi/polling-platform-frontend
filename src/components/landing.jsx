
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./darkMode";
import { AuthContext } from "../context/AuthContext"; // ✅ import AuthContext
import ResultsPage from '../pages/ResultsPage';

export default function LandingPage() {
  const { user } = useContext(AuthContext); // ✅ get logged-in user

  return (
    <div className="landing-container">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">PollingApp</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/join">Join Session</Link>
            </li>
            <li>
              {/* <Link to="/results">ResultsPage</Link> */}
              <li><Link to="/sessions/ABC123/results">Results</Link></li>

            </li>

            {/* {user && user.role === "host" && (
              <li><Link to="/sessions/:sessionCode/results">Results</Link></li>
            )} */}
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

      {/* Hero Section */}
      <section className="hero">
        <h2>Your Voice, Your Polls</h2>
        <p>
          Create, share, and vote on polls instantly. Engage your community and
          get real-time results.
        </p>
        <Link to="/register" className="cta-btn">
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h3>Why Choose Pollify?</h3>
        <div className="feature-grid">
          <div className="feature-card">
            <h4>Easy to Use</h4>
            <p>Create polls with just a few clicks and share them anywhere.</p>
          </div>
          <div className="feature-card">
            <h4>Real-Time Results</h4>
            <p>See live updates as people cast their votes instantly.</p>
          </div>
          <div className="feature-card">
            <h4>Secure & Reliable</h4>
            <p>Your polls and votes are safe with our secure platform.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Pollify. All rights reserved.</p>
      </footer>
    </div>
  );
}
