import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./nav";

export default function LandingPage() {
  // const { user } = useContext(AuthContext); // ✅ get logged-in user

  return (
    <div className="landing-container">
      {/* Navbar */}
      <Navbar />  

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
