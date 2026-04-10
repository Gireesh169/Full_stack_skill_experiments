import { Link, NavLink } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          Student CRUD
        </Link>
        <nav className="app-nav">
          <NavLink to="/students" className={({ isActive }) => (isActive ? 'active' : '')}>
            View Students
          </NavLink>
          <NavLink to="/students/add" className={({ isActive }) => (isActive ? 'active' : '')}>
            Add Student
          </NavLink>
        </nav>
      </header>

      <main className="page-container">{children}</main>
    </div>
  )
}

export default Layout
