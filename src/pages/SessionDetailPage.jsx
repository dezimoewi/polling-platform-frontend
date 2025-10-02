

// // src/pages/SessionDetailPage.jsx
// import { useState, useEffect, useContext } from "react";
// import Navbar from "../components/nav";
// import { useAuth } from "../context/AuthContext";
// import { useSession } from "../context/SessionContext";
// import { getPolls, createPoll, updatePollStatus } from "../api/poll";

// export default function SessionDetailPage() {
//   const { token } = useAuth();
//   const { socket } = useSession();

//   const [polls, setPolls] = useState([]);
//   const [sessionCode, setSessionCode] = useState("");
//   const [question, setQuestion] = useState("");
//   const [type, setType] = useState("single-choice");
//   const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
//   const [loading, setLoading] = useState(false);

//   // Socket listeners
//   useEffect(() => {
//     if (!socket) return;

//     socket.on("pollCreated", (newPoll) => {
//       setPolls((prev) => [newPoll, ...prev]);
//     });

//     socket.on("pollUpdated", (updatedPoll) => {
//       setPolls((prev) =>
//         prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
//       );
//     });

//     return () => {
//       socket.off("pollCreated");
//       socket.off("pollUpdated");
//     };
//   }, [socket]);

//   // Join session room when code changes
//   useEffect(() => {
//     if (!socket || !sessionCode) return;
//     socket.emit("joinSession", sessionCode);
//     fetchPolls();
//   }, [sessionCode, token, socket]);

//   const fetchPolls = async () => {
//     if (!token || !sessionCode) return;
//     try {
//       setLoading(true);
//       const res = await getPolls(sessionCode, token);
//       setPolls(res.data.polls || []);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error fetching polls");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreatePoll = async () => {
//     if (!question.trim()) return alert("Question is required.");
//     if ((type === "single-choice" || type === "multiple-choice") &&
//         options.some(o => !o.text.trim())) return alert("All options must be filled.");

//     try {
//       await createPoll(sessionCode, token, { question, type, options });
//       setQuestion("");
//       setType("single-choice");
//       setOptions([{ text: "" }, { text: "" }]);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error creating poll");
//     }
//   };

//   const handleStatusChange = async (pollId, status) => {
//     try {
//       await updatePollStatus(pollId, token, status);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error updating poll status");
//     }
//   };

//   const handleAddOption = () => setOptions([...options, { text: "" }]);
//   const handleOptionChange = (idx, value) => {
//     const newOptions = [...options];
//     newOptions[idx].text = value;
//     setOptions(newOptions);
//   };

//   return (
//     <div>
//       <Navbar />
//       <h2>Session {sessionCode || "(enter code below)"}</h2>

//       <section>
//         <h3>Create Poll</h3>
//         <input
//           type="text"
//           placeholder="Session Code"
//           value={sessionCode}
//           onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
//         />

//         <input
//           type="text"
//           placeholder="Question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />

//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="single-choice">Single Choice</option>
//           <option value="multiple-choice">Multiple Choice</option>
//           <option value="open-ended">Open Ended</option>
//         </select>

//         {(type === "single-choice" || type === "multiple-choice") &&
//           options.map((o, idx) => (
//             <input
//               key={idx}
//               type="text"
//               placeholder={`Option ${idx + 1}`}
//               value={o.text}
//               onChange={(e) => handleOptionChange(idx, e.target.value)}
//             />
//           ))}

//         {(type === "single-choice" || type === "multiple-choice") && (
//           <button onClick={handleAddOption}>Add Option</button>
//         )}

//         <button onClick={handleCreatePoll}>Create Poll</button>
//       </section>

//       <section>
//         <h3>Polls</h3>
//         {loading ? (
//           <p>Loading polls...</p>
//         ) : polls.length === 0 ? (
//           <p>No polls yet.</p>
//         ) : (
//           <ul>
//             {polls.map((p) => (
//               <li key={p.id}>
//                 <strong>{p.question}</strong> ({p.type}) — {p.status}
//                 <div>
//                   {p.status !== "published" && (
//                     <button onClick={() => handleStatusChange(p.id, "published")}>
//                       Publish
//                     </button>
//                   )}
//                   {p.status !== "closed" && (
//                     <button onClick={() => handleStatusChange(p.id, "closed")}>
//                       Close
//                     </button>
//                   )}
//                 </div>
//                 {p.options && (
//                   <ul>
//                     {p.options.map((o) => (
//                       <li key={o.id}>
//                         {o.text} — votes: {o.votes ?? 0}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     </div>
//   );
// }


