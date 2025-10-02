

// // src/pages/ParticipantPage.jsx
// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/nav";
// import { SessionContext } from "../context/SessionContext";

// export default function ParticipantPage() {
//   const { sessionCode } = useParams();
//   const navigate = useNavigate();
//   const { socket } = useContext(SessionContext); // Use global socket
//   const [polls, setPolls] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Listen to real-time poll updates
//   useEffect(() => {
//     if (!socket) return;

//     socket.emit("joinSession", sessionCode);

//     socket.on("pollCreated", (newPoll) => setPolls((prev) => [...prev, newPoll]));
//     socket.on("pollUpdated", (updatedPoll) =>
//       setPolls((prev) =>
//         prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
//       )
//     );

//     return () => {
//       socket.off("pollCreated");
//       socket.off("pollUpdated");
//     };
//   }, [socket, sessionCode]);

//   // Fetch polls from backend
//   useEffect(() => {
//     const fetchPolls = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/sessions/${sessionCode}/polls`
//         );
//         setPolls(Array.isArray(res.data.polls) ? res.data.polls : []);
//       } catch (err) {
//         console.error("Error fetching polls:", err);
//         alert("Error fetching polls");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPolls();
//   }, [sessionCode]);

//   const handleAnswerChange = (pollId, value) => {
//     setAnswers((prev) => ({ ...prev, [pollId]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const formattedResponses = Object.entries(answers)
//         .map(([pollId, value]) => {
//           if (Array.isArray(value)) {
//             return value.map((optionId) => ({ pollId: Number(pollId), optionId }));
//           } else if (typeof value === "string" && value.trim() !== "") {
//             return { pollId: Number(pollId), text: value.trim() };
//           } else if (!isNaN(value)) {
//             return { pollId: Number(pollId), optionId: value };
//           }
//           return null;
//         })
//         .filter(Boolean);

//       if (!formattedResponses.length) {
//         alert("❌ Please answer at least one poll!");
//         return;
//       }

//       const email = localStorage.getItem("participantEmail");
//       const name = localStorage.getItem("participantName");
//       if (!email || !name) {
//         alert("❌ Participant info missing. Please join session again.");
//         return;
//       }

//       // Submit responses
//       await axios.post(
//         `http://localhost:5000/api/sessions/${sessionCode}/responses`,
//         { name, email, responses: formattedResponses }
//       );

//       // Notify host via socket
//       socket.emit("participantSubmitted", { sessionCode, email });

//       navigate(`/waiting/${sessionCode}`);
//     } catch (err) {
//       console.error(err.response?.data || err);
//       alert(err.response?.data?.message || "Error submitting responses");
//     }
//   };

//   if (loading) return <p style={{ textAlign: "center" }}>Loading polls...</p>;
//   if (!polls.length) return <p style={{ textAlign: "center" }}>No polls available yet.</p>;

//   return (
//     <div className="participant-page">
//       <Navbar />
//       <h2>Session: {sessionCode}</h2>

//       {polls.map((poll) => (
//         <div key={poll.id} className="poll-card">
//           <h3>{poll.question}</h3>

//           {poll.type === "open-ended" ? (
//             <input
//               type="text"
//               value={answers[poll.id] || ""}
//               onChange={(e) => handleAnswerChange(poll.id, e.target.value)}
//             />
//           ) : (
//             poll.options.map((opt) => (
//               <label key={opt.id}>
//                 <input
//                   type={poll.type === "single-choice" ? "radio" : "checkbox"}
//                   name={`poll-${poll.id}`}
//                   value={opt.id}
//                   checked={
//                     poll.type === "single-choice"
//                       ? answers[poll.id] === opt.id
//                       : answers[poll.id]?.includes(opt.id) || false
//                   }
//                   onChange={(e) => {
//                     if (poll.type === "single-choice") {
//                       handleAnswerChange(poll.id, opt.id);
//                     } else {
//                       const prev = answers[poll.id] || [];
//                       if (e.target.checked) {
//                         handleAnswerChange(poll.id, [...prev, opt.id]);
//                       } else {
//                         handleAnswerChange(
//                           poll.id,
//                           prev.filter((id) => id !== opt.id)
//                         );
//                       }
//                     }
//                   }}
//                 />
//                 {opt.text}
//               </label>
//             ))
//           )}
//         </div>
//       ))}

//       <button onClick={handleSubmit}>Submit Answers</button>
//     </div>
//   );
// }



// // src/pages/ParticipantPage.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSocket } from "../context/SessionContext";
// import Navbar from "../components/nav";

// export default function ParticipantPage() {
//   const { sessionCode } = useParams();
//   const navigate = useNavigate();
//   const socket = useSocket();

//   const [polls, setPolls] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);

//   // 🔌 Join session and listen for poll updates
//   useEffect(() => {
//     if (!socket) return;

//     socket.emit("joinSession", sessionCode);

//     socket.on("pollCreated", (newPoll) => setPolls((prev) => [...prev, newPoll]));
//     socket.on("pollUpdated", (updatedPoll) =>
//       setPolls((prev) =>
//         prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
//       )
//     );

//     return () => {
//       socket.off("pollCreated");
//       socket.off("pollUpdated");
//     };
//   }, [socket, sessionCode]);

//   // Fetch polls from backend
//   useEffect(() => {
//     const fetchPolls = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/sessions/${sessionCode}/polls`
//         );
//         setPolls(Array.isArray(res.data.polls) ? res.data.polls : []);
//       } catch (err) {
//         console.error("Error fetching polls:", err);
//         alert("Error fetching polls");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPolls();
//   }, [sessionCode]);

//   const handleAnswerChange = (pollId, value) => {
//     setAnswers((prev) => ({ ...prev, [pollId]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const formattedResponses = Object.entries(answers)
//         .map(([pollId, value]) => {
//           if (Array.isArray(value)) {
//             return value.map((optionId) => ({ pollId: Number(pollId), optionId }));
//           } else if (typeof value === "string" && value.trim() !== "") {
//             return { pollId: Number(pollId), text: value.trim() };
//           } else if (!isNaN(value)) {
//             return { pollId: Number(pollId), optionId: value };
//           }
//           return null;
//         })
//         .filter(Boolean);

//       if (!formattedResponses.length) {
//         alert("❌ Please answer at least one poll!");
//         return;
//       }

//       const email = localStorage.getItem("participantEmail");
//       if (!email) {
//         alert("❌ Participant email missing. Please join session again.");
//         return;
//       }

//       await axios.post(
//         `http://localhost:5000/api/sessions/${sessionCode}/responses`,
//         { email, responses: formattedResponses }
//       );

//       socket.emit("participantSubmitted", { sessionCode, email });

//       navigate(`/waiting/${sessionCode}`);
//     } catch (err) {
//       console.error(err.response?.data || err);
//       alert(err.response?.data?.message || "Error submitting responses");
//     }
//   };

//   if (loading) return <p>Loading polls...</p>;
//   if (!polls.length) return <p>No polls available yet.</p>;

//   return (
//     <div className="participant-page">
//       <Navbar />
//       <h2>Session: {sessionCode}</h2>

//       {polls.map((poll) => (
//         <div key={poll.id} className="poll-card">
//           <h3>{poll.question}</h3>

//           {poll.type === "open-ended" ? (
//             <input
//               type="text"
//               value={answers[poll.id] || ""}
//               onChange={(e) => handleAnswerChange(poll.id, e.target.value)}
//             />
//           ) : (
//             poll.options.map((opt) => (
//               <label key={opt.id}>
//                 <input
//                   type={poll.type === "single-choice" ? "radio" : "checkbox"}
//                   name={`poll-${poll.id}`}
//                   value={opt.id}
//                   checked={
//                     poll.type === "single-choice"
//                       ? answers[poll.id] === opt.id
//                       : answers[poll.id]?.includes(opt.id) || false
//                   }
//                   onChange={(e) => {
//                     if (poll.type === "single-choice") {
//                       handleAnswerChange(poll.id, opt.id);
//                     } else {
//                       const prev = answers[poll.id] || [];
//                       if (e.target.checked) {
//                         handleAnswerChange(poll.id, [...prev, opt.id]);
//                       } else {
//                         handleAnswerChange(
//                           poll.id,
//                           prev.filter((id) => id !== opt.id)
//                         );
//                       }
//                     }
//                   }}
//                 />
//                 {opt.text}
//               </label>
//             ))
//           )}
//         </div>
//       ))}

