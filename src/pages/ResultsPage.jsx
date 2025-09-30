
// src/pages/ResultsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Make sure your AuthContext provides token

export default function ResultsPage() {
  const { sessionCode } = useParams();
  const { token } = useAuth(); // Get the logged-in host's JWT
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/sessions/${sessionCode}/submissions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResults(res.data.submissions || []);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError(err.response?.data?.message || "Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchResults();
    }
  }, [sessionCode, token]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading results...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>📊 Poll Results</h2>
      {results.length === 0 ? (
        <p>No results yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {results.map((submission, idx) => (
            <li
              key={idx}
              style={{
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <p>
                <strong>{submission.participant_email}</strong>
              </p>
              <pre>{JSON.stringify(submission.answers, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
