


// // src/pages/WaitingPage.jsx
// import React, { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSocket } from "../context/SocketContext";

// export default function WaitingPage() {
//   const navigate = useNavigate();
//   const { sessionCode } = useParams();
//   const socket = useSocket();

//   useEffect(() => {
//     if (!socket) return;

//     // Listen for host publishing results
//     socket.on("resultsPublished", () => {
//       navigate(`/sessions/${sessionCode}/results`);
//     });

//     return () => {
//       socket.off("resultsPublished");
//     };
//   }, [socket, navigate, sessionCode]);

//   return (
//     <div style={{ textAlign: "center", marginTop: "2rem" }}>
//       <h2>✅ Answers submitted!</h2>
//       <p>Waiting for the host to publish results...</p>
//     </div>
//   );
// }



// src/pages/WaitingPage.jsx
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

export default function WaitingPage() {
  const navigate = useNavigate();
  const { sessionCode } = useParams();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Join the session room to receive updates
    socket.emit("joinSession", sessionCode);

    // Listen for host publishing results
    socket.on("resultsPublished", () => {
      navigate(`/sessions/${sessionCode}/results`);
    });

    return () => {
      socket.off("resultsPublished");
    };
  }, [socket, navigate, sessionCode]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>✅ Your answers have been submitted!</h2>
      <p>Waiting for the host to publish the results...</p>
    </div>
  );
}
