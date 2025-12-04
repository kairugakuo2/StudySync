import { Link } from 'react-router-dom';
import './RootLayout.css';

export default function RootLayout({ children }) {
  return (
    <div className="root-layout">
      <header className="top-header">
        <h1 className="app-title">StudySync</h1>
        <nav className="top-nav">
          <ul className="nav-links">
            <li>
              <Link to="/assignment-tracker" className="nav-link">Assignment Tracker</Link>
            </li>
            <li>
              <Link to="/practice-problems" className="nav-link">Practice Problems</Link>
            </li>
            <li>
              <Link to="/session-manager" className="nav-link">Session Manager</Link>
            </li>
            <li>
              <Link to="/workspace-dashboard" className="nav-link">Shared Workspace Dashboard</Link>
            </li>
            <li>
              <Link to="/tutor-tab" className="nav-link">Tutor Tab</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

