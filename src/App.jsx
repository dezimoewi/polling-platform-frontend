
// // src/App.jsx
// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // components
// import LandingPage from "./components/landing";

// // pages
// import Login from "./pages/login"
// import Register from "./pages/Register";
// import Sessions from "./pages/Sessions";
// import SessionDetail from "./pages/SessionDetailPage";
// import JoinSessionPage from "./pages/JoinSessionPage";
// import ParticipantPage from "./pages/ParticipantPage";
// import WaitingPage from "./pages/WaitingPage";
// import ResultsPage from "./pages/ResultsPage";

// // context
// import { AuthProvider } from "./context/AuthContext";
// import { SocketProvider } from "./context/SocketContext";

// function App() {
//   return (
//     <AuthProvider>
//       <SocketProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/sessions" element={<Sessions />} />
//             <Route path="/sessions/:code" element={<SessionDetail />} />

//             <Route path="/join" element={<JoinSessionPage />} />
//             <Route
//               path="/participant/:sessionCode"
//               element={<ParticipantPage />}
//             />
//             <Route path="/waiting/:sessionCode" element={<WaitingPage />} />
//             <Route
//               path="/sessions/:sessionCode/results"
//               element={<ResultsPage />}
//             />
//           </Routes>
//         </BrowserRouter>
//       </SocketProvider>
//     </AuthProvider>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing";

// pages
import Login from './pages/login';
import Register from './pages/Register';
import Sessions from './pages/Sessions';
import SessionDetail from './pages/SessionDetailPage';
import JoinSessionPage from "./pages/JoinSessionPage.jsx";
import ParticipantPage from "./pages/ParticipantPage.jsx";
import WaitingPage from "./pages/WaitingPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/sessions/:code" element={<SessionDetail />} />
          <Route path="/join" element={<JoinSessionPage />} />
          <Route path="/participant/:sessionCode" element={<ParticipantPage />} />
          <Route path="/waiting/:sessionCode" element={<WaitingPage />} />
          <Route path="/sessions/:sessionCode/results" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
