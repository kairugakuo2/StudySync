import { Link } from 'react-router-dom';
import './RootLayout.css';

export default function RootLayout({ children }) {
  return (
    <div className="root-layout">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <h2 className="sidebar-title">StudySync</h2>
          <ul className="sidebar-links">
            <li>
              <Link to="#" className="sidebar-link">Assignment Tracker</Link>
            </li>
            <li>
              <Link to="#" className="sidebar-link">Practice Problems</Link>
            </li>
            <li>
              <Link to="#" className="sidebar-link">Session Manager</Link>
            </li>
            <li>
              <Link to="/workspace-dashboard" className="sidebar-link">Shared Workspace Dashboard</Link>
            </li>
            <li>
              <Link to="#" className="sidebar-link">Tutor Tab</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

