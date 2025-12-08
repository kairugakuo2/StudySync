import { useState } from 'react';
import { mockWorkspaces, mockUsers } from '../../utils/mockData';
import { createWorkspace, deleteWorkspace } from '../../api/sharedWorkspaceApi';
import './WorkspaceSelector.css';

export default function WorkspaceSelector({ onSelectWorkspace, currentWorkspaceId = null, currentUser = null, onWorkspaceCreated, onWorkspaceDeleted }) {
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is a professor/tutor
  const isProfessor = currentUser && currentUser.role === 'tutor';

  // Get workspaces owned by current user
  const getUserWorkspaces = () => {
    if (!isProfessor) return [];
    return mockWorkspaces.filter(ws => ws.ownerId === currentUser.id);
  };

  const userWorkspaces = getUserWorkspaces();
  const hasWorkspace = userWorkspaces.length > 0;
  const canCreateWorkspace = isProfessor && !hasWorkspace;

  const handleCreateWorkspace = async () => {
    if (!newWorkspaceName.trim()) {
      setError('Workspace name is required');
      return;
    }

    if (hasWorkspace) {
      setError('You can only own one workspace. Please delete your existing workspace first.');
      return;
    }

    setError(null);
    try {
      const newWorkspace = await createWorkspace({
        name: newWorkspaceName.trim(),
        description: newWorkspaceDescription.trim(),
        ownerId: currentUser.id
      });
      
      // Add to mockWorkspaces array (in a real app, this would be handled by the backend)
      mockWorkspaces.push(newWorkspace);
      
      setNewWorkspaceName('');
      setNewWorkspaceDescription('');
      setIsCreating(false);
      
      if (onWorkspaceCreated) {
        onWorkspaceCreated(newWorkspace.id);
      }
    } catch (err) {
      setError(err.message || 'Failed to create workspace');
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    if (!window.confirm('Are you sure you want to delete this workspace? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await deleteWorkspace(workspaceId);
      
      // Remove from mockWorkspaces array (in a real app, this would be handled by the backend)
      const index = mockWorkspaces.findIndex(ws => ws.id === workspaceId);
      if (index > -1) {
        mockWorkspaces.splice(index, 1);
      }
      
      setIsDeleting(false);
      
      if (onWorkspaceDeleted) {
        onWorkspaceDeleted();
      }
    } catch (err) {
      setError(err.message || 'Failed to delete workspace');
      setIsDeleting(false);
    }
  };

  const canDeleteWorkspace = (workspace) => {
    return isProfessor && workspace.ownerId === currentUser?.id;
  };
  const getTutorName = (workspace) => {
    const tutor = workspace.collaboratorList?.find(c => c.role === 'tutor');
    if (tutor) {
      const tutorUser = Object.values(mockUsers).find(u => u.id === tutor.userId);
      return tutorUser ? tutorUser.name : null;
    }
    return null;
  };

  const getStatusDisplay = (status) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusClass = (status) => {
    if (!status) return 'status-unknown';
    return `status-${status.toLowerCase()}`;
  };

  return (
    <div className="workspace-selector">
      <div className="selector-header">
        <div>
          <h2 className="selector-title">Select a Workspace</h2>
          <p className="selector-subtitle">Choose a workspace to view collaborators, tasks, and details</p>
        </div>
        {canCreateWorkspace && !isCreating && (
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="create-workspace-btn"
          >
            + Create Workspace
          </button>
        )}
      </div>

      {error && (
        <div className="workspace-selector-error">
          {error}
        </div>
      )}

      {isCreating && (
        <div className="create-workspace-form">
          <h3>Create New Workspace</h3>
          <div className="form-field">
            <label htmlFor="new-workspace-name">Workspace Name *</label>
            <input
              id="new-workspace-name"
              type="text"
              value={newWorkspaceName}
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              placeholder="Enter workspace name"
            />
          </div>
          <div className="form-field">
            <label htmlFor="new-workspace-description">Description</label>
            <textarea
              id="new-workspace-description"
              value={newWorkspaceDescription}
              onChange={(e) => setNewWorkspaceDescription(e.target.value)}
              placeholder="Enter workspace description"
              rows={3}
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={handleCreateWorkspace}
              disabled={!newWorkspaceName.trim()}
              className="form-submit-btn"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setNewWorkspaceName('');
                setNewWorkspaceDescription('');
                setError(null);
              }}
              className="form-cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="workspace-cards-grid">
        {mockWorkspaces.map((workspace) => {
          const tutorName = getTutorName(workspace);
          const memberCount = workspace.members?.length || 0;
          const isSelected = currentWorkspaceId === workspace.id;
          const canDelete = canDeleteWorkspace(workspace);

          return (
            <div
              key={workspace.id}
              className={`workspace-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectWorkspace(workspace.id)}
            >
              <div className="workspace-card-header">
                <h3 className="workspace-card-name">{workspace.name}</h3>
                <span className={`workspace-card-status ${getStatusClass(workspace.status)}`}>
                  {getStatusDisplay(workspace.status)}
                </span>
              </div>
              
              <div className="workspace-card-body">
                <p className="workspace-card-description">{workspace.description || 'No description'}</p>
                
                <div className="workspace-card-details">
                  <div className="workspace-card-detail">
                    <span className="detail-icon">👥</span>
                    <span className="detail-text">{memberCount} {memberCount === 1 ? 'member' : 'members'}</span>
                  </div>
                  
                  {tutorName && (
                    <div className="workspace-card-detail">
                      <span className="detail-icon">👨‍🏫</span>
                      <span className="detail-text">{tutorName}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="workspace-card-footer">
                <button 
                  className="workspace-card-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectWorkspace(workspace.id);
                  }}
                  type="button"
                >
                  {isSelected ? 'Currently Selected' : 'Select Workspace'}
                </button>
                {canDelete && (
                  <button
                    className="workspace-card-delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteWorkspace(workspace.id);
                    }}
                    type="button"
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

