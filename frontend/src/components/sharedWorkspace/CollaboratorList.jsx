import { useState } from 'react';
import { mockUsers } from '../../../../tests/utils/mockData';

export default function CollaboratorList({ collaborators = [] }) {
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCollaboratorClick = (collaborator) => {
    // Look up full user data from mockUsers
    const userId = collaborator.userId || collaborator.id;
    const userKey = Object.keys(mockUsers).find(key => mockUsers[key].id === userId);
    const fullUserData = userKey ? mockUsers[userKey] : null;
    
    // Merge collaborator data with full user data
    const enrichedCollaborator = {
      ...collaborator,
      email: collaborator.email || (fullUserData?.email || ''),
      courses: collaborator.courses || (fullUserData?.courses || []),
      notes: collaborator.notes || (fullUserData?.notes || [])
    };
    
    setSelectedCollaborator(enrichedCollaborator);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCollaborator(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const getPresenceColor = (role, status) => {
    if (role === 'tutor') {
      return status === 'active' ? '#4caf50' : status === 'idle' ? '#ff9800' : '#9e9e9e';
    }
    return status === 'active' ? '#2196f3' : status === 'idle' ? '#ff9800' : '#9e9e9e';
  };

  const formatRole = (role) => {
    if (!role) return 'member';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <>
      <div className="collaborator-list">
        <h3>Collaborators</h3>
        {collaborators.length === 0 ? (
          <p className="empty-state">No collaborators found</p>
        ) : (
          <ul className="collaborator-items collaborator-items-scrollable">
            {collaborators.map((collaborator) => (
              <li 
                key={collaborator.userId} 
                className={`collaborator-item ${selectedCollaborator?.userId === collaborator.userId ? 'selected' : ''}`}
              >
                <div className="collaborator-content">
                  <div className="collaborator-presence">
                    <span 
                      className="presence-dot" 
                      style={{ backgroundColor: getPresenceColor(collaborator.role, collaborator.status || 'active') }}
                      title={`${collaborator.role === 'tutor' ? 'Tutor' : 'Student'} - ${collaborator.status || 'active'}`}
                    />
                  </div>
                  <button
                    className="collaborator-name-btn"
                    onClick={() => handleCollaboratorClick(collaborator)}
                    type="button"
                  >
                    {collaborator.name}
                  </button>
                </div>
                <span className="collaborator-role-badge">
                  {formatRole(collaborator.role)}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="presence-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#2196f3' }}></span>
            <span className="legend-text">Active (Student)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#4caf50' }}></span>
            <span className="legend-text">Active (Tutor)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#ff9800' }}></span>
            <span className="legend-text">Idle</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#9e9e9e' }}></span>
            <span className="legend-text">Offline</span>
          </div>
        </div>
      </div>

      {showModal && selectedCollaborator && (
        <div className="collaborator-modal-overlay" onClick={handleBackdropClick}>
          <div className="collaborator-modal">
            <button 
              className="collaborator-modal-close"
              onClick={handleCloseModal}
              type="button"
              aria-label="Close"
            >
              ×
            </button>
            <div className="collaborator-modal-header">
              <div className="collaborator-modal-presence">
                <span 
                  className="presence-dot-large" 
                  style={{ backgroundColor: getPresenceColor(selectedCollaborator.role, selectedCollaborator.status || 'active') }}
                />
              </div>
              <h2 className="collaborator-modal-name">{selectedCollaborator.name}</h2>
              <span className="collaborator-modal-role-badge">
                {formatRole(selectedCollaborator.role)}
              </span>
            </div>
            <div className="collaborator-modal-content">
              <div className="collaborator-info-item">
                <span className="info-label">User ID:</span>
                <span className="info-value">{selectedCollaborator.userId}</span>
              </div>
              {selectedCollaborator.email && (
                <div className="collaborator-info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{selectedCollaborator.email}</span>
                </div>
              )}
              <div className="collaborator-info-item">
                <span className="info-label">Status:</span>
                <span className="info-value">
                  {selectedCollaborator.status ? selectedCollaborator.status.charAt(0).toUpperCase() + selectedCollaborator.status.slice(1) : 'Active'}
                </span>
              </div>
              <div className="collaborator-info-item">
                <span className="info-label">Role:</span>
                <span className="info-value">
                  {formatRole(selectedCollaborator.role)}
                </span>
              </div>
              {selectedCollaborator.courses && selectedCollaborator.courses.length > 0 && (
                <div className="collaborator-info-item">
                  <span className="info-label">Courses:</span>
                  <span className="info-value">{selectedCollaborator.courses.join(', ')}</span>
                </div>
              )}
              {selectedCollaborator.notes && selectedCollaborator.notes.length > 0 && (
                <div className="collaborator-info-item">
                  <span className="info-label">Notes:</span>
                  <span className="info-value">{selectedCollaborator.notes.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

