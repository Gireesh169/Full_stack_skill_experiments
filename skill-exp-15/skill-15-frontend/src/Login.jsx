import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:8080'

function decodeJwtToken(token) {
  try {
    const payloadBase64 = token.split('.')[1]
    const normalizedPayload = payloadBase64.replace(/-/g, '+').replace(/_/g, '/')
    const payloadJson = atob(normalizedPayload)
    return JSON.parse(payloadJson)
  } catch {
    return null
  }
}

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Invalid username or password.')
      }

      const data = await response.json()
      const token = data.token || data.jwt || data.accessToken

      if (!token) {
        throw new Error('Token not received from server.')
      }

      const decoded = decodeJwtToken(token)
      const role =
        decoded?.role ||
        decoded?.roles?.[0] ||
        decoded?.authorities?.[0] ||
        ''
      const cleanRole = String(role).replace('ROLE_', '')

      localStorage.setItem('token', token)
      localStorage.setItem('username', decoded?.sub || decoded?.username || username)
      localStorage.setItem('role', cleanRole)

      navigate('/dashboard')
    } catch (error) {
      setErrorMessage(error.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {errorMessage && <p className="message error">{errorMessage}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="switch-text">
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login