// // src/pages/SessionDetailPage.jsx
// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { getPolls, createPoll, updatePollStatus } from "../api/poll";
// import { useSocket } from "../context/SessionContext";
// import Navbar from "../components/nav";

// export default function SessionDetailPage() {
//   const { token } = useContext(AuthContext);
//   const socket = useSocket();

//   const [polls, setPolls] = useState([]);
//   const [question, setQuestion] = useState("");
//   const [sessionCode, setSessionCode] = useState("");
//   const [type, setType] = useState("single-choice");
//   const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
//   const [loading, setLoading] = useState(false);

//   // 🔌 Socket listeners
//   useEffect(() => {
//     if (!socket) return;

//     socket.on("pollCreated", (newPoll) => setPolls((prev) => [newPoll, ...prev]));
//     socket.on("pollUpdated", (updatedPoll) =>
//       setPolls((prev) =>
//         prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
//       )
//     );

//     return () => {
//       socket.off("pollCreated");
//       socket.off("pollUpdated");
//     };
//   }, [socket]);

//   // 🔹 Join room and fetch polls
//   useEffect(() => {
//     if (!socket || !sessionCode || !token) return;

//     socket.emit("joinSession", sessionCode);
//     fetchPolls();
//   }, [socket, sessionCode, token]);

//   const fetchPolls = async () => {
//     try {
//       setLoading(true);
//       const res = await getPolls(sessionCode, token);
//       setPolls(res.data.polls || []);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error fetching polls");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreatePoll = async () => {
//     if (!question.trim()) return alert("Question is required");
//     if ((type === "single-choice" || type === "multiple-choice") && options.some((o) => !o.text.trim()))
//       return alert("Please fill in all options.");

//     try {
//       await createPoll(sessionCode, token, { question, type, options });
//       setQuestion("");
//       setType("single-choice");
//       setOptions([{ text: "" }, { text: "" }]);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error creating poll");
//     }
//   };

//   const handleStatusChange = async (pollId, status) => {
//     try {
//       await updatePollStatus(pollId, token, status);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error updating poll status");
//     }
//   };

//   const handleAddOption = () => setOptions([...options, { text: "" }]);
//   const handleOptionChange = (idx, value) => {
//     const newOptions = [...options];
//     newOptions[idx].text = value;
//     setOptions(newOptions);
//   };

//   return (
//     <div>
//       <Navbar />
//       <h2>Session {sessionCode || "(enter code below)"}</h2>

//       <section>
//         <h3>Create Poll</h3>
//         <input
//           type="text"
//           placeholder="Session Code"
//           value={sessionCode}
//           onChange={(e) => setSessionCode(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="single-choice">Single Choice</option>
//           <option value="multiple-choice">Multiple Choice</option>
//           <option value="open-ended">Open Ended</option>
//         </select>

//         {(type === "single-choice" || type === "multiple-choice") &&
//           options.map((opt, idx) => (
//             <input
//               key={idx}
//               type="text"
//               placeholder={`Option ${idx + 1}`}
//               value={opt.text}
//               onChange={(e) => handleOptionChange(idx, e.target.value)}
//             />
//           ))}

//         {(type === "single-choice" || type === "multiple-choice") && (
//           <button onClick={handleAddOption}>Add Option</button>
//         )}

//         <button onClick={handleCreatePoll}>Create Poll</button>
//       </section>

