import { useEffect, useState } from 'react'
import Navbar from './Navbar'

const API_BASE_URL = 'http://localhost:8080'

function Profile() {
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token')

      try {
        const response = await fetch(`${API_BASE_URL}/employee/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Unable to load profile.')
        }

        const contentType = response.headers.get('content-type') || ''
        const data = contentType.includes('application/json')
          ? await response.json()
          : { message: await response.text() }

        setProfileData(data)
      } catch (error) {
        setErrorMessage(error.message || 'Profile request failed.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="content-card">
          <h2>Profile</h2>

          {loading && <p>Loading profile...</p>}
          {errorMessage && <p className="message error">{errorMessage}</p>}

          {!loading && !errorMessage && (
            <pre className="profile-box">{JSON.stringify(profileData, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile