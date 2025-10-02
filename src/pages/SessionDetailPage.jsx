import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getPolls,
  createPoll,
  updatePollStatus,
  deletePoll,
} from "../api/poll";
import { useSocket } from "../context/SessionContext";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Nav.jsx";
import Modal from "../components/Modal.jsx";

export default function SessionDetailPage() {
  const { token } = useContext(AuthContext);
  const socket = useSocket();
  const location = useLocation();
  const { sessionCode: sessionCodeFromParams } = useParams();
  const sessionFromState = location.state?.session;

  // ✅ Use state, localStorage, or params
  const [sessionCode] = useState(
    sessionFromState?.code ||
      localStorage.getItem("sessionCode") ||
      sessionCodeFromParams ||
      ""
  );

  const [polls, setPolls] = useState([]);
  const [results, setResults] = useState([]);
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("single-choice");
  const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [modalMessage, setModalMessage] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const fetchPolls = async () => {
    if (!sessionCode || !token) return;
    try {
      setLoading(true);
      const res = await getPolls(sessionCode, token);
      setPolls(res.data.polls || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async () => {
    if (!sessionCode || !token) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/sessions/${sessionCode}/submissions`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setResults(data.submissions || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (sessionCode) {
      fetchPolls();
      fetchResults();
    }
  }, [sessionCode]);

  useEffect(() => {
    if (!socket || !sessionCode) return;

    socket.emit("joinSession", sessionCode);

    socket.on("pollCreated", (newPoll) =>
      setPolls((prev) => [newPoll, ...prev])
    );
    socket.on("pollUpdated", (updatedPoll) =>
      setPolls((prev) =>
        prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
      )
    );
    socket.on("participantSubmitted", () => {
      fetchResults();
    });

    return () => {
      socket.off("pollCreated");
      socket.off("pollUpdated");
      socket.off("participantSubmitted");
    };
  }, [socket, sessionCode]);

  const handleCreatePoll = async () => {
    if (!question.trim()) return setModalMessage("Question required");
    try {
      await createPoll(sessionCode, token, { question, type, options });
      setQuestion("");
      setType("single-choice");
      setOptions([{ text: "" }, { text: "" }]);
      setModalMessage("✅ Poll created successfully!");
    } catch (err) {
      console.error(err);
      setModalMessage(err.response?.data?.message || "Error creating poll");
    }
  };

  const handlePublishResults = () => {
    socket.emit("resultsPublished", { sessionCode });
    setModalMessage("✅ Results published!");
  };

  const handleClosePoll = async (pollId) => {
    try {
      await updatePollStatus(pollId, token, "closed");
      fetchPolls();
      setModalMessage("✅ Poll closed");
    } catch (err) {
      console.error(err);
      setModalMessage(err.response?.data?.message || "Error closing poll");
    }
  };

  const handleDeletePoll = (pollId) => {
    setModalMessage("Delete this poll?");
    setConfirmAction(() => async () => {
      try {
        await deletePoll(pollId, token);
        setPolls((prev) => prev.filter((p) => p.id !== pollId));
        setModalMessage("✅ Poll deleted!");
      } catch (err) {
        console.error(err);
        setModalMessage(err.response?.data?.message || "Error deleting poll");
      } finally {
        setConfirmAction(null);
      }
    });
  };

  const handleAddOption = () => setOptions([...options, { text: "" }]);
  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx].text = value;
    setOptions(newOptions);
  };

  return (
    <div className="session-page">
      <Navbar />
      <h2 className="page-title">Session Detail</h2>

      <section className="session-section">
        <h3>Session Info</h3>
        <p>
          <strong>Code:</strong> {sessionCode}
        </p>
      </section>

      <section className="session-section">
        <h3>Create Poll</h3>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="single-choice">Single Choice</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="open-ended">Open Ended</option>
        </select>
        {type !== "open-ended" &&
          options.map((o, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={o.text}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
            />
          ))}
        {type !== "open-ended" && (
          <button className="btn-secondary" onClick={handleAddOption}>
            Add Option
          </button>
        )}
        <button className="btn-primary" onClick={handleCreatePoll}>
          Create Poll
        </button>
      </section>

      <section className="session-section">
        <h3>Live Polls</h3>
        {loading ? (
          <p>Loading...</p>
        ) : polls.length === 0 ? (
          <p>No polls yet</p>
        ) : (
          polls.map((p) => (
            <div key={p.id} className="poll-card">
              <strong>{p.question}</strong> ({p.type}) — {p.status}
              <br />
              <button
                className="btn-warning"
                onClick={() => handleClosePoll(p.id)}
              >
                Close
              </button>
              <button
                className="btn-danger"
                onClick={() => handleDeletePoll(p.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </section>

      <section className="session-section">
        <h3>Participant Submissions</h3>
        <button className="btn-primary" onClick={handlePublishResults}>
          Publish Results
        </button>
        {results.length === 0 ? (
          <p>No submissions yet</p>
        ) : (
          results.map((res, idx) => (
            <div key={idx} className="submission-card">
              <p>
                <strong>{res.participant_email}</strong>
              </p>
              <pre>{JSON.stringify(res.answers, null, 2)}</pre>
            </div>
          ))
        )}
      </section>

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
