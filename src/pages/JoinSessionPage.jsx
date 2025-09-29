// // src/pages/JoinSessionPage.jsx
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function JoinSessionPage() {
//   const [sessionCode, setSessionCode] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleJoin = async () => {
//     if (!sessionCode || !name || !email) {
//       alert("Please fill in all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `http://localhost:5000/api/participants/${sessionCode}/join`,
//         { name, email }
//       );

//       console.log("Joined session:", res.data);
//       // Redirect to participant poll page with session info
//       navigate(`/participant/${sessionCode}`, { state: { participant: res.data.participant } });
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error joining session");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="join-session-page">
//       <h2>Join a Session</h2>

//       <input
//         type="text"
//         placeholder="Session Code"
//         value={sessionCode}
//         onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
//       />

//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <button onClick={handleJoin} disabled={loading}>
//         {loading ? "Joining..." : "Join Session"}
//       </button>
//     </div>
//   );
// }






import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JoinSessionPage() {
  const [sessionCode, setSessionCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!sessionCode || !name || !email) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `http://localhost:5000/api/participants/${sessionCode}/join`,
        { name, email } // ✅ match backend: name + email
      );

      console.log("Joined session:", res.data);

      // Save for submitting poll responses
      localStorage.setItem("participantName", name);
      localStorage.setItem("participantEmail", email);

      // Redirect to participant page
      navigate(`/participant/${sessionCode}`, {
        state: { participant: res.data.participant },
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error joining session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-session-page">
      <h2>Join a Session</h2>

      <input
        type="text"
        placeholder="Session Code"
        value={sessionCode}
        onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
      />

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleJoin} disabled={loading}>
        {loading ? "Joining..." : "Join Session"}
      </button>
    </div>
  );
}
