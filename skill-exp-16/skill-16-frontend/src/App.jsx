import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AddStudentPage from './pages/AddStudentPage'
import EditStudentPage from './pages/EditStudentPage'
import ViewStudentsPage from './pages/ViewStudentsPage'
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/students" replace />} />
        <Route path="/students" element={<ViewStudentsPage />} />
        <Route path="/students/add" element={<AddStudentPage />} />
        <Route path="/students/edit/:id" element={<EditStudentPage />} />
      </Routes>
    </Layout>
  )
}

export default App
