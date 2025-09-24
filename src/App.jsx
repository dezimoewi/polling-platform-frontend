
// import './App.css'
// import LandingPage from './components/landing'

// function App() {

//   return (
//     <>
//       <LandingPage />
//     </>
//   )
// }

// export default App




import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing'

// your pages
import Login from './pages/login'
import Register from './pages/Register'
import Sessions from './pages/Sessions'

import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sessions" element={<Sessions />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

