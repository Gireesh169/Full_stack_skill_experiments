import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:8080'

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Invalid username or password.')
      }

      const data = await response.json()
      const userId = data.id ?? data.userId
      const username = data.username ?? formData.username

      if (!userId || !username) {
        throw new Error('Login response missing user details.')
      }

      localStorage.setItem('userId', String(userId))
      localStorage.setItem('username', username)

      navigate('/home')
    } catch (submitError) {
      setError(submitError.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h2>Login</h2>
        <p className="muted-text">Enter your credentials to continue.</p>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="small-text">
          Do not have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