//       <section>
//         <h3>Polls</h3>
//         {loading ? (
//           <p>Loading polls...</p>
//         ) : polls.length === 0 ? (
//           <p>No polls yet.</p>
//         ) : (
//           <ul>
//             {polls.map((p) => (
//               <li key={p.id}>
//                 <strong>{p.question}</strong> ({p.type}) — {p.status}
//                 <div>
//                   {p.status !== "published" && (
//                     <button onClick={() => handleStatusChange(p.id, "published")}>
//                       Publish
//                     </button>
//                   )}
//                   {p.status !== "closed" && (
//                     <button onClick={() => handleStatusChange(p.id, "closed")}>
//                       Close
//                     </button>
//                   )}
//                 </div>
//                 {p.options?.length > 0 && (
//                   <ul>
//                     {p.options.map((o) => (
//                       <li key={o.id}>{o.text} — votes: {o.votes ?? 0}</li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     </div>
//   );
// }



// // src/pages/SessionDetailPage.jsx
// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { getPolls, createPoll, updatePollStatus } from "../api/poll";
// import { useSocket } from "../context/SessionContext";
// import Navbar from "../components/nav";

// export default function SessionDetailPage() {
//   const { token } = useContext(AuthContext);
//   const socket = useSocket();

//   const [polls, setPolls] = useState([]);
//   const [results, setResults] = useState([]);
//   const [question, setQuestion] = useState("");
//   const [sessionCode, setSessionCode] = useState("");
//   const [type, setType] = useState("single-choice");
//   const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
//   const [loading, setLoading] = useState(false);

//   const fetchPolls = async () => {
//     if (!sessionCode || !token) return;
//     try {
//       setLoading(true);
//       const res = await getPolls(sessionCode, token);
//       setPolls(res.data.polls || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchResults = async () => {
//     if (!sessionCode || !token) return;
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/sessions/${sessionCode}/submissions`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await res.json();
//       setResults(data.submissions || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (!socket || !sessionCode) return;

//     socket.emit("joinSession", sessionCode);

//     // Poll created/updated
//     socket.on("pollCreated", (newPoll) => setPolls((prev) => [newPoll, ...prev]));
//     socket.on("pollUpdated", (updatedPoll) =>
//       setPolls((prev) =>
//         prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
//       )
//     );

//     // Participant submitted
//     socket.on("participantSubmitted", ({ email }) => {
//       console.log(`Participant ${email} submitted!`);
//       fetchResults(); // Refresh results live
//     });

//     return () => {
//       socket.off("pollCreated");
//       socket.off("pollUpdated");
//       socket.off("participantSubmitted");
//     };
//   }, [socket, sessionCode]);

//   const handleCreatePoll = async () => {
//     if (!question.trim()) return alert("Question required");
//     try {
//       await createPoll(sessionCode, token, { question, type, options });
//       setQuestion("");
//       setType("single-choice");
//       setOptions([{ text: "" }, { text: "" }]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handlePublishResults = () => {
//     socket.emit("resultsPublished", { sessionCode });
//   };

//   const handleAddOption = () => setOptions([...options, { text: "" }]);
//   const handleOptionChange = (idx, value) => {
//     const newOptions = [...options];
//     newOptions[idx].text = value;
//     setOptions(newOptions);
//   };

//   return (
//     <div>
//       <Navbar />
//       <h2>Session {sessionCode || "(enter code)"}</h2>

//       <section>
//         <h3>Create Poll</h3>
//         <input
//           type="text"
//           placeholder="Session Code"
//           value={sessionCode}
//           onChange={(e) => setSessionCode(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="single-choice">Single Choice</option>
//           <option value="multiple-choice">Multiple Choice</option>
//           <option value="open-ended">Open Ended</option>
//         </select>
//         {(type !== "open-ended") &&
//           options.map((o, idx) => (
//             <input
//               key={idx}
//               type="text"
//               placeholder={`Option ${idx + 1}`}
//               value={o.text}
//               onChange={(e) => handleOptionChange(idx, e.target.value)}
//             />
//           ))}
//         {(type !== "open-ended") && <button onClick={handleAddOption}>Add Option</button>}
//         <button onClick={handleCreatePoll}>Create Poll</button>
//       </section>

//       <section>
//         <h3>Live Polls</h3>
//         {loading ? <p>Loading...</p> : polls.map(p => (
//           <div key={p.id}>
//             <strong>{p.question}</strong> ({p.type}) — {p.status}
//           </div>
//         ))}
//       </section>

//       <section>
//         <h3>Participant Submissions</h3>
//         <button onClick={handlePublishResults}>Publish Results</button>
//         {results.length === 0 ? <p>No submissions yet</p> :
//           results.map((res, idx) => (
//             <div key={idx}>
//               <p><strong>{res.participant_email}</strong></p>
//               <pre>{JSON.stringify(res.answers, null, 2)}</pre>
//             </div>
//           ))}
//       </section>
//     </div>
//   );
// }


// // src/pages/SessionDetailPage.jsx
// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { getPolls, createPoll, updatePollStatus, deletePoll } from "../api/poll";
// import { useSocket } from "../context/SessionContext";
// import { useLocation } from "react-router-dom";
// import Navbar from "../components/Nav.jsx";
// import Modal from "../components/Modal.jsx";

// export default function SessionDetailPage() {
//   const { token } = useContext(AuthContext);
//   const socket = useSocket();
//   const location = useLocation();
//   const sessionFromState = location.state?.session;

//   const [polls, setPolls] = useState([]);
//   const [results, setResults] = useState([]);
//   const [question, setQuestion] = useState("");
//   const [sessionCode, setSessionCode] = useState(sessionFromState?.code || "");
//   const [type, setType] = useState("single-choice");
//   const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
//   const [loading, setLoading] = useState(false);

//   // Modal state
//   const [modalMessage, setModalMessage] = useState(null);
//   const [confirmAction, setConfirmAction] = useState(null);

//   const fetchPolls = async () => {
//     if (!sessionCode || !token) return;
//     try {
//       setLoading(true);
//       const res = await getPolls(sessionCode, token);
//       setPolls(res.data.polls || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchResults = async () => {
//     if (!sessionCode || !token) return;
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/sessions/${sessionCode}/submissions`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await res.json();
//       setResults(data.submissions || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (!socket || !sessionCode) return;

