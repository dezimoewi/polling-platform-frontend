import { useState, useContext, useEffect } from "react";
import { createSession, getSessions } from "../api/session";
import { AuthContext } from "../context/AuthContext";

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
      await createSession(token, { title });
      alert("Session created!");
      const res = await getSessions(token);
      setSessions(res.data.sessions);
    } catch (err) {
      alert(err.response?.data?.message || "Error creating session");
    }
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Session title" />
      <button onClick={handleCreate}>Create Session</button>

      <ul>
        {sessions.map((s) => (
          <li key={s.id}>{s.title} ({s.code})</li>
        ))}
      </ul>
    </div>
  );
}
