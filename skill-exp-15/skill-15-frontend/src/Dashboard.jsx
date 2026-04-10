import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const API_BASE_URL = 'http://localhost:8080'

function Dashboard() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username') || 'User'
  const role = localStorage.getItem('role')

  const callProtectedApi = async (endpoint, successText) => {
    setMessage('')
    setErrorMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Action failed. You may not have permission.')
      }

      const data = await response.text()
      setMessage(data || successText)
    } catch (error) {
      setErrorMessage(error.message || 'Request failed.')
    }
  }

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <div className="content-card">
          <h2>Dashboard</h2>
          <p>
            Welcome, <strong>{username}</strong>
          </p>
          <p>
            Your role: <strong>{role}</strong>
          </p>

          {role === 'ADMIN' && (
            <div className="action-row">
              <button onClick={() => callProtectedApi('/admin/add', 'Add successful!')}>
                Add
              </button>
              <button
                className="danger"
                onClick={() => callProtectedApi('/admin/delete', 'Delete successful!')}
              >
                Delete
              </button>
            </div>
          )}

          {role === 'EMPLOYEE' && (
            <button onClick={() => navigate('/profile')}>View Profile</button>
          )}

          {message && <p className="message success">{message}</p>}
          {errorMessage && <p className="message error">{errorMessage}</p>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard