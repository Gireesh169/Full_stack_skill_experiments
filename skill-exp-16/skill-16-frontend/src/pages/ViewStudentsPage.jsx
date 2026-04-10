import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

const API_BASE = 'http://localhost:8080/students'

function ViewStudentsPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const fetchStudents = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_BASE)
      if (!response.ok) {
        throw new Error('Unable to fetch students list.')
      }

      const data = await response.json()
      setStudents(Array.isArray(data) ? data : [])
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong while loading students.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Delete this student?')
    if (!isConfirmed) {
      return
    }

    setDeletingId(id)
    setError('')

    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete student.')
      }

      await fetchStudents()
    } catch (requestError) {
      setError(requestError.message || 'Could not delete student.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="card wide-card">
      <div className="card-head">
        <h2>Students</h2>
        <Link to="/students/add" className="primary-btn small">
          Add New
        </Link>
      </div>

      {error ? <p className="alert error">{error}</p> : null}

      {loading ? (
        <LoadingSpinner label="Loading students..." />
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-cell">
                    No students found.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td className="action-cell">
                      <Link to={`/students/edit/${student.id}`} className="secondary-btn">
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="danger-btn"
                        onClick={() => handleDelete(student.id)}
                        disabled={deletingId === student.id}
                      >
                        {deletingId === student.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ViewStudentsPage
