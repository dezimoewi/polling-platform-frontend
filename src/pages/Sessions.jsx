// import { useState, useContext, useEffect } from "react";
// import { createSession, getSessions } from "../api/session";
// import { AuthContext } from "../context/AuthContext";

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
//     try {
//       await createSession(token, { title });
//       alert("Session created!");
//       const res = await getSessions(token);
//       setSessions(res.data.sessions);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error creating session");
//     }
//   };

//   return (
//     <div>
//       <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Session title" />
//       <button onClick={handleCreate}>Create Session</button>

//       <ul>
//         {sessions.map((s) => (
//           <li key={s.id}>{s.title} ({s.code})</li>
//         ))}
//       </ul>
//     </div>


//   );
// }




import { useState, useContext, useEffect } from "react";
import { createSession, getSessions } from "../api/session";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Sessions() {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (token) {
      getSessions(token).then((res) => setSessions(res.data.sessions));
    }
  }, [token]);

  const handleCreate = async () => {
  try {
    const res = await createSession(token, { title });
    const newSession = res.data.session;

    setSessions(prev => [...prev, newSession]);
    localStorage.setItem("sessionCode", newSession.code);
    setTitle("");
    alert("Session created!");
  } catch (err) {
    alert(err.response?.data?.message || "Error creating session");
  }
};


  return (
    <div>
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
            {s.title} <br/> Session Code: {s.code} <br />
            {/* Link to session detail page */}
            <Link to={`/sessions/${s.id}`}>Manage Polls</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
