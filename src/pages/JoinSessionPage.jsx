

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Nav.jsx";
import { useSession } from "../context/SessionContext";
import Modal from "../components/Modal.jsx";

export default function JoinSessionPage() {
  const [sessionCodeInput, setSessionCodeInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setSessionCode, setParticipant } = useSession();

  // Modal state + optional post-action
  const [modalMessage, setModalMessage] = useState(null);
  const [postAction, setPostAction] = useState(null);

  const handleJoin = async () => {
    if (!sessionCodeInput || !name || !email) return setModalMessage("Fill all fields");

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:5000/api/participants/${sessionCodeInput}/join`,
        { name, email }
      );

      setSessionCode(sessionCodeInput); // store globally
      setParticipant(res.data.participant); // store globally

      localStorage.setItem("participantName", name);
      localStorage.setItem("participantEmail", email);

      // Instead of navigating immediately, show modal and navigate after user clicks OK
      setPostAction(() => () => {
        navigate(`/participant/${sessionCodeInput}`);
      });
      setModalMessage("✅ Joined session!");
    } catch (err) {
      console.error(err);
      setModalMessage(err.response?.data?.message || "Error joining session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-session-page">
      <Navbar />
      <h2>Join a Session</h2>
      <input
        type="text"
        placeholder="Session Code"
        value={sessionCodeInput}
        onChange={(e) => setSessionCodeInput(e.target.value.toUpperCase())}
      />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleJoin} disabled={loading}>
        {loading ? "Joining..." : "Join Session"}
      </button>

      <Modal
        message={modalMessage}
        onClose={() => {
          // run post action if present
          if (postAction) {
            postAction();
            setPostAction(null);
          }
          setModalMessage(null);
        }}
        variant={modalMessage && modalMessage.startsWith("✅") ? "success" : "error"}
      />
    </div>
  );
}

