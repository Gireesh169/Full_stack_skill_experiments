import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:8080'

function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('EMPLOYEE')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setErrorMessage('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Registration failed.')
      }

      setMessage('Registration successful. Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2>Register</h2>

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

          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          >
            <option value="ADMIN">ADMIN</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
          </select>

          {message && <p className="message success">{message}</p>}
          {errorMessage && <p className="message error">{errorMessage}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register