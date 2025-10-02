
// import { useState, useContext, useEffect } from "react";
// import { createSession, getSessions } from "../api/session";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import Navbar from "../components/nav";

// export default function Sessions() {
//   const { token } = useContext(AuthContext);
//   const [title, setTitle] = useState("");
//   const [sessions, setSessions] = useState([]);

//   useEffect(() => {
//     if (token) {
//       getSessions(token).then((res) => setSessions(res.data.sessions));
//     }
//   }, [token]);

//   const handleCreate = async () => {
//   try {
//     const res = await createSession(token, { title });
//     const newSession = res.data.session;

//     setSessions(prev => [...prev, newSession]);
//     localStorage.setItem("sessionCode", newSession.code);
//     setTitle("");
//     alert("Session created!");
//   } catch (err) {
//     alert(err.response?.data?.message || "Error creating session");
//   }
// };


//   return (
//     <div className="section-three">
//             <Navbar />  

//       <h2>My Sessions</h2>

//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Session title"
//       />
//       <button onClick={handleCreate}>Create Session</button>

//       <ul>
//         {sessions.map((s) => (
//           <li key={s.id}>
//             {s.title} <br/> Session Code: {s.code} <br />
//             {/* Link to session detail page */}
//             <Link to={`/sessions/${s.id}`}>Manage Polls</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// src/pages/Sessions.jsx
import { useState, useEffect, useContext } from "react";
import { createSession, getSessions, deleteSession } from "../api/session";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/nav";

export default function Sessions() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [sessions, setSessions] = useState([]);

  // Fetch sessions on load
  useEffect(() => {
    if (token) {
      getSessions(token).then((res) => setSessions(res.data.sessions));
    }
  }, [token]);

  // Create a new session
  const handleCreate = async () => {
    if (!title.trim()) return alert("Session title required");
    try {
      const res = await createSession(token, { title });
      const newSession = res.data.session;
      setSessions((prev) => [...prev, newSession]);
      setTitle("");
      alert("Session created!");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating session");
    }
  };

  // Delete a session
  const handleDelete = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;
    try {
      await deleteSession(token, sessionId);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      alert("Session deleted!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error deleting session");
    }
  };

  // Navigate to session detail and pass the session code
  const handleManagePolls = (session) => {
    localStorage.setItem("sessionCode", session.code); // store session code for SessionDetailPage
    navigate(`/sessions/${session.id}`);
  };

  return (
    <div className="section-three">
      <Navbar />
      <h2>My Sessions</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Session title"
      />
      <button onClick={handleCreate}>Create Session</button>

      <ul>
        {sessions.map((s) => (
          <li key={s.id}>
            <strong>{s.title}</strong> <br />
            Session Code: {s.code} <br />
            <button onClick={() => handleManagePolls(s)}>Manage Polls</button>
            <button onClick={() => handleDelete(s.id)} style={{ marginLeft: "1rem", color: "red" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
