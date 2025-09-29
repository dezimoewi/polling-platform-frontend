// import React from "react";

// export default function LandingPage() {
//   return (
//     <div className="landing-container">
//       {/* Navbar */}
//       <header className="navbar">
//         <h1 className="logo">PollingApp</h1>
//         <nav>
//           <ul className="nav-links">
//             <li><a href="#features">Features</a></li>
//             <li><a href="#about">About</a></li>
//             <li><a href="#contact">Contact</a></li>
//           </ul>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="hero">
//         <h2>Your Voice, Your Polls</h2>
//         <p>
//           Create, share, and vote on polls instantly. Engage your community and
//           get real-time results.
//         </p>
//         <a href="/register" className="cta-btn">Get Started</a>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="features">
//         <h3>Why Choose Pollify?</h3>
//         <div className="feature-grid">
//           <div className="feature-card">
//             <h4>Easy to Use</h4>
//             <p>Create polls with just a few clicks and share them anywhere.</p>
//           </div>
//           <div className="feature-card">
//             <h4>Real-Time Results</h4>
//             <p>See live updates as people cast their votes instantly.</p>
//           </div>
//           <div className="feature-card">
//             <h4>Secure & Reliable</h4>
//             <p>Your polls and votes are safe with our secure platform.</p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <p>&copy; {new Date().getFullYear()} Pollify. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }




// import React from "react";
// import { Link } from "react-router-dom";

// export default function LandingPage() {
//   return (
//     <div className="landing-container">
//       {/* Navbar */}
//       <header className="navbar">
//         <h1 className="logo">PollingApp</h1>
//         <nav>
//           <ul className="nav-links">
//             <li><a href="#features">Features</a></li>
//             <li><a href="#about">About</a></li>
//             <li><a href="#contact">Contact</a></li>

//             {/* Auth Links */}
//             <li><Link to="/login">Login</Link></li>
//             <li><Link to="/register">Register</Link></li>
//           </ul>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="hero">
//         <h2>Your Voice, Your Polls</h2>
//         <p>
//           Create, share, and vote on polls instantly. Engage your community and
//           get real-time results.
//         </p>
//         <Link to="/register" className="cta-btn">Get Started</Link>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="features">
//         <h3>Why Choose Pollify?</h3>
//         <div className="feature-grid">
//           <div className="feature-card">
//             <h4>Easy to Use</h4>
//             <p>Create polls with just a few clicks and share them anywhere.</p>
//           </div>
//           <div className="feature-card">
//             <h4>Real-Time Results</h4>
//             <p>See live updates as people cast their votes instantly.</p>
//           </div>
//           <div className="feature-card">
//             <h4>Secure & Reliable</h4>
//             <p>Your polls and votes are safe with our secure platform.</p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <p>&copy; {new Date().getFullYear()} Pollify. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }



import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">PollingApp</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>

            {/* Auth & Join Links */}
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/join">Join Session</Link></li> {/* <-- Added link */}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Your Voice, Your Polls</h2>
        <p>
          Create, share, and vote on polls instantly. Engage your community and
          get real-time results.
        </p>
        <Link to="/register" className="cta-btn">Get Started</Link>
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
