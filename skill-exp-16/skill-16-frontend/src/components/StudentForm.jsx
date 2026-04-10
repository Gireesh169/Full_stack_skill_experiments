import { useState } from 'react'

const emptyForm = {
  name: '',
  email: '',
  course: '',
}

function StudentForm({ initialValues, onSubmit, submitLabel, submitting }) {
  const [formData, setFormData] = useState(initialValues || emptyForm)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const nextErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address'
    }

    if (!formData.course.trim()) {
      nextErrors.course = 'Course is required'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    await onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      course: formData.course.trim(),
    })
  }

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <div className="field-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter student name"
        />
        {errors.name ? <span className="field-error">{errors.name}</span> : null}
      </div>

      <div className="field-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter student email"
        />
        {errors.email ? <span className="field-error">{errors.email}</span> : null}
      </div>

      <div className="field-group">
        <label htmlFor="course">Course</label>
        <input
          id="course"
          name="course"
          type="text"
          value={formData.course}
          onChange={handleChange}
          placeholder="Enter student course"
        />
        {errors.course ? <span className="field-error">{errors.course}</span> : null}
      </div>

      <button type="submit" className="primary-btn" disabled={submitting}>
        {submitting ? 'Please wait...' : submitLabel}
      </button>
    </form>
  )
}

export default StudentForm