//     socket.emit("joinSession", sessionCode);

//     socket.on("pollCreated", (newPoll) => setPolls((prev) => [newPoll, ...prev]));
//     socket.on("pollUpdated", (updatedPoll) =>
//       setPolls((prev) =>
//         prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
//       )
//     );
//     socket.on("participantSubmitted", ({ email }) => {
//       console.log(`Participant ${email} submitted!`);
//       fetchResults();
//     });

//     return () => {
//       socket.off("pollCreated");
//       socket.off("pollUpdated");
//       socket.off("participantSubmitted");
//     };
//   }, [socket, sessionCode]);

//   const handleCreatePoll = async () => {
//     if (!question.trim()) return setModalMessage("Question required");
//     try {
//       await createPoll(sessionCode, token, { question, type, options });
//       setQuestion("");
//       setType("single-choice");
//       setOptions([{ text: "" }, { text: "" }]);
//       setModalMessage("✅ Poll created successfully!");
//       // (You can also call fetchPolls() if you want to immediately refresh)
//     } catch (err) {
//       console.error(err);
//       setModalMessage(err.response?.data?.message || "Error creating poll");
//     }
//   };

//   const handlePublishResults = () => {
//     socket.emit("resultsPublished", { sessionCode });
//     setModalMessage("✅ Results published!");
//   };

//   const handleClosePoll = async (pollId) => {
//     try {
//       await updatePollStatus(pollId, token, "closed");
//       fetchPolls();
//       setModalMessage("✅ Poll closed");
//     } catch (err) {
//       console.error(err);
//       setModalMessage(err.response?.data?.message || "Error closing poll");
//     }
//   };

//   const handleDeletePoll = (pollId) => {
//     setModalMessage("Delete this poll?");
//     setConfirmAction(() => async () => {
//       try {
//         await deletePoll(pollId, token);
//         setPolls((prev) => prev.filter((p) => p.id !== pollId));
//         setModalMessage("✅ Poll deleted!");
//       } catch (err) {
//         console.error(err);
//         setModalMessage(err.response?.data?.message || "Error deleting poll");
//       } finally {
//         setConfirmAction(null);
//       }
//     });
//   };

