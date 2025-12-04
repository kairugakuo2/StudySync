import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../../utils/mockData';
import './UserSelect.css';

export default function UserSelect() {
  const [selectedUserKey, setSelectedUserKey] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedUserKey) {
      localStorage.setItem('currentUserId', selectedUserKey);
      navigate('/workspace-dashboard');
    }
  };

  const userOptions = Object.keys(mockUsers).map(key => ({
    key,
    user: mockUsers[key]
  }));

  return (
    <div className="user-select-page">
      <div className="user-select-card">
        <h2>Select a User to Continue</h2>
        <div className="user-select-form">
          <label htmlFor="user-select">Choose a user:</label>
          <select
            id="user-select"
            value={selectedUserKey}
            onChange={(e) => setSelectedUserKey(e.target.value)}
            className="user-select-dropdown"
          >
            <option value="">-- Select a user --</option>
            {userOptions.map(({ key, user }) => (
              <option key={key} value={key}>
                [{user.id}] {user.name} ({user.role})
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedUserKey}
            className="continue-btn"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