//       <button onClick={handleSubmit}>Submit Answers</button>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSocket } from "../context/SessionContext";
// import Navbar from "../components/nav";

// export default function ParticipantPage() {
//   const { sessionCode } = useParams();
//   const navigate = useNavigate();
//   const socket = useSocket();

//   const [polls, setPolls] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Join session and listen for poll updates
//   useEffect(() => {
//     if (!socket) return;
//     socket.emit("joinSession", sessionCode);

//     socket.on("pollCreated", (newPoll) => setPolls((prev) => [...prev, newPoll]));
//     socket.on("pollUpdated", (updatedPoll) =>
//       setPolls((prev) =>
//         prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
//       )
//     );

//     return () => {
//       socket.off("pollCreated");
//       socket.off("pollUpdated");
//     };
//   }, [socket, sessionCode]);

//   // Fetch polls from backend
//   useEffect(() => {
//     const fetchPolls = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/sessions/${sessionCode}/polls`
//         );
//         setPolls(Array.isArray(res.data.polls) ? res.data.polls : []);
//       } catch (err) {
//         console.error("Error fetching polls:", err);
//         alert("Error fetching polls");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPolls();
//   }, [sessionCode]);

//   const handleAnswerChange = (pollId, value) => {
//     setAnswers((prev) => ({ ...prev, [pollId]: value }));
//   };

//   const handleSubmit = async () => {
//   try {
//     const formattedResponses = Object.entries(answers)
//       .map(([pollId, value]) => {
//         if (Array.isArray(value)) {
//           return value.map((optionId) => ({
//             poll_id: Number(pollId),
//             option_id: optionId
//           }));
//         } else if (typeof value === "string" && value.trim() !== "") {
//           return { poll_id: Number(pollId), text: value.trim() };
//         } else if (!isNaN(value)) {
//           return { poll_id: Number(pollId), option_id: value };
//         }
//         return null;
//       })
//       .flat()
//       .filter(Boolean);

//     if (!formattedResponses.length) {
//       alert("❌ Please answer at least one poll!");
//       return;
//     }

//     const email = localStorage.getItem("participantEmail");
//     if (!email) {
//       alert("❌ Participant email missing. Please join session again.");
//       return;
//     }

//     await axios.post(
//       `http://localhost:5000/api/sessions/${sessionCode}/responses`,
//       { email, responses: formattedResponses }
//     );

//     socket.emit("participantSubmitted", { sessionCode, email });

//     navigate(`/waiting/${sessionCode}`);
//   } catch (err) {
//     console.error(err.response?.data || err);
//     alert(err.response?.data?.message || "Error submitting responses");
//   }
// };


//   if (loading) return <p>Loading polls...</p>;
//   if (!polls.length) return <p>No polls available yet.</p>;

//   return (
//     <div className="participant-page">
//       <Navbar />
//       <h2>Session: {sessionCode}</h2>

//       {polls.map((poll) => (
//         <div key={poll.id} className="poll-card">
//           <h3>{poll.question}</h3>

//           {poll.type === "open-ended" ? (
//             <input
//               type="text"
//               value={answers[poll.id] || ""}
//               onChange={(e) => handleAnswerChange(poll.id, e.target.value)}
//             />
//           ) : (
//             poll.options.map((opt) => (
//               <label key={opt.id}>
//                 <input
//                   type={poll.type === "single-choice" ? "radio" : "checkbox"}
//                   name={`poll-${poll.id}`}
//                   value={opt.id}
//                   checked={
//                     poll.type === "single-choice"
//                       ? answers[poll.id] === opt.id
//                       : answers[poll.id]?.includes(opt.id) || false
//                   }
//                   onChange={(e) => {
//                     if (poll.type === "single-choice") {
//                       handleAnswerChange(poll.id, opt.id);
//                     } else {
//                       const prev = answers[poll.id] || [];
//                       if (e.target.checked) {
//                         handleAnswerChange(poll.id, [...prev, opt.id]);
//                       } else {
//                         handleAnswerChange(
//                           poll.id,
//                           prev.filter((id) => id !== opt.id)
//                         );
//                       }
//                     }
//                   }}
//                 />
//                 {opt.text}
//               </label>
//             ))
//           )}
//         </div>
//       ))}

//       <button onClick={handleSubmit}>Submit Answers</button>
//     </div>
//   );
// }



