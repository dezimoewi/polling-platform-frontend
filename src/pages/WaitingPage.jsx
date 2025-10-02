

// // src/pages/WaitingPage.jsx
// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../components/nav";
// import { useSession } from "../context/SessionContext";

// export default function WaitingPage() {
//   const { sessionCode } = useParams();
//   const navigate = useNavigate();
//   const { socket } = useSession(); // useSession provides socket instance

//   useEffect(() => {
//     if (!socket) return;

//     // Join the session room
//     socket.emit("joinSession", sessionCode);

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
//       <Navbar />
//       <h2>✅ Your answers have been submitted!</h2>
//       <p>Waiting for the host to publish the results...</p>
//     </div>
//   );
// }


// // src/pages/WaitingPage.jsx
// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSocket } from "../context/SessionContext";
// import Navbar from "../components/nav";

// export default function WaitingPage() {
//   const navigate = useNavigate();
//   const { sessionCode } = useParams();
//   const socket = useSocket();

//   useEffect(() => {
//     if (!socket) return;

//     socket.emit("joinSession", sessionCode);

//     socket.on("resultsPublished", () => {
//       navigate(`/sessions/${sessionCode}/results`);
//     });

//     return () => {
//       socket.off("resultsPublished");
//     };
//   }, [socket, navigate, sessionCode]);

//   return (
//     <div style={{ textAlign: "center", marginTop: "2rem" }}>
//       <Navbar />
//       <h2>✅ Your answers have been submitted!</h2>
//       <p>Waiting for the host to publish the results...</p>
//     </div>
//   );
// }



// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSocket } from "../context/SessionContext";
// import Navbar from "../components/nav";

// export default function WaitingPage() {
//   const navigate = useNavigate();
//   const { sessionCode } = useParams();
//   const socket = useSocket();

//   useEffect(() => {
//     if (!socket) return;

//     socket.emit("joinSession", sessionCode);

//     // Navigate participants when host publishes results
//     socket.on("resultsPublished", () => {
//       navigate(`/sessions/${sessionCode}/results`);
//     });

//     return () => socket.off("resultsPublished");
//   }, [socket, navigate, sessionCode]);

//   return (
//     <div style={{ textAlign: "center", marginTop: "2rem" }}>
//       <Navbar />
//       <h2>✅ Your answers have been submitted!</h2>
//       <p>Waiting for the host to publish the results...</p>
//     </div>
//   );
// }


// src/pages/WaitingPage.jsx
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../context/SessionContext";
import Navbar from "../components/Nav.jsx";

export default function WaitingPage() {
  const navigate = useNavigate();
  const { sessionCode } = useParams();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinSession", sessionCode);

    // Navigate automatically when host publishes results
    socket.on("resultsPublished", () => {
      navigate(`/sessions/${sessionCode}/results`);
    });

    return () => {
      socket.off("resultsPublished");
    };
  }, [socket, navigate, sessionCode]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Navbar />
      <h2>✅ Your answers have been submitted!</h2>
      <p>Waiting for the host to publish the results...</p>
    </div>
  );
}
