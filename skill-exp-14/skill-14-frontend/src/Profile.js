import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const API_BASE_URL = 'http://localhost:8080'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    if (!userId) {
      navigate('/login')
      return
    }

    const fetchProfile = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_BASE_URL}/profile/${userId}`)

        if (!response.ok) {
          throw new Error('Unable to fetch profile details.')
        }

        const data = await response.json()
        setProfile(data)
      } catch (fetchError) {
        setError(fetchError.message || 'Something went wrong while loading profile.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [navigate])

  return (
    <div className="page">
      <Navbar />

      <div className="card content-card">
        <h2>Profile Page</h2>

        {isLoading && <p className="muted-text">Loading profile...</p>}
        {error && <p className="error-text">{error}</p>}

        {!isLoading && !error && profile && (
          <div className="profile-details">
            <p>
              <strong>ID:</strong> {profile.id}
            </p>
            <p>
              <strong>Username:</strong> {profile.username}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
