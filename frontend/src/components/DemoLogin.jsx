import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../utils/mockData';
import AuthService from '../services/authService';
import './DemoLogin.css';

export default function DemoLogin() {
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = () => {
    if (selectedUser) {
      const user = Object.values(mockUsers).find(u => u.id.toString() === selectedUser);
      if (user) {
        AuthService.setUser(user.name, user.id);
        navigate('/workspace-dashboard');
      }
    }
  };
  
  // Group users by role for better organization
  const usersByRole = {
    student: [],
    tutor: []
  };
  
  Object.values(mockUsers).forEach(user => {
    if (user.role === 'tutor') {
      usersByRole.tutor.push(user);
    } else {
      usersByRole.student.push(user);
    }
  });
  
  return (
    <div className="demo-login-container">
      <div className="demo-login-card">
        <h1>StudySync</h1>
        <h2>Demo Login</h2>
        <p className="demo-login-subtitle">
          Select a user to continue. This is a demo mode - no real authentication required.
        </p>
        
        <div className="demo-login-form">
          <label htmlFor="user-select">Select User:</label>
          <select
            id="user-select"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="user-select"
          >
            <option value="">Choose a user...</option>
            <optgroup label="Students">
              {usersByRole.student.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </optgroup>
            <optgroup label="Tutors/Professors">
              {usersByRole.tutor.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </optgroup>
          </select>
          
          <button
            onClick={handleLogin}
            disabled={!selectedUser}
            className="login-button"
            type="button"
          >
            Login
          </button>
        </div>
        
        <div className="demo-login-info">
          <p><strong>Note:</strong> This is a collaborative demo. Changes are saved to a shared GitHub repository.</p>
        </div>
      </div>
    </div>
  );
}