// src/pages/ParticipantPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSocket } from "../context/SessionContext";
import Navbar from "../components/Nav.jsx";
import Modal from "../components/Modal.jsx";

export default function ParticipantPage() {
  const { sessionCode } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();

  const [polls, setPolls] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  // Modal + post action (navigate after success)
  const [modalMessage, setModalMessage] = useState(null);
  const [postAction, setPostAction] = useState(null);

  // Join session and listen for poll updates
  useEffect(() => {
    if (!socket) return;

    socket.emit("joinSession", sessionCode);

    socket.on("pollCreated", (newPoll) => setPolls((prev) => [...prev, newPoll]));
    socket.on("pollUpdated", (updatedPoll) =>
      setPolls((prev) =>
        prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
      )
    );

    return () => {
      socket.off("pollCreated");
      socket.off("pollUpdated");
    };
  }, [socket, sessionCode]);

  // Fetch polls from backend
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/sessions/${sessionCode}/polls`
        );
        setPolls(Array.isArray(res.data.polls) ? res.data.polls : []);
      } catch (err) {
        console.error("Error fetching polls:", err);
        setModalMessage("Error fetching polls");
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, [sessionCode]);

  const handleAnswerChange = (pollId, value) => {
    setAnswers((prev) => ({ ...prev, [pollId]: value }));
  };

  const handleSubmit = async () => {
    try {
      const formattedResponses = Object.entries(answers)
        .map(([pollId, value]) => {
          if (Array.isArray(value)) {
            return value.map((optionId) => ({ pollId: Number(pollId), optionId }));
          } else if (typeof value === "string" && value.trim() !== "") {
            return { pollId: Number(pollId), text: value.trim() };
          } else if (!isNaN(value)) {
            return { pollId: Number(pollId), optionId: value };
          }
          return null;
        })
        .filter(Boolean);

      if (!formattedResponses.length) {
        setModalMessage("❌ Please answer at least one poll!");
        return;
      }

      const email = localStorage.getItem("participantEmail");
      if (!email) {
        setModalMessage("❌ Participant email missing. Please join session again.");
        return;
      }

      await axios.post(
        `http://localhost:5000/api/sessions/${sessionCode}/responses`,
        { email, responses: formattedResponses }
      );

      // Notify host that participant submitted
      socket.emit("participantSubmitted", { sessionCode, email });

      // Navigate to waiting page AFTER user confirms the modal
      setPostAction(() => () => navigate(`/waiting/${sessionCode}`));
      setModalMessage("✅ Responses submitted! Redirecting to waiting room...");
    } catch (err) {
      console.error(err.response?.data || err);
      setModalMessage(err.response?.data?.message || "Error submitting responses");
    }
  };

  if (loading) return <p>Loading polls...</p>;
  if (!polls.length) return <p>No polls available yet.</p>;

  return (
    <div className="participant-page">
      <Navbar />
      <h2>Session: {sessionCode}</h2>

      {polls.map((poll) => (
        <div key={poll.id} className="poll-card">
          <h3>{poll.question}</h3>

          {poll.type === "open-ended" ? (
            <input
              type="text"
              value={answers[poll.id] || ""}
              onChange={(e) => handleAnswerChange(poll.id, e.target.value)}
            />
          ) : (
            poll.options.map((opt) => (
              <label key={opt.id}>
                <input
                  type={poll.type === "single-choice" ? "radio" : "checkbox"}
                  name={`poll-${poll.id}`}
                  value={opt.id}
                  checked={
                    poll.type === "single-choice"
                      ? answers[poll.id] === opt.id
                      : answers[poll.id]?.includes(opt.id) || false
                  }
                  onChange={(e) => {
                    if (poll.type === "single-choice") {
                      handleAnswerChange(poll.id, opt.id);
                    } else {
                      const prev = answers[poll.id] || [];
                      if (e.target.checked) {
                        handleAnswerChange(poll.id, [...prev, opt.id]);
                      } else {
                        handleAnswerChange(
                          poll.id,
                          prev.filter((id) => id !== opt.id)
                        );
                      }
                    }
                  }}
                />
                {opt.text}
              </label>
            ))
          )}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Answers</button>

      <Modal
        message={modalMessage}
        onClose={() => {
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
