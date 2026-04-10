import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function Home() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username') || 'User'

  return (
    <div className="page">
      <Navbar />

      <div className="card content-card">
        <h2>Home Page</h2>
        <p className="welcome-text">Welcome, {username}!</p>
        <p className="muted-text">You are successfully logged in.</p>

        <button onClick={() => navigate('/profile')}>Go to Profile</button>
      </div>
    </div>
  )
}

export default Home
