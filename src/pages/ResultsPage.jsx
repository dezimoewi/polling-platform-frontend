

// // src/pages/ResultsPage.jsx
// import { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/nav";
// import { AuthContext } from "../context/AuthContext";

// export default function ResultsPage() {
//   const { sessionCode } = useParams();
//   const { token } = useContext(AuthContext); // Get host's JWT
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `http://localhost:5000/api/sessions/${sessionCode}/submissions`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setResults(res.data.submissions || []);
//       } catch (err) {
//         console.error("Error fetching results:", err);
//         setError(err.response?.data?.message || "Failed to fetch results");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) fetchResults();
//   }, [sessionCode, token]);

//   if (loading) return <p style={{ textAlign: "center" }}>Loading results...</p>;
//   if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

//   return (
//     <div style={{ textAlign: "center", marginTop: "2rem" }}>
//       <Navbar />
//       <h2>📊 Poll Results</h2>
//       {results.length === 0 ? (
//         <p>No results yet</p>
//       ) : (
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {results.map((submission, idx) => (
//             <li
//               key={idx}
//               style={{
//                 margin: "10px 0",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//               }}
//             >
//               <p>
//                 <strong>{submission.participant_name || submission.participant_email}</strong>
//               </p>
//               <pre>{JSON.stringify(submission.answers, null, 2)}</pre>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function ResultsPage() {
//   const { sessionCode } = useParams();
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/sessions/${sessionCode}/results`
//         );
//         setResults(res.data.results || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchResults();
//   }, [sessionCode]);

//   return (
//     <div>
//       <h2>Results for Session {sessionCode}</h2>
//       {results.length === 0 ? (
//         <p>No responses yet.</p>
//       ) : (
//         results.map((r, i) => (
//           <div key={i}>
//             <strong>{r.question}</strong>
//             <p>Answer: {r.text || r.option_text}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


// src/pages/ResultsPage.jsx
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SessionContext";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Nav.jsx";

export default function ResultsPage() {
  const { sessionCode } = useParams();
  const socket = useSocket();
  const { token } = useContext(AuthContext);

  const [results, setResults] = useState([]);
  const [polls, setPolls] = useState([]);

  // Fetch polls and submissions
  const fetchResults = async () => {
    try {
      if (token) {
        // Host view: fetch all submissions
        const res = await fetch(
          `http://localhost:5000/api/sessions/${sessionCode}/submissions`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setResults(data.submissions || []);
      }

      // Fetch polls for reference
      const pollsRes = await fetch(
        `http://localhost:5000/api/sessions/${sessionCode}/polls`
      );
      const pollsData = await pollsRes.json();
      setPolls(pollsData.polls || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResults();

    if (!socket) return;

    socket.emit("joinSession", sessionCode);

    // Update results live when host publishes
    socket.on("resultsPublished", () => {
      fetchResults();
    });

    return () => {
      socket.off("resultsPublished");
    };
  }, [socket, sessionCode, token]);

  if (!polls.length) return <p>No polls available.</p>;
  if (!results.length) return <p>Waiting for participants to submit...</p>;

  return (
    <div>
      <Navbar />
      <h2>Results for Session {sessionCode}</h2>

      {polls.map((poll) => (
        <div key={poll.id} className="poll-result-card">
          <h3>{poll.question}</h3>
          {poll.type === "open-ended" ? (
            <ul>
              {results.map((res, idx) => {
                const answer = res.answers.find((a) => a.pollId === poll.id);
                return (
                  <li key={idx}>
                    <strong>{res.participant_email}:</strong> {answer?.text || "-"}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul>
              {poll.options.map((opt) => {
                const count = results.reduce((acc, res) => {
                  const answer = res.answers.find(
                    (a) => a.pollId === poll.id && a.optionId === opt.id
                  );
                  return acc + (answer ? 1 : 0);
                }, 0);
                return (
                  <li key={opt.id}>
                    {opt.text}: {count} vote{count !== 1 ? "s" : ""}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
