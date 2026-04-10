import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Profile from './Profile.jsx'
import Register from './Register.jsx'

function isAuthenticated() {
  const userId = localStorage.getItem('userId')
  const username = localStorage.getItem('username')
  return Boolean(userId && username)
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated() ? '/home' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
