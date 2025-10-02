

// // src/context/SessionContext.jsx
// import { createContext, useContext } from "react";
// import { io } from "socket.io-client";
// import { useState, useEffect } from "react";

// const SessionContext = createContext();

// // ✅ Provider
// export const SessionProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const s = io("http://localhost:5000", { withCredentials: true });
//     setSocket(s);

//     return () => s.disconnect();
//   }, []);

//   return (
//     <SessionContext.Provider value={{ socket }}>
//       {children}
//     </SessionContext.Provider>
//   );
// };

// // ✅ Hook to access context
// export const useSocket = () => {
//   const context = useContext(SessionContext);
//   if (!context) throw new Error("useSocket must be used inside SessionProvider");
//   return context.socket;
// };



// // src/context/SessionContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import { io } from "socket.io-client";

// // Create the context
// const SessionContext = createContext();

// // Hook for easier usage
// export const useSession = () => useContext(SessionContext);

// // Provider component
// export const SessionProvider = ({ children }) => {
//   const [sessionCode, setSessionCode] = useState("");
//   const [participant, setParticipant] = useState(null);

//   // Single socket instance for the whole app
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const s = io("http://localhost:5000", { withCredentials: true });
//     setSocket(s);

//     return () => {
//       s.disconnect();
//     };
//   }, []);

//   return (
//     <SessionContext.Provider
//       value={{
//         sessionCode,
//         setSessionCode,
//         participant,
//         setParticipant,
//         socket,
//       }}
//     >
//       {children}
//     </SessionContext.Provider>
//   );
// };

// // Optional hook for direct socket access
// export const useSocket = () => {
//   const { socket } = useContext(SessionContext);
//   return socket;
// };



// src/context/SessionContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

// Create the context
const SessionContext = createContext();

// Hook for easier usage
export const useSession = () => useContext(SessionContext);

// Provider component
export const SessionProvider = ({ children }) => {
  const [sessionCode, setSessionCode] = useState("");
  const [participant, setParticipant] = useState(null);

  // Single socket instance for the whole app
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io("http://localhost:5000", { withCredentials: true });
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <SessionContext.Provider
      value={{
        sessionCode,
        setSessionCode,
        participant,
        setParticipant,
        socket,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// Optional hook for direct socket access
export const useSocket = () => {
  const { socket } = useContext(SessionContext);
  return socket;
};
