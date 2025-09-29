// // src/pages/ParticipantPage.jsx
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";

// export default function ParticipantPage() {
//   const { sessionCode } = useParams();
//   const [polls, setPolls] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Socket
//   useEffect(() => {
//     const socket = io("http://localhost:5000", { withCredentials: true });
//     socket.emit("joinSession", sessionCode);

//     socket.on("pollCreated", (newPoll) => {
//       setPolls((prev) => [...prev, newPoll]);
//     });

//     socket.on("pollUpdated", (updatedPoll) => {
//       setPolls((prev) =>
//         prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
//       );
//     });

//     return () => socket.disconnect();
//   }, [sessionCode]);

//   // Fetch polls
//   useEffect(() => {
//     const fetchPolls = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/sessions/${sessionCode}/polls`);
//         setPolls(res.data.polls || []);
//       } catch (err) {
//         console.error(err);
//         alert("Error fetching polls");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPolls();
//   }, [sessionCode]);

//   const handleAnswerChange = (pollId, value) => {
//     setAnswers({ ...answers, [pollId]: value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.post(`http://localhost:5000/api/sessions/${sessionCode}/responses`, { answers });
//       alert("Responses submitted!");
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting responses");
//     }
//   };

//   if (loading) return <p>Loading polls...</p>;

//   if (polls.length === 0) return <p>No polls available yet.</p>;

//   return (
//     <div className="participant-page">
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
//                         handleAnswerChange(poll.id, prev.filter((id) => id !== opt.id));
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
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

export default function ParticipantPage() {
  const { sessionCode } = useParams();
  const [polls, setPolls] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  // Socket connection for real-time updates
  useEffect(() => {
    const socket = io("http://localhost:5000", { withCredentials: true });
    socket.emit("joinSession", sessionCode);

    socket.on("pollCreated", (newPoll) => setPolls((prev) => [...prev, newPoll]));
    socket.on("pollUpdated", (updatedPoll) =>
      setPolls((prev) =>
        prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p))
      )
    );

    return () => socket.disconnect();
  }, [sessionCode]);

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
        alert("Error fetching polls");
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
        .filter(Boolean); // remove nulls

      if (!formattedResponses.length) {
        alert("❌ Please answer at least one poll!");
        return;
      }

      const email = localStorage.getItem("participantEmail");
      if (!email) {
        alert("❌ Participant email missing. Please join session again.");
        return;
      }

      await axios.post(
        `http://localhost:5000/api/sessions/${sessionCode}/responses`,
        { email, responses: formattedResponses }
      );

      alert("✅ Responses submitted!");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Error submitting responses");
    }
  };

  if (loading) return <p>Loading polls...</p>;
  if (!polls.length) return <p>No polls available yet.</p>;

  return (
    <div className="participant-page">
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
    </div>
  );
}