//   const handleAddOption = () => setOptions([...options, { text: "" }]);
//   const handleOptionChange = (idx, value) => {
//     const newOptions = [...options];
//     newOptions[idx].text = value;
//     setOptions(newOptions);
//   };

//   return (
//     <div>
//       <Navbar />
//       <h2>Session {sessionCode}</h2>

//       <section>
//         <h3>Create Poll</h3>
//         <input
//           type="text"
//           placeholder="Question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="single-choice">Single Choice</option>
//           <option value="multiple-choice">Multiple Choice</option>
//           <option value="open-ended">Open Ended</option>
//         </select>
//         {type !== "open-ended" &&
//           options.map((o, idx) => (
//             <input
//               key={idx}
//               type="text"
//               placeholder={`Option ${idx + 1}`}
//               value={o.text}
//               onChange={(e) => handleOptionChange(idx, e.target.value)}
//             />
//           ))}
//         {type !== "open-ended" && <button onClick={handleAddOption}>Add Option</button>}
//         <button onClick={handleCreatePoll}>Create Poll</button>
//       </section>

//       <section>
//         <h3>Live Polls</h3>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           polls.map((p) => (
//             <div key={p.id}>
//               <strong>{p.question}</strong> ({p.type}) — {p.status} <br />
//               <button onClick={() => handleClosePoll(p.id)}>Close</button>{" "}
//               <button onClick={() => handleDeletePoll(p.id)}>Delete</button>
//             </div>
//           ))
//         )}
//       </section>

//       <section>
//         <h3>Participant Submissions</h3>
//         <button onClick={handlePublishResults}>Publish Results</button>
//         {results.length === 0 ? (
//           <p>No submissions yet</p>
//         ) : (
//           results.map((res, idx) => (
//             <div key={idx}>
//               <p>
//                 <strong>{res.participant_email}</strong>
//               </p>
//               <pre>{JSON.stringify(res.answers, null, 2)}</pre>
//             </div>
//           ))
//         )}
//       </section>

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



// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { getPolls, createPoll, updatePollStatus, deletePoll } from "../api/poll";
// import { useSocket } from "../context/SessionContext";
// import { useLocation, useParams } from "react-router-dom";
// import Navbar from "../components/Nav.jsx";
// import Modal from "../components/Modal.jsx";

// export default function SessionDetailPage() {
//   const { token } = useContext(AuthContext);
//   const socket = useSocket();
//   const location = useLocation();
//   const { sessionCode: sessionCodeFromParams } = useParams();
//   const sessionFromState = location.state?.session;

//   // ✅ Use state, localStorage, or params
//   const [sessionCode, setSessionCode] = useState(
//     sessionFromState?.code || localStorage.getItem("sessionCode") || sessionCodeFromParams || ""
//   );

//   const [polls, setPolls] = useState([]);
//   const [results, setResults] = useState([]);
//   const [question, setQuestion] = useState("");
//   const [type, setType] = useState("single-choice");
//   const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
//   const [loading, setLoading] = useState(false);

//   // Modal state
//   const [modalMessage, setModalMessage] = useState(null);
//   const [confirmAction, setConfirmAction] = useState(null);

//   const fetchPolls = async () => {
//     if (!sessionCode || !token) return;
//     try {
//       setLoading(true);
//       const res = await getPolls(sessionCode, token);
//       setPolls(res.data.polls || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchResults = async () => {
//     if (!sessionCode || !token) return;
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/sessions/${sessionCode}/submissions`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await res.json();
//       setResults(data.submissions || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (sessionCode) {
//       fetchPolls();
//       fetchResults();
//     }
//   }, [sessionCode]);

//   useEffect(() => {
//     if (!socket || !sessionCode) return;

//     socket.emit("joinSession", sessionCode);

//     socket.on("pollCreated", (newPoll) => setPolls((prev) => [newPoll, ...prev]));
//     socket.on("pollUpdated", (updatedPoll) =>
//       setPolls((prev) =>
//         prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
//       )
//     );
//     socket.on("participantSubmitted", () => {
//       fetchResults();
//     });

//     return () => {
//       socket.off("pollCreated");
//       socket.off("pollUpdated");
//       socket.off("participantSubmitted");
//     };
//   }, [socket, sessionCode]);

//   const handleCreatePoll = async () => {
//     if (!question.trim()) return setModalMessage("Question required");
//     try {
//       await createPoll(sessionCode, token, { question, type, options });
//       setQuestion("");
//       setType("single-choice");
//       setOptions([{ text: "" }, { text: "" }]);
//       setModalMessage("✅ Poll created successfully!");
//     } catch (err) {
//       console.error(err);
//       setModalMessage(err.response?.data?.message || "Error creating poll");
//     }
//   };

//   const handlePublishResults = () => {
//     socket.emit("resultsPublished", { sessionCode });
//     setModalMessage("✅ Results published!");
//   };

//   const handleClosePoll = async (pollId) => {
//     try {
//       await updatePollStatus(pollId, token, "closed");
//       fetchPolls();
//       setModalMessage("✅ Poll closed");
//     } catch (err) {
//       console.error(err);
//       setModalMessage(err.response?.data?.message || "Error closing poll");
//     }
//   };

//   const handleDeletePoll = (pollId) => {
//     setModalMessage("Delete this poll?");
//     setConfirmAction(() => async () => {
//       try {
//         await deletePoll(pollId, token);
//         setPolls((prev) => prev.filter((p) => p.id !== pollId));
//         setModalMessage("✅ Poll deleted!");
//       } catch (err) {
//         console.error(err);
//         setModalMessage(err.response?.data?.message || "Error deleting poll");
//       } finally {
//         setConfirmAction(null);
//       }
//     });
//   };

//   const handleAddOption = () => setOptions([...options, { text: "" }]);
//   const handleOptionChange = (idx, value) => {
//     const newOptions = [...options];
//     newOptions[idx].text = value;
//     setOptions(newOptions);
//   };

//   return (
//     <div>
//       <Navbar />
//       <h2>Session Detail</h2>
//       <section>
//         <h3>Session Info</h3>
//         <p>
//           <strong>Code:</strong> {sessionCode}
//         </p>
//       </section>

//       <section>
//         <h3>Create Poll</h3>
//         <input
//           type="text"
//           placeholder="Question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="single-choice">Single Choice</option>
//           <option value="multiple-choice">Multiple Choice</option>
//           <option value="open-ended">Open Ended</option>
//         </select>
//         {type !== "open-ended" &&
//           options.map((o, idx) => (
//             <input
//               key={idx}
//               type="text"
//               placeholder={`Option ${idx + 1}`}
//               value={o.text}
//               onChange={(e) => handleOptionChange(idx, e.target.value)}
//             />
//           ))}
//         {type !== "open-ended" && (
//           <button onClick={handleAddOption}>Add Option</button>
//         )}
//         <button onClick={handleCreatePoll}>Create Poll</button>
//       </section>

//       <section>
//         <h3>Live Polls</h3>
//         {loading ? (
//           <p>Loading...</p>
//         ) : polls.length === 0 ? (
//           <p>No polls yet</p>
//         ) : (
//           polls.map((p) => (
//             <div key={p.id}>
//               <strong>{p.question}</strong> ({p.type}) — {p.status}
//               <br />
//               <button onClick={() => handleClosePoll(p.id)}>Close</button>{" "}
//               <button onClick={() => handleDeletePoll(p.id)}>Delete</button>
//             </div>
//           ))
//         )}
//       </section>

//       <section>
//         <h3>Participant Submissions</h3>
//         <button onClick={handlePublishResults}>Publish Results</button>
//         {results.length === 0 ? (
//           <p>No submissions yet</p>
//         ) : (
//           results.map((res, idx) => (
//             <div key={idx}>
//               <p>
//                 <strong>{res.participant_email}</strong>
//               </p>
//               <pre>{JSON.stringify(res.answers, null, 2)}</pre>
//             </div>
//           ))
//         )}
//       </section>

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


// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { getPolls, createPoll, updatePollStatus, deletePoll } from "../api/poll";
// import { useSocket } from "../context/SessionContext"; // ✅ still using your SessionContext
// import { useLocation, useParams } from "react-router-dom";
// import Navbar from "../components/Nav.jsx";
// import Modal from "../components/Modal.jsx";

// export default function SessionDetailPage() {
//   const { token } = useContext(AuthContext);
//   const socket = useSocket();
//   const location = useLocation();
//   const { sessionCode: sessionCodeFromParams } = useParams();
//   const sessionFromState = location.state?.session;

//   // ✅ Get session code
//   const [sessionCode, setSessionCode] = useState(
//     sessionFromState?.code ||
//       localStorage.getItem("sessionCode") ||
//       sessionCodeFromParams ||
//       ""
//   );

//   const [polls, setPolls] = useState([]);
//   const [results, setResults] = useState([]);
//   const [question, setQuestion] = useState("");
//   const [type, setType] = useState("single-choice");
//   const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
//   const [loading, setLoading] = useState(false);

//   // Modal state
//   const [modalMessage, setModalMessage] = useState(null);
//   const [confirmAction, setConfirmAction] = useState(null);

//   const fetchPolls = async () => {
//     if (!sessionCode || !token) return;
//     try {
//       setLoading(true);
//       const res = await getPolls(sessionCode, token);
//       setPolls(res.data.polls || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchResults = async () => {
//     if (!sessionCode || !token) return;
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/sessions/${sessionCode}/submissions`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await res.json();
//       setResults(data.submissions || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (sessionCode) {
//       fetchPolls();
//       fetchResults();
//     }
//   }, [sessionCode]);

