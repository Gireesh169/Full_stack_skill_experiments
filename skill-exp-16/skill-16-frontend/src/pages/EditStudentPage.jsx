import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import StudentForm from '../components/StudentForm'

const API_BASE = 'http://localhost:8080/students'

function EditStudentPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_BASE}/${id}`)
        if (!response.ok) {
          throw new Error('Student not found.')
        }

        const data = await response.json()
        setStudent(data)
      } catch (requestError) {
        setError(requestError.message || 'Unable to load student details.')
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()
  }, [id])

  const handleUpdateStudent = async (payload) => {
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to update student.')
      }

      setSuccess('Student updated successfully. Redirecting...')
      setTimeout(() => {
        navigate('/students')
      }, 800)
    } catch (requestError) {
      setError(requestError.message || 'Could not update student.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="card">
      <div className="card-head">
        <h2>Update Student</h2>
        <Link to="/students" className="secondary-btn">
          Back to List
        </Link>
      </div>

      {error ? <p className="alert error">{error}</p> : null}
      {success ? <p className="alert success">{success}</p> : null}

      {loading ? (
        <LoadingSpinner label="Loading student details..." />
      ) : student ? (
        <StudentForm
          initialValues={{
            name: student.name || '',
            email: student.email || '',
            course: student.course || '',
          }}
          submitLabel="Update Student"
          onSubmit={handleUpdateStudent}
          submitting={submitting}
        />
      ) : (
        <p className="subtitle">Unable to load student details.</p>
      )}
    </section>
  )
}

export default EditStudentPage
