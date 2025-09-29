// // src/pages/SessionDetailPage.jsx
// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { getPolls, createPoll, updatePollStatus } from "../api/poll";

// export default function SessionDetailPage() {

//   const { token } = useContext(AuthContext);

//   const [polls, setPolls] = useState([]);
//   const [question, setQuestion] = useState("");
//   const [sessionCode, setSessionCode] = useState("");
//   const [type, setType] = useState("single-choice");
//   const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
//   const [loading, setLoading] = useState(false);

//   // Fetch polls when page loads or token changes
//   useEffect(() => {
//     if (token && sessionCode) fetchPolls();
//   }, [token, sessionCode]);

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
//     if (!question.trim()) {
//       alert("Question is required.");
//       return;
//     }

//     if (
//       (type === "single-choice" || type === "multiple-choice") &&
//       options.some((o) => !o.text.trim())
//     ) {
//       alert("Please fill in all options.");
//       return;
//     }

//     try {
//       await createPoll(sessionCode, token, { question, type, options });
//       setQuestion("");
//       setType("single-choice");
//       setOptions([{ text: "" }, { text: "" }]);
//       fetchPolls();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error creating poll");
//     }
//   };

//   const handleStatusChange = async (pollId, status) => {
//     try {
//       await updatePollStatus(pollId, token, status);
//       fetchPolls();
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
//       <h2>Session {sessionCode}</h2>

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

//         <div>
//           <label>Type: </label>
//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option value="single-choice">Single Choice</option>
//             <option value="multiple-choice">Multiple Choice</option>
//             <option value="open-ended">Open Ended</option>
//           </select>
//         </div>

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

//                 {p.options && p.options.length > 0 && (
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
// import { io } from "socket.io-client";

// export default function SessionDetailPage() {
//   const { token } = useContext(AuthContext);

//   const [polls, setPolls] = useState([]);
//   const [question, setQuestion] = useState("");
//   const [sessionCode, setSessionCode] = useState("");
//   const [type, setType] = useState("single-choice");
//   const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
//   const [loading, setLoading] = useState(false);

//   // 🔌 Setup socket connection only once
//   useEffect(() => {
//     const socket = io("http://localhost:5000", {
//       withCredentials: true,
//     });

//     // Listen for poll events
//     socket.on("pollCreated", (newPoll) => {
//       setPolls((prev) => [newPoll, ...prev]);
//     });

//     socket.on("pollUpdated", (updatedPoll) => {
//       setPolls((prev) =>
//         prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
//       );
//     });

//     // Cleanup connection
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // 🔹 Join session room whenever sessionCode changes
//   useEffect(() => {
//     if (!sessionCode) return;

//     const socket = io("http://localhost:5000", { withCredentials: true });
//     socket.emit("joinSession", { sessionCode, token });

//     fetchPolls();

//     return () => {
//       socket.disconnect();
//     };
//   }, [sessionCode, token]);

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
//     if (!question.trim()) {
//       alert("Question is required.");
//       return;
//     }

//     if (
//       (type === "single-choice" || type === "multiple-choice") &&
//       options.some((o) => !o.text.trim())
//     ) {
//       alert("Please fill in all options.");
//       return;
//     }

//     try {
//       await createPoll(sessionCode, token, { question, type, options });
//       setQuestion("");
//       setType("single-choice");
//       setOptions([{ text: "" }, { text: "" }]);
//       // ❌ no need to fetchPolls, socket updates automatically
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error creating poll");
//     }
//   };

//   const handleStatusChange = async (pollId, status) => {
//     try {
//       await updatePollStatus(pollId, token, status);
//       // ❌ no need to fetchPolls, socket updates automatically
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
//       <h2>Session {sessionCode}</h2>

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

//         <div>
//           <label>Type: </label>
//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option value="single-choice">Single Choice</option>
//             <option value="multiple-choice">Multiple Choice</option>
//             <option value="open-ended">Open Ended</option>
//           </select>
//         </div>

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

//                 {p.options && p.options.length > 0 && (
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


// src/pages/SessionDetailPage.jsx
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getPolls, createPoll, updatePollStatus } from "../api/poll";
import { io } from "socket.io-client";

// ✅ Create one socket instance for the whole app
const socket = io("http://localhost:5000", { withCredentials: true });

export default function SessionDetailPage() {
  const { token } = useContext(AuthContext);

  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [sessionCode, setSessionCode] = useState("");
  const [type, setType] = useState("single-choice");
  const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
  const [loading, setLoading] = useState(false);

  // 🔌 Setup socket listeners once
  useEffect(() => {
    socket.on("pollCreated", (newPoll) => {
      setPolls((prev) => [newPoll, ...prev]);
    });

    socket.on("pollUpdated", (updatedPoll) => {
      setPolls((prev) =>
        prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
      );
    });

    return () => {
      socket.off("pollCreated");
      socket.off("pollUpdated");
    };
  }, []);

  // 🔹 Join session room whenever sessionCode changes
  useEffect(() => {
    if (!sessionCode) return;
    socket.emit("joinSession", sessionCode); // send just the code
    fetchPolls();
  }, [sessionCode, token]);

  const fetchPolls = async () => {
    if (!token || !sessionCode) return;
    try {
      setLoading(true);
      const res = await getPolls(sessionCode, token);
      setPolls(res.data.polls || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error fetching polls");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePoll = async () => {
    if (!question.trim()) {
      alert("Question is required.");
      return;
    }

    if (
      (type === "single-choice" || type === "multiple-choice") &&
      options.some((o) => !o.text.trim())
    ) {
      alert("Please fill in all options.");
      return;
    }

    try {
      await createPoll(sessionCode, token, { question, type, options });
      setQuestion("");
      setType("single-choice");
      setOptions([{ text: "" }, { text: "" }]);
      // ✅ Socket updates polls automatically
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating poll");
    }
  };

  const handleStatusChange = async (pollId, status) => {
    try {
      await updatePollStatus(pollId, token, status);
      // ✅ Socket updates automatically
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating poll status");
    }
  };

  const handleAddOption = () => setOptions([...options, { text: "" }]);
  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx].text = value;
    setOptions(newOptions);
  };

  return (
    <div>
      <h2>Session {sessionCode || "(enter code below)"}</h2>

      <section>
        <h3>Create Poll</h3>
        <label>
          Session Code:
          <input
            type="text"
            value={sessionCode}
            onChange={(e) => setSessionCode(e.target.value)}
          />
        </label>

        <label>
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>

        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="single-choice">Single Choice</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="open-ended">Open Ended</option>
          </select>
        </label>

        {(type === "single-choice" || type === "multiple-choice") &&
          options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt.text}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
            />
          ))}

        {(type === "single-choice" || type === "multiple-choice") && (
          <button onClick={handleAddOption}>Add Option</button>
        )}

        <button onClick={handleCreatePoll}>Create Poll</button>
      </section>

      <section>
        <h3>Polls</h3>
        {loading ? (
          <p>Loading polls...</p>
        ) : polls.length === 0 ? (
          <p>No polls yet.</p>
        ) : (
          <ul>
            {polls.map((p) => (
              <li key={p.id}>
                <strong>{p.question}</strong> ({p.type}) — {p.status}
                <div>
                  {p.status !== "published" && (
                    <button onClick={() => handleStatusChange(p.id, "published")}>
                      Publish
                    </button>
                  )}
                  {p.status !== "closed" && (
                    <button onClick={() => handleStatusChange(p.id, "closed")}>
                      Close
                    </button>
                  )}
                </div>

                {p.options && p.options.length > 0 && (
                  <ul>
                    {p.options.map((o) => (
                      <li key={o.id}>
                        {o.text} — votes: {o.votes ?? 0}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
