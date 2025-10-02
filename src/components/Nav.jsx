
// import { Link } from "react-router-dom";
// import DarkModeToggle from "./darkMode";

// function Navbar() {
//   return (
//     <header className="navbar">
//       <h1 className="logo">PollingApp</h1>
//       <nav>
//         <ul className="nav-links">
//           {/* Static routes */}
//           <li>
//             <Link to="/sessions">Sessions</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//           <li>
//             <Link to="/register">Register</Link>
//           </li>
//           <li>
//             <Link to="/join">Join Session</Link>
//           </li>

//           {/* ⚠️ Routes with params need placeholders */}
//           <li>
//             <Link to="/sessions/123">Session Detail (example)</Link>
//           </li>
//           <li>
//             <Link to="/waiting/123">Waiting Page (example)</Link>
//           </li>
//           <li>
//             <Link to="/sessions/123/results">Results Page (example)</Link>
//           </li>
//         </ul>
//       </nav>
//       <div className="hamburger-icon">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           height="40px"
//           viewBox="0 -960 960 960"
//           width="40px"
//           fill="#000000"
//         >
//           <path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z" />
//         </svg>
//         <DarkModeToggle />
//       </div>
//     </header>
//   );
// }

// export default Navbar;


// import { Link } from "react-router-dom";
// import DarkModeToggle from "./darkMode";
// import { useSession } from "../context/SessionContext";

// function Navbar() {
//   const { sessionCode } = useSession();

//   return (
//     <header className="navbar">
//       <h1 className="logo">PollingApp</h1>
//       <nav>
//         <ul className="nav-links">
//           {sessionCode && (
//             <>
//               <li>
//                 <Link to={`/sessions/${sessionCode}`}>Session Detail</Link>
//               </li>
//               <li>
//                 <Link to={`/waiting/${sessionCode}`}>Waiting Page</Link>
//               </li>
//               <li>
//                 <Link to={`/sessions/${sessionCode}/results`}>Results</Link>
//               </li>
//             </>
//           )}
//           <li>
//             <Link to="/sessions">All Sessions</Link>
//           </li>
//           <li>
//             <Link to="/join">Join Session</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//           <li>
//             <Link to="/register">Register</Link>
//           </li>
//         </ul>
//       </nav>
//       <div className="hamburger-icon">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           height="40px"
//           viewBox="0 -960 960 960"
//           width="40px"
//           fill="#000000"
//         >
//           <path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z" />
//         </svg>
//         <DarkModeToggle />
//       </div>
//     </header>
//   );
// }

// export default Navbar;



import { Link } from "react-router-dom";
import DarkModeToggle from "./darkMode";
import { useSession } from "../context/SessionContext";

function Navbar() {
  const { sessionCode, participant } = useSession();

  return (
    <header className="navbar">
      <h1 className="logo">PollingApp</h1>
      <nav>
        <ul className="nav-links">
          {sessionCode && (
            <>
              <li>
                <Link to={`/sessions/${sessionCode}`}>Session Detail</Link>
              </li>
              <li>
                <Link to={`/waiting/${sessionCode}`}>Waiting Page</Link>
              </li>
              <li>
                <Link to={`/sessions/${sessionCode}/results`}>Results</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/sessions">All Sessions</Link>
          </li>
          <li>
            <Link to="/join">Join Session</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
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
      {participant && (
        <p className="participant-info">Logged in as: {participant.name}</p>
      )}
    </header>
  );
}

export default Navbar;