//   useEffect(() => {
//     if (!socket || !sessionCode) return;

//     socket.emit("joinSession", sessionCode);

//     socket.on("pollCreated", (newPoll) =>
//       setPolls((prev) => [newPoll, ...prev])
//     );
//     socket.on("pollUpdated", (updatedPoll) =>
//       setPolls((prev) =>
//         prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
//       )
//     );

//     // ✅ Listen for live responses
//     socket.on("newResponse", (response) => {
//       setResults((prev) => [...prev, response]);
//     });

//     return () => {
//       socket.off("pollCreated");
//       socket.off("pollUpdated");
//       socket.off("newResponse");
//     };
//   }, [socket, sessionCode]);

//   const handleCreatePoll = async () => {
//     if (!question.trim()) return setModalMessage("Question required");
//     try {
//       await createPoll(sessionCode, token, { question, type, options });
//       setQuestion("");
//       setType("single-choice");
//       setOptions([{ text: "" }, { text: "" }]);
//       setModalMessage("✅ Poll created successfully!");
//     } catch (err) {
//       console.error(err);
//       setModalMessage(err.response?.data?.message || "Error creating poll");
//     }
//   };

//   const handlePublishResults = () => {
//     socket.emit("resultsPublished", { sessionCode });
//     setModalMessage("✅ Results published!");
//   };

//   const handleClosePoll = async (pollId) => {
//     try {
//       await updatePollStatus(pollId, token, "closed");
//       fetchPolls();
//       setModalMessage("✅ Poll closed");
//     } catch (err) {
//       console.error(err);
//       setModalMessage(err.response?.data?.message || "Error closing poll");
//     }
//   };

//   const handleDeletePoll = (pollId) => {
//     setModalMessage("Delete this poll?");
//     setConfirmAction(() => async () => {
//       try {
//         await deletePoll(pollId, token);
//         setPolls((prev) => prev.filter((p) => p.id !== pollId));
//         setModalMessage("✅ Poll deleted!");
//       } catch (err) {
//         console.error(err);
//         setModalMessage(err.response?.data?.message || "Error deleting poll");
//       } finally {
//         setConfirmAction(null);
//       }
//     });
//   };

//   const handleAddOption = () => setOptions([...options, { text: "" }]);
//   const handleOptionChange = (idx, value) => {
//     const newOptions = [...options];
//     newOptions[idx].text = value;
//     setOptions(newOptions);
//   };

//   return (
//     <div>
//       <Navbar />
//       <h2>Session Detail</h2>
//       <section>
//         <h3>Session Info</h3>
//         <p>
//           <strong>Code:</strong> {sessionCode}
//         </p>
//       </section>

