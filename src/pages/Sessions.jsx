
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


// import { useState, useEffect, useContext } from "react";
// import { createSession, getSessions, deleteSession } from "../api/session";
// import { AuthContext } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Nav.jsx";
// import Modal from "../components/Modal.jsx";

// export default function Sessions() {
//   const { token } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [sessions, setSessions] = useState([]);

//   // Modal state
//   const [modalMessage, setModalMessage] = useState(null);
//   const [confirmAction, setConfirmAction] = useState(null);

//   // Fetch sessions on load
//   useEffect(() => {
//     if (token) {
//       getSessions(token).then((res) => setSessions(res.data.sessions));
//     }
//   }, [token]);

//   // Create a new session
//   const handleCreate = async () => {
//     if (!title.trim()) return setModalMessage("Session title required");
//     try {
//       const res = await createSession(token, { title });
//       const newSession = res.data.session;
//       setSessions((prev) => [...prev, newSession]);
//       setTitle("");
//       setModalMessage("✅ Session created!");
//     } catch (err) {
//       setModalMessage(err.response?.data?.message || "Error creating session");
//     }
//   };

//   // Delete a session (confirm modal)
//   const handleDelete = (sessionId) => {
//     // open confirm modal
//     setModalMessage("Are you sure you want to delete this session?");
//     setConfirmAction(() => async () => {
//       try {
//         await deleteSession(token, sessionId);
//         setSessions((prev) => prev.filter((s) => s.id !== sessionId));
//         setModalMessage("✅ Session deleted!");
//       } catch (err) {
//         console.error(err);
//         setModalMessage(err.response?.data?.message || "Error deleting session");
//       } finally {
//         // clear confirmAction so modal switches back to OK button
//         setConfirmAction(null);
//       }
//     });
//   };

//   // Navigate to session detail and pass the session code
//   const handleManagePolls = (session) => {
//     localStorage.setItem("sessionCode", session.code); // store session code for SessionDetailPage
//     navigate(`/sessions/${session.code}`, { state: { session } });
//   };

//   return (
//     <div className="section-three">
//       <Navbar />
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
//             <strong>{s.title}</strong> <br />
//             Session Code: {s.code} <br />
//             <button onClick={() => handleManagePolls(s)}>Manage Polls</button>
//             <button
//               onClick={() => handleDelete(s.id)}
//               style={{ marginLeft: "1rem", color: "red" }}
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>

//       <Modal
//         message={modalMessage}
//         confirm={!!confirmAction}
//         onConfirm={() => {
//           if (confirmAction) confirmAction();
//         }}
//         onClose={() => {
//           setModalMessage(null);
//           setConfirmAction(null);
//         }}
//         variant={confirmAction ? "info" : "success"}
//       />
//     </div>
//   );
// }


import { useState, useEffect, useContext } from "react";
import { createSession, getSessions, deleteSession } from "../api/session";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Nav.jsx";
import Modal from "../components/Modal.jsx";

export default function Sessions() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [sessions, setSessions] = useState([]);

  // Modal state
  const [modalMessage, setModalMessage] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    if (token) {
      getSessions(token).then((res) => setSessions(res.data.sessions));
    }
  }, [token]);

  const handleCreate = async () => {
    if (!title.trim()) return setModalMessage("Session title required");
    try {
      const res = await createSession(token, { title });
      const newSession = res.data.session;
      setSessions((prev) => [...prev, newSession]);
      setTitle("");
      setModalMessage("✅ Session created!");
    } catch (err) {
      setModalMessage(err.response?.data?.message || "Error creating session");
    }
  };

  const handleDelete = (sessionId) => {
    setModalMessage("Are you sure you want to delete this session?");
    setConfirmAction(() => async () => {
      try {
        await deleteSession(token, sessionId);
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        setModalMessage("✅ Session deleted!");
      } catch (err) {
        console.error(err);
        setModalMessage(err.response?.data?.message || "Error deleting session");
      } finally {
        setConfirmAction(null);
      }
    });
  };

  const handleManagePolls = (session) => {
    localStorage.setItem("sessionCode", session.code); // keep code in storage
    navigate(`/sessions/${session.code}`, { state: { session } });
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
            <button
              onClick={() => handleDelete(s.id)}
              style={{ marginLeft: "1rem", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <Modal
        message={modalMessage}
        confirm={!!confirmAction}
        onConfirm={() => {
          if (confirmAction) confirmAction();
        }}
        onClose={() => {
          setModalMessage(null);
          setConfirmAction(null);
        }}
        variant={confirmAction ? "info" : "success"}
      />
    </div>
  );
}
