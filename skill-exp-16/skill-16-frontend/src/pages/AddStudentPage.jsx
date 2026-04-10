import { useState } from 'react'
import StudentForm from '../components/StudentForm'

const API_BASE = 'http://localhost:8080/students'

function AddStudentPage() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleAddStudent = async (payload) => {
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to add student. Please try again.')
      }

      setSuccess('Student added successfully.')
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong while adding student.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="card">
      <h2>Add Student</h2>
      <p className="subtitle">Fill in the details below to create a new student record.</p>

      {error ? <p className="alert error">{error}</p> : null}
      {success ? <p className="alert success">{success}</p> : null}

      <StudentForm
        submitLabel="Add Student"
        onSubmit={handleAddStudent}
        submitting={submitting}
      />
    </section>
  )
}

export default AddStudentPage