//       <section>
//         <h3>Create Poll</h3>
//         <input
//           type="text"
//           placeholder="Question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="single-choice">Single Choice</option>
//           <option value="multiple-choice">Multiple Choice</option>
//           <option value="open-ended">Open Ended</option>
//         </select>
//         {type !== "open-ended" &&
//           options.map((o, idx) => (
//             <input
//               key={idx}
//               type="text"
//               placeholder={`Option ${idx + 1}`}
//               value={o.text}
//               onChange={(e) => handleOptionChange(idx, e.target.value)}
//             />
//           ))}
//         {type !== "open-ended" && (
//           <button onClick={handleAddOption}>Add Option</button>
//         )}
//         <button onClick={handleCreatePoll}>Create Poll</button>
//       </section>

//       <section>
//         <h3>Live Polls</h3>
//         {loading ? (
//           <p>Loading...</p>
//         ) : polls.length === 0 ? (
//           <p>No polls yet</p>
//         ) : (
//           polls.map((p) => (
//             <div key={p.id}>
//               <strong>{p.question}</strong> ({p.type}) — {p.status}
//               <br />
//               <button onClick={() => handleClosePoll(p.id)}>Close</button>{" "}
//               <button onClick={() => handleDeletePoll(p.id)}>Delete</button>
//             </div>
//           ))
//         )}
//       </section>

//       <section>
//         <h3>Participant Submissions</h3>
//         <button onClick={handlePublishResults}>Publish Results</button>
//         {results.length === 0 ? (
//           <p>No submissions yet</p>
//         ) : (
//           results.map((res, idx) => (
//             <div key={idx}>
//               <p>
//                 <strong>{res.participant_email}</strong>
//               </p>
//               <pre>{JSON.stringify(res.answers, null, 2)}</pre>
//             </div>
//           ))
//         )}
//       </section>

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
import { AuthContext } from "../context/AuthContext";
import { getPolls, createPoll, updatePollStatus, deletePoll } from "../api/poll";
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

  const [sessionCode, setSessionCode] = useState(
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

    socket.on("newResponse", (response) => {
      setResults((prev) => [...prev, response]);
    });

    return () => {
      socket.off("pollCreated");
      socket.off("pollUpdated");
      socket.off("newResponse");
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

  // ✅ Helper to render answers properly
  const renderAnswer = (answer) => {
    const poll = polls.find((p) => p.id === answer.pollId);
    if (!poll) return `❓ Unknown poll (ID ${answer.pollId})`;

    if (poll.type === "open-ended") {
      return `${poll.question}: ${answer.text}`;
    }

    const option = poll.options?.find((o) => o.id === answer.optionId);
    return `${poll.question}: ${option ? option.text : "❓ Unknown option"}`;
  };

  return (
    <div>
      <Navbar />
      <h2>Session Detail</h2>
      <section>
        <h3>Session Info</h3>
        <p>
          <strong>Code:</strong> {sessionCode}
        </p>
      </section>

      <section>
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
          <button onClick={handleAddOption}>Add Option</button>
        )}
        <button onClick={handleCreatePoll}>Create Poll</button>
      </section>

      <section>
        <h3>Live Polls</h3>
        {loading ? (
          <p>Loading...</p>
        ) : polls.length === 0 ? (
          <p>No polls yet</p>
        ) : (
          polls.map((p) => (
            <div key={p.id}>
              <strong>{p.question}</strong> ({p.type}) — {p.status}
              <br />
              <button onClick={() => handleClosePoll(p.id)}>Close</button>{" "}
              <button onClick={() => handleDeletePoll(p.id)}>Delete</button>
            </div>
          ))
        )}
      </section>

      <section>
        <h3>Participant Submissions</h3>
        <button onClick={handlePublishResults}>Publish Results</button>
        {results.length === 0 ? (
          <p>No submissions yet</p>
        ) : (
          results.map((res, idx) => (
            <div key={idx}>
              <p>
                <strong>{res.participant_email}</strong>
              </p>
              {res.answers.map((a, i) => (
                <p key={i}>{renderAnswer(a)}</p>
              ))}
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
