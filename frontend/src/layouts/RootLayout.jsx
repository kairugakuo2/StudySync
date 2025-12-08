import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { mockUsers } from '../utils/mockData';
import AuthService from '../services/authService';
import './RootLayout.css';

export default function RootLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/demo-login';
  const [showUserModal, setShowUserModal] = useState(false);
  
  // Support both old and new auth systems
  const currentUserId = localStorage.getItem('currentUserId');
  const demoUser = AuthService.getCurrentUser();
  const currentUser = currentUserId ? mockUsers[currentUserId] : (demoUser ? { ...demoUser, email: '', courses: [] } : null);

  const handleUserIconClick = () => {
    if (currentUser) {
      setShowUserModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowUserModal(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUserId');
    AuthService.logout(); // Also logout from demo auth
    setShowUserModal(false);
    navigate('/demo-login');
  };

  const formatRole = (role) => {
    if (!role) return 'Member';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="root-layout">
      <header className="top-header">
        <h1 className="app-title">StudySync</h1>
        {!isLoginPage && (
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
              {currentUser && (
                <li>
                  <button
                    className="user-icon-btn"
                    onClick={handleUserIconClick}
                    type="button"
                    title="About Me"
                  >
                    👤
                  </button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="global-footer">
        <p>Team: Will Ehrhart • Gakuo Kairu • Ryan King • Ridwan Durosimi • Darrius Gardner</p>
      </footer>

      {showUserModal && currentUser && (
        <div className="user-modal-overlay" onClick={handleBackdropClick}>
          <div className="user-modal">
            <button 
              className="user-modal-close"
              onClick={handleCloseModal}
              type="button"
              aria-label="Close"
            >
              ×
            </button>
            <div className="user-modal-header">
              <div className="user-modal-icon">👤</div>
              <h2 className="user-modal-name">{currentUser.name}</h2>
              <span className="user-modal-role-badge">
                {formatRole(currentUser.role)}
              </span>
            </div>
            <div className="user-modal-content">
              <div className="user-info-item">
                <span className="info-label">User ID:</span>
                <span className="info-value">{currentUser.id}</span>
              </div>
              {currentUser.email && (
                <div className="user-info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{currentUser.email}</span>
                </div>
              )}
              <div className="user-info-item">
                <span className="info-label">Role:</span>
                <span className="info-value">{formatRole(currentUser.role)}</span>
              </div>
              {currentUser.courses && currentUser.courses.length > 0 && (
                <div className="user-info-item">
                  <span className="info-label">Courses:</span>
                  <span className="info-value">{currentUser.courses.join(', ')}</span>
                </div>
              )}
              {currentUser.notes && currentUser.notes.length > 0 && (
                <div className="user-info-item">
                  <span className="info-label">Notes:</span>
                  <span className="info-value">{currentUser.notes.join(', ')}</span>
                </div>
              )}
            </div>
            <div className="user-modal-footer">
              <button
                className="logout-btn"
                onClick={handleLogout}
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// inside nav markup
<li>
  <Link
    to="/assignment-tracker"
    className="block px-3 py-2 rounded-xl hover:bg-slate-800 text-sm"
  >
    Assignment Tracker
  </Link>
</li>